# validare

Detailed English documentation is in this file. Turkish documentation is available in [README.tr.md](README.tr.md).

## Overview

validare is a TypeScript and JavaScript validation library designed around named JSON schemas, direct schema objects, Express middleware, and browser-side form validation.

At a high level, the system does four things:

1. Loads validation schemas and message files.
2. Resolves a schema either by name or from an inline object.
3. Executes a type-specific validation pipeline.
4. Returns a structured status object with an error key, reason, original value, and optional message.

The repository supports two runtime styles:

- Node.js and Express validation through `validationConfig`, `validator`, `Schema`, `validateFields`, and `validateSwitch`.
- Browser validation through the bundled `dist/validare-web.js`, remote JSON schema loading, and DOM auto-validation for inputs with `data-validate`.

## What The Library Exports

The public entrypoint re-exports the following symbols:

| Export | Purpose |
| --- | --- |
| `schema` | Type-only export describing supported schema shapes. |
| `Schema` | Wrapper class around a schema object. Provides `validate`, `create_id`, and `random`. |
| `validationConfig` | Initializes runtime schema and message loading for Node.js usage. |
| `validator` | Core validation function. Accepts a schema object or schema name and returns a `Status`. |
| `ID` | Alias for `create_id`. Generates IDs from string schema settings. |
| `validateFields` | Express middleware builder for validating multiple request or response fields. |
| `validateSwitch` | Express middleware builder that selects a validation set based on another field value. |
| `validateFile` | Express middleware export intended for file validation. Current implementation is a placeholder. |
| `validate_element` | Browser helper that validates a DOM input or CSS selector target. |
| `validate_inner_keys` | Utility to check whether nested object keys exist and are non-null. |
| `loadValidareMessages` | Loads message JSON files from a folder in Node.js. |
| `get_schema` | Resolves and returns a named schema after the standard lookup flow. |

## Core Concepts

### 1. Named Schemas

Schemas can be stored in JSON files and loaded into `global.validare`.

Example schema file:

```json
{
	"username": {
		"type": "string",
		"regex": {
			"pattern": "^[a-zA-Z0-9]+$",
			"flag": "g"
		},
		"min_length": 3,
		"max_length": 30
	}
}
```

You can then validate by name:

```ts
import { validationConfig, validator } from 'validare';

await validationConfig({
	files: ['requiments.json'],
	messages: 'messages'
});

const result = await validator('username', 'alice01');
```

### 2. Inline Schemas

You can also validate directly against a schema object without registering it globally.

```ts
import { validator } from 'validare';

const result = await validator(
	{
		type: 'url',
		protocols: ['https'],
		hostnames: ['example.com']
	},
	'https://example.com/docs'
);
```

### 3. Status Objects

Every validation returns a `Status` instance with this runtime shape:

```ts
{
	status: boolean;
	error: string;
	reason: any;
	value: any;
	message: string;
}
```

Meaning of the fields:

- `status`: `true` for success, `false` for failure.
- `error`: machine-friendly error key such as `type`, `min_length`, or `invalid`.
- `reason`: schema value associated with the failing rule when available.
- `value`: original input value.
- `message`: localized or custom message resolved from loaded message JSON.

## Validation Lifecycle

Understanding the execution order matters because some options override others.

### Step 1. Schema Resolution

`validator` accepts either:

- A schema object.
- A string name that is resolved from loaded schemas.

If a named schema cannot be found, the library falls back to:

```ts
{ type: 'string', required: true }
```

### Step 2. Optional Rule Removal

`validator` accepts an optional third argument:

```ts
{ dont_validate: string[] }
```

Each listed key is deleted from the schema before validation starts.

Example:

```ts
await validator('username', 'ALICE', {
	dont_validate: ['casetype']
});
```

### Step 3. Global Short-Circuit Rules

The library checks these flags before any type-specific validators run:

- `dont_validate_empty`: if the value is `''`, validation succeeds immediately.
- `allow_undefined`: if the value is `undefined`, validation succeeds immediately.
- `allow_null`: if the value is `null`, validation succeeds immediately.

### Step 4. Required Check

If `required: true` is present, the library rejects:

- `undefined` with error `undefined`
- `null` with error `null`

Important detail: `allow_undefined` and `allow_null` run before `required`. If both are present, the allow-rule wins.

### Step 5. Type Pipeline

For regular schema types, the library looks up a validator function array from `src/validator/validators.ts` and runs those functions in order.

The first failing function stops the pipeline and creates the final `Status`.

### Step 6. Multi-Type Behavior

If `type` is `multi-type`, the library tries each schema in `types` until one succeeds.

If none succeeds, it returns `not-matched-with-any-type`.

## Runtime Setup

### Node.js Setup

`validationConfig` is the standard setup entrypoint for server-side usage.

```ts
import { validationConfig } from 'validare';

await validationConfig({
	files: ['requiments.json'],
	messages: 'messages'
});
```

Options:

| Option | Type | Meaning |
| --- | --- | --- |
| `files` | `string | string[]` | Schema file or files passed to `scihook-schema-loader`. |
| `messages` | `string` | Folder path containing message JSON files. |

What it does:

- Initializes `global.validare = {}`.
- Loads schema files into the `validare` namespace.
- Loads all message JSON files in the provided folder and merges them into `global.validare.messages`.

Practical guidance:

- Treat `validationConfig` as asynchronous and `await` it before the first validation call.
- Call it once during application bootstrap.

### Browser Setup

Browser usage is built around the generated UMD bundle in `dist/validare-web.js` and meta tags that tell the client which JSON files to fetch.

Example page:

```html
<meta
	name="validare-schemas"
	dist="/test"
	schemas='"a.json","b.json","c.json"'
>

<meta
	name="messages"
	dist="/messages"
	schemas='"messages.json"'
>

<input data-validate data-message-box="message" name="username" type="text">
<p id="message"></p>

<script src="/dist/validare-web.js"></script>
```

What happens in the browser build:

- The library fetches all schema JSON files listed in the `validare-schemas` meta tag.
- It fetches all message files listed in the `messages` meta tag.
- It merges all loaded objects into in-memory browser stores.
- On `DOMContentLoaded`, it finds every element with `data-validate`.
- It validates each matching input immediately and again on `change`, `focusout`, and `keyup`.

### DOM Validation Contract

`validate_element` uses these element attributes:

| Attribute | Meaning |
| --- | --- |
| `data-validate` | Enables auto-validation. If non-empty, its value is used as the schema name. If empty, the `name` attribute is used instead. |
| `name` | Fallback schema name when `data-validate` is empty. |
| `data-message-box` | Element id where the message text should be written. |

After validation, the target element receives:

- `data-validation-status`: `'true'` or `'false'`
- `data-validation-full-result`: full serialized `Status` JSON

## Schema Model Reference

All schemas may also include shared global flags.

### Shared Global Options

| Option | Type | Meaning |
| --- | --- | --- |
| `required` | `boolean` | Rejects `undefined` and `null`. |
| `dont_validate_empty` | `boolean` | Immediately accepts `''` before any other validation runs. |
| `allow_undefined` | `boolean` | Immediately accepts `undefined`. |
| `allow_null` | `boolean` | Immediately accepts `null`. |
| `name` | `string` | Explicit schema name used for message lookup. |

### Important Distinction: `dont_validate_empty` vs `ignore_empty`

These two options do different things.

- `dont_validate_empty` means an empty string is accepted and validation stops successfully.
- `ignore_empty` means certain validators return the error `empty` when the value is an empty string.

Despite the name, `ignore_empty` does not skip validation. In the current implementation it creates an error condition.

## Type-By-Type Reference

### `string`

Supported options:

| Option | Type | Notes |
| --- | --- | --- |
| `regex` | `{ pattern: string, flag: string }` | Tested with `new RegExp(pattern, flag)`. |
| `ignore_empty` | `boolean` | Returns `empty` for `''`. |
| `chars` | `string` | Not used by string validation. Used by ID generation helpers. |
| `casetype` | `'uppercase' | 'lowercase' | 'unset' | 'combined'` | Case validator. |
| `ignored` | `string[]` | Rejects exact matches in this list with `ignored`. |
| `min_length` | `number` | Uses `value.length`. |
| `max_length` | `number` | Uses `value.length`. |
| `length` | `number` | Uses exact `value.length`. |

Pipeline order:

1. `validate_onlytype`
2. `ignore_empty`
3. `validate_string`
4. `validate_length`
5. `validate_case`
6. `validate_igonered`

Possible error keys from this type:

- `type`
- `empty`
- `regex`
- `length`
- `min_length`
- `max_length`
- `lowercase`
- `uppercase`
- `combined`
- `ignored`

Example:

```json
{
	"username": {
		"type": "string",
		"regex": {
			"pattern": "^[a-zA-Z0-9_]+$",
			"flag": "g"
		},
		"min_length": 3,
		"max_length": 20,
		"casetype": "unset",
		"ignored": ["admin", "root"]
	}
}
```

### `number`, `bigint`, and `string-number`

Supported options:

| Option | Type | Notes |
| --- | --- | --- |
| `min_length` | `number | string` | Numeric lower bound, not digit count. Can use date expressions. |
| `max_length` | `number | string` | Numeric upper bound, not digit count. Can use date expressions. |
| `length` | `number | string` | Exact numeric match, not digit count. Can use date expressions. |
| `base` | `number` | Used only for `string-number` parsing. |

Pipeline order:

| Type | Pipeline |
| --- | --- |
| `number` | `validate_onlytype -> validate_numbers` |
| `bigint` | `validate_onlytype -> validate_numbers` |
| `string-number` | `validate_numbers` |

Date expressions are supported in the number validator using strings such as:

```json
{
	"type": "number",
	"max_length": "date 1:minute:add"
}
```

That expression resolves to `Date.now() + 1 minute` before comparison.

Important detail:

- For these schema types, `min_length`, `max_length`, and `length` mean numeric comparison values, not string length.

### `object`

Supported options:

| Option | Type | Notes |
| --- | --- | --- |
| `min_length` | `number` | Checks `value.length`. |
| `max_length` | `number` | Checks `value.length`. |
| `length` | `number` | Checks `value.length`. |

Pipeline order:

1. `validate_onlytype`
2. `validate_length`

Important detail:

- `typeof []` is `'object'`, but arrays use their own `array` type pipeline. Use `type: 'array'` when you need array-specific behavior.
- `validate_length` relies on `value.length`, so plain objects without a `length` property are not a good fit for length-based object validation.

### `boolean`

Pipeline order:

1. `validate_onlytype`

Possible error keys:

- `type`

### `undefined`

Pipeline order:

1. `validate_onlytype`

This is a niche schema type for cases where the value must literally be `undefined`.

### `email`

Supported options:

| Option | Type | Notes |
| --- | --- | --- |
| `services` | `string[]` | Restricts the captured domain/service portion. |
| `ignore_empty` | `boolean` | Returns `empty` for `''`. |
| `min_length` | `number` | Uses string length. |
| `max_length` | `number` | Uses string length. |
| `length` | `number` | Uses exact string length. |

Pipeline order:

1. `ignore_empty`
2. `validate_email`
3. `validate_length`

Possible error keys:

- `empty`
- `invalid`
- `services`
- `length`
- `min_length`
- `max_length`

### `ip`

Pipeline order:

1. `ignore_empty`
2. `validate_ip`
3. `validate_length`

Current implementation validates IPv4 addresses with a regex.

### `phone`

Pipeline order:

1. `ignore_empty`
2. `validate_phone`
3. `validate_length`

Current implementation accepts a narrow digit-oriented phone format based on a regex, not a full international phone parser.

### `url`

Supported options:

| Option | Type | Meaning |
| --- | --- | --- |
| `hostnames` | `string[]` | Allowed hostnames. |
| `ignored_hostnames` | `string[]` | Rejected hostnames. |
| `protocols` | `string[]` | Allowed protocols without the trailing `:`. |
| `ports` | `number[]` | Allowed explicit ports. |
| `origins` | `string[]` | Allowed full origins such as `https://example.com`. |
| `ignore_empty` | `boolean` | Returns `empty` for `''`. |
| `min_length` | `number` | Uses string length. |
| `max_length` | `number` | Uses string length. |
| `length` | `number` | Uses exact string length. |

Pipeline order:

1. `ignore_empty`
2. `validate_url`
3. `validate_length`

Possible error keys:

- `empty`
- `invalid`
- `protocols`
- `ports`
- `origins`
- `hostnames`
- `length`
- `min_length`
- `max_length`

### `values`

Supported options:

| Option | Type |
| --- | --- |
| `values` | `any[]` |

Pipeline order:

1. `validate_values`

Example:

```json
{
	"status": {
		"type": "values",
		"values": ["draft", "published", "archived"]
	}
}
```

### `array`

Supported options:

| Option | Type | Meaning |
| --- | --- | --- |
| `possible_types` | `schema[]` | Every element must match at least one listed schema. |
| `max_element` | `number` | Upper element count bound. |
| `min_element` | `number` | Lower element count bound. |
| `max_element_eq` | `number` | Implemented like `max_element` in current code. |
| `min_element_eq` | `number` | Implemented like `min_element` in current code. |

Pipeline order:

1. `validate_array`

Possible error keys:

- `type`
- `max_element`
- `min_element`
- `possible_types`

Example:

```json
{
	"tags": {
		"type": "array",
		"min_element": 1,
		"max_element": 5,
		"possible_types": [
			{
				"type": "string",
				"min_length": 2,
				"max_length": 20
			}
		]
	}
}
```

### `base64`

Supported options:

| Option | Type |
| --- | --- |
| `min_size` | `number` |
| `max_size` | `number` |

Pipeline order:

1. `validate_base64`

Important detail:

- `min_size` and `max_size` are compared to the encoded string length, not the decoded byte length.

### `doi`

Supported options:

| Option | Type |
| --- | --- |
| `ignore_empty` | `boolean` |
| `min_length` | `number` |
| `max_length` | `number` |
| `length` | `number` |

Pipeline order:

1. `ignore_empty`
2. `validate_doi`

The implementation uses a DOI-oriented regular expression.

### `unicode-name`

Supported options:

| Option | Type | Meaning |
| --- | --- | --- |
| `casetype` | `'uppercase' | 'lowercase' | 'unset' | 'combined'` | Same behavior as string case validation. |
| `allowed_chars` | `string` | Extra non-letter characters allowed one-by-one. |
| `ignore_empty` | `boolean` | Returns `empty` for `''`. |
| `min_length` | `number` | Uses string length. |
| `max_length` | `number` | Uses string length. |
| `length` | `number` | Uses exact string length. |

Pipeline order:

1. `validate_unicode_name`
2. `ignore_empty`
3. `validate_length`
4. `validate_case`

Important detail:

- The first step checks every character with Unicode letter matching. Non-letter characters are only accepted when present in `allowed_chars`.

### `latex`

Supported options:

| Option | Type |
| --- | --- |
| `min_length` | `number` |
| `max_length` | `number` |
| `length` | `number` |

Pipeline order:

1. `validate_length`
2. `validate_latex`

KaTeX is used with `throwOnError: true`, so invalid LaTeX returns `invalid`.

### `file`

Supported options:

| Option | Type | Meaning |
| --- | --- | --- |
| `extension` | `string | string[]` | Allowed file extensions detected from the buffer. |
| `mime` | `string | string[]` | Allowed MIME types detected from the buffer. |
| `max_size` | `{ size: number, size_type: 'bit' | 'kib' | 'mib' | 'gib' | 'tib' | 'byte' | 'kb' | 'mb' | 'gb' | 'tb' }` | Maximum file size. |
| `min_size` | same shape as `max_size` | Minimum file size. |

Pipeline order:

1. `validate_file`
2. `validate_mime_extension` when extension or mime constraints exist
3. `validate_size` when size constraints exist

Direct validation example:

```ts
import { readFileSync } from 'fs';
import { validator } from 'validare';

const buffer = readFileSync('avatar.png');

const result = await validator(
	{
		type: 'file',
		extension: ['png', 'jpg'],
		max_size: { size: 2, size_type: 'mb' }
	},
	buffer
);
```

Important detail:

- The underlying validator expects a `Buffer`.

### `multi-type`

Supported options:

| Option | Type |
| --- | --- |
| `types` | `schema[]` |

Example:

```json
{
	"website": {
		"type": "multi-type",
		"types": [
			{
				"type": "url"
			},
			{
				"type": "values",
				"values": [":delete-value"]
			}
		]
	}
}
```

## Message System

Messages are loaded from JSON files and merged into a single message object.

Example:

```json
{
	"$default": {
		"length": "This value must be #{value} characters long"
	},
	"username": {
		"$default": "This value is invalid",
		"min_length": "Username must be at least #{value} characters"
	}
}
```

Resolution order inside `Status`:

1. Schema-specific error message: `messages[name][error]`
2. Schema-specific default: `messages[name]['$default']`
3. Global default for the error key: `messages['$default'][error]`

The `#{value}` placeholder is replaced with the failing rule value stored in `reason`.

## Express Middleware

### `validateFields(fields, callback)`

This helper builds middleware that validates multiple values and collects every failure.

#### Field definition formats

String shorthand:

```ts
['body.username', 'body.email', 'body.password?']
```

Behavior of the shorthand:

- Dot notation is resolved from `req` by default.
- If the first segment is `req` or `res`, the lookup starts there explicitly.
- The final segment becomes the schema name.
- A trailing `?` means `allow_undefined: true` for this middleware field.

Object form:

```ts
[
	{ dataname: 'body.login', schema: 'username' },
	{ dataname: 'body.email', schema: 'email', allow_undefined: true }
]
```

Callback signature:

```ts
(invalidValues, req, res) => any
```

Each invalid value record contains:

```ts
{
	data: any;
	dataname: string;
	error: string;
	reason: any;
	message: string;
}
```

Example:

```ts
import express from 'express';
import { validateFields } from 'validare';

const app = express();

app.post(
	'/users',
	validateFields(
		['body.username', 'body.email', 'body.password?'],
		(invalidValues, req, res) => {
			return res.status(400).json({ errors: invalidValues });
		}
	),
	(req, res) => {
		res.json({ ok: true });
	}
);
```

### `validateSwitch(dataname, switches, callback)`

This helper chooses a field set based on another field's runtime value.

Example:

```ts
validateSwitch(
	'body.type',
	{
		business: ['body.taxNumber', 'body.companyName'],
		personal: ['body.firstName', 'body.lastName'],
		$default: ['body.firstName']
	},
	(invalidValues, req, res) => {
		return res.status(400).json({ errors: invalidValues });
	}
)
```

### `validateFile(field, callback)`

This function is exported, but the current source implementation immediately calls `next()` and does not execute any file validation logic.

Recommendation:

- For now, validate uploaded file buffers manually with `validator({ type: 'file', ... }, buffer)`.

## `Schema` Class

The `Schema` class wraps a schema object and exposes convenience methods.

Example:

```ts
import { Schema } from 'validare';

const usernameSchema = new Schema({
	type: 'string',
	min_length: 3,
	max_length: 20
});

const result = await usernameSchema.validate('alice');
```

### `schema.validate(value)`

Calls the core validator with the wrapped schema.

### `schema.create_id()`

Builds an ID string using string schema settings.

Relevant schema fields for ID generation:

- `length`
- `chars`

Available `chars` presets from `src/create-id/presets.ts`:

- `all`
- `standart`
- `A-Z`
- `a-z`
- `0-9`
- `0-f`
- `0-F`
- `binary`

You can combine preset names with literal extra characters in the same string.

Example:

```ts
import { ID } from 'validare';

const token = await ID({
	type: 'string',
	length: 16,
	chars: 'A-Z0-9'
});
```

### `schema.random()`

This helper only makes sense for:

- `number`
- `bigint`
- `string-number`

It passes `max_length`, `min_length`, and `length` into the internal randomizer.

Practical caution:

- The implementation is a simple numeric random helper, not a generic example-value generator for all schema types.
- If `length` is set, the randomizer uses that value as the numeric upper bound, not as a digit count.

## Utility Functions

### `get_schema(name)`

Resolves a named schema through the same lookup logic used by `validator`.

### `validate_inner_keys(path, object)`

Checks whether a dotted path exists and stays non-null throughout traversal.

Example:

```ts
const ok = await validate_inner_keys('profile.address.city', payload);
```

### `get_value(name, req, res)`

Internal utility used by Express middleware.

Lookup rules:

- `req.body.email` starts from `req`.
- `res.locals.user` starts from `res`.
- `body.email` also starts from `req` because `req` is the implicit default root.

## Repository Structure

| Path | Role |
| --- | --- |
| `src/index.ts` | Main library entrypoint and export surface. |
| `src/validator` | Core validation engine and validator registry. |
| `src/validator/validators` | One folder per validator implementation. |
| `src/class` | `Schema` and `Status` classes. |
| `src/express-middlewares` | Express integration helpers. |
| `src/functions` | Schema loading, message loading, DOM integration, and general helpers. |
| `src/types` | TypeScript schema and middleware type definitions. |
| `dist/validare-web.js` | Browser bundle produced by webpack. |
| `build` | Compiled JavaScript output used as webpack input. |
| `messages` | Example message JSON files. |
| `test` | Example browser-loaded schema fragments. |

## Development Notes

Current scripts from `package.json`:

| Script | Command | Meaning |
| --- | --- | --- |
| `npm run tsc` | `tsc ./test.ts --outDir ./build -w` | TypeScript watch compile around the current test harness. |
| `npm run nodemon` | `nodemon ./build/test.js` | Runs the built test script. |

Webpack currently bundles `build/index.js` into `dist/validare-web.js` as a UMD library named `validare`.

## Known Implementation Notes And Limitations

This section documents current behavior exactly as implemented.

1. `validateFile` middleware is unfinished. It exports successfully but does not validate anything yet.
2. `ignore_empty` means fail on empty string with error `empty`; it does not ignore empties.
3. For numeric schema types, `min_length`, `max_length`, and `length` are numeric comparison values, not digit lengths.
4. `base64` size checks use encoded string length, not decoded byte length.
5. File validation expects a `Buffer` when using `validator` directly.
6. The file-size helper currently returns `max_size` when the value is below `min_size`; that is the present implementation behavior.
7. `array.max_element_eq` and `array.min_element_eq` are currently implemented with the same comparison style as `max_element` and `min_element`, so the `_eq` suffix does not introduce different equality semantics.
8. `object` length checks rely on `value.length`, which is only meaningful for object-like values that expose that property.
9. Browser schema loading depends on exact meta-tag names: `validare-schemas` and `messages`.
10. If no message is found for an error, `Status.message` can remain empty.

## End-To-End Examples

### Example 1. Server-Side Validation With Named Schemas

```ts
import express from 'express';
import { validationConfig, validateFields } from 'validare';

await validationConfig({
	files: ['requiments.json'],
	messages: 'messages'
});

const app = express();
app.use(express.json());

app.post(
	'/register',
	validateFields(
		['body.username', 'body.email'],
		(invalidValues, req, res) => {
			return res.status(400).json({ errors: invalidValues });
		}
	),
	(req, res) => {
		res.json({ ok: true });
	}
);
```

### Example 2. Direct Inline Validation

```ts
import { validator } from 'validare';

const result = await validator(
	{
		type: 'multi-type',
		types: [
			{ type: 'url', protocols: ['https'] },
			{ type: 'values', values: [':delete-value'] }
		]
	},
	'https://example.com'
);

console.log(result.status);
```

### Example 3. Browser Input Validation

```html
<input data-validate data-message-box="message" name="username" type="text">
<p id="message"></p>
<script src="/dist/validare-web.js"></script>
```

When the page loads, the input is validated automatically and revalidated as the user types or leaves the field.

## Summary

validare is best understood as a schema-driven validation engine with three integration styles:

- direct validation in application code
- Express middleware composition
- browser-side input validation with remote schema files

Its architecture is compact and readable: schema lookup, short-circuit flags, type-specific validator chains, and optional message translation. When using it in production, the most important thing is to follow the current implementation semantics exactly, especially around empty values, number comparison naming, and the incomplete file middleware.