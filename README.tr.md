# validare

Detaylı İngilizce dokümantasyon [README.md](README.md) dosyasındadır. Bu dosya aynı içeriğin Türkçe sürümüdür.

## Genel Bakış

validare, adlandırılmış JSON şemaları, doğrudan şema nesneleri, Express middleware yapıları ve tarayıcı tarafı form doğrulaması etrafında tasarlanmış bir TypeScript ve JavaScript doğrulama kütüphanesidir.

Sistem yüksek seviyede dört iş yapar:

1. Doğrulama şemalarını ve mesaj dosyalarını yükler.
2. Bir şemayı isimle veya satır içi nesne olarak çözer.
3. Türe özel doğrulama zincirini çalıştırır.
4. Hata anahtarı, sebep, orijinal değer ve isteğe bağlı mesaj içeren yapılandırılmış bir durum nesnesi döndürür.

Depo iki çalışma tarzını destekler:

- Node.js ve Express tarafında `validationConfig`, `validator`, `Schema`, `validateFields` ve `validateSwitch` ile kullanım.
- Tarayıcı tarafında `dist/validare-web.js`, uzaktan JSON şema yükleme ve `data-validate` kullanan input alanlarında DOM tabanlı otomatik doğrulama.

## Kütüphanenin Dışa Aktardıkları

Ana giriş noktası şu sembolleri dışa aktarır:

| Export | Amaç |
| --- | --- |
| `schema` | Desteklenen şema biçimlerini tanımlayan type export'u. |
| `Schema` | Bir şema nesnesini saran sınıf. `validate`, `create_id` ve `random` sağlar. |
| `validationConfig` | Node.js kullanımı için çalışma zamanı şema ve mesaj yüklemesini başlatır. |
| `validator` | Ana doğrulama fonksiyonu. Şema nesnesi veya şema adı alır ve `Status` döndürür. |
| `ID` | `create_id` için alias. String şema ayarlarından ID üretir. |
| `validateFields` | Birden fazla request veya response alanını doğrulayan Express middleware üreticisi. |
| `validateSwitch` | Başka bir alanın değerine göre doğrulama kümesi seçen Express middleware üreticisi. |
| `validateFile` | Dosya doğrulaması için dışa aktarılan Express middleware. Mevcut implementasyon şimdilik yer tutucudur. |
| `validate_element` | DOM input'u veya CSS selector hedefini doğrulayan tarayıcı yardımcısı. |
| `validate_inner_keys` | İç içe nesne anahtarlarının varlığını ve null olmamasını kontrol eden yardımcı. |
| `loadValidareMessages` | Node.js içinde bir klasördeki mesaj JSON dosyalarını yükler. |
| `get_schema` | Standart çözümleme akışından geçerek isimle bir şemayı döndürür. |

## Temel Kavramlar

### 1. Adlandırılmış Şemalar

Şemalar JSON dosyalarında tutulabilir ve `global.validare` içine yüklenebilir.

Örnek şema dosyası:

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

Daha sonra isimle doğrulama yapılabilir:

```ts
import { validationConfig, validator } from 'validare';

await validationConfig({
  files: ['requiments.json'],
  messages: 'messages'
});

const result = await validator('username', 'alice01');
```

### 2. Satır İçi Şemalar

Şemayı global olarak kaydetmeden doğrudan nesne ile doğrulama da yapılabilir.

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

### 3. Status Nesneleri

Her doğrulama şu çalışma zamanı yapısına sahip bir `Status` nesnesi döndürür:

```ts
{
  status: boolean;
  error: string;
  reason: any;
  value: any;
  message: string;
}
```

Alanların anlamı:

- `status`: başarı için `true`, hata için `false`.
- `error`: `type`, `min_length` veya `invalid` gibi makine dostu hata anahtarı.
- `reason`: mümkün olduğunda hataya sebep olan şema değeri.
- `value`: orijinal giriş değeri.
- `message`: yüklenmiş mesaj JSON dosyalarından çözülen yerelleştirilmiş veya özelleştirilmiş mesaj.

## Doğrulama Akışı

Çalışma sırasını anlamak önemlidir çünkü bazı seçenekler diğerlerinin önüne geçer.

### Adım 1. Şema Çözümleme

`validator` şu iki biçimi kabul eder:

- Bir şema nesnesi.
- Yüklenmiş şemalardan çözülen string isim.

İsimle verilen bir şema bulunamazsa, kütüphane şu varsayılan şemaya düşer:

```ts
{ type: 'string', required: true }
```

### Adım 2. Opsiyonel Kural Silme

`validator` üçüncü argüman olarak şu yapıyı kabul eder:

```ts
{ dont_validate: string[] }
```

Listelenen her anahtar doğrulama başlamadan önce şemadan silinir.

Örnek:

```ts
await validator('username', 'ALICE', {
  dont_validate: ['casetype']
});
```

### Adım 3. Global Kısa Devre Kuralları

Türe özel doğrulama çalışmadan önce şu bayraklar kontrol edilir:

- `dont_validate_empty`: değer `''` ise doğrulama hemen başarılı kabul edilir.
- `allow_undefined`: değer `undefined` ise doğrulama hemen başarılı kabul edilir.
- `allow_null`: değer `null` ise doğrulama hemen başarılı kabul edilir.

### Adım 4. Required Kontrolü

Eğer `required: true` varsa kütüphane şunları reddeder:

- `undefined` için `undefined` hatası
- `null` için `null` hatası

Önemli detay: `allow_undefined` ve `allow_null`, `required` kontrolünden önce çalışır. İkisi birlikte varsa izin veren kural kazanır.

### Adım 5. Türe Özel Zincir

Normal şema tiplerinde kütüphane `src/validator/validators.ts` içindeki fonksiyon dizisini bulur ve sırayla çalıştırır.

İlk başarısız fonksiyon zinciri durdurur ve nihai `Status` nesnesi oluşturulur.

### Adım 6. Multi-Type Davranışı

`type`, `multi-type` ise kütüphane `types` içindeki her şemayı sırayla dener.

Hiçbiri başarılı olmazsa `not-matched-with-any-type` döndürülür.

## Çalışma Zamanı Kurulumu

### Node.js Kurulumu

`validationConfig`, sunucu tarafı kullanım için standart başlangıç girişidir.

```ts
import { validationConfig } from 'validare';

await validationConfig({
  files: ['requiments.json'],
  messages: 'messages'
});
```

Seçenekler:

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `files` | `string | string[]` | `scihook-schema-loader` içine verilen bir veya birden fazla şema dosyası. |
| `messages` | `string` | Mesaj JSON dosyalarını içeren klasör yolu. |

Yaptıkları:

- `global.validare = {}` ile çalışma alanını başlatır.
- Şema dosyalarını `validare` isim alanına yükler.
- Verilen klasördeki tüm mesaj JSON dosyalarını okuyup `global.validare.messages` içine birleştirir.

Pratik kullanım önerisi:

- İlk doğrulama çağrısından önce `validationConfig` fonksiyonunu `await` ile bekleyin.
- Uygulama açılışında bir kez çağırın.

### Tarayıcı Kurulumu

Tarayıcı kullanımı `dist/validare-web.js` içindeki UMD bundle ve hangi JSON dosyalarının çekileceğini söyleyen meta etiketleri üzerine kuruludur.

Örnek sayfa:

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

Tarayıcı derlemesinde olanlar:

- `validare-schemas` meta etiketinde listelenen tüm şema JSON dosyaları çekilir.
- `messages` meta etiketinde listelenen tüm mesaj dosyaları çekilir.
- Yüklenen tüm nesneler tarayıcı belleğinde birleştirilir.
- `DOMContentLoaded` anında `data-validate` kullanan tüm elemanlar bulunur.
- Her alan hemen doğrulanır; sonra `change`, `focusout` ve `keyup` olaylarında yeniden doğrulanır.

### DOM Doğrulama Sözleşmesi

`validate_element` şu öznitelikleri kullanır:

| Öznitelik | Anlam |
| --- | --- |
| `data-validate` | Otomatik doğrulamayı açar. Boş değilse değeri şema adı olarak kullanılır. Boşsa `name` özniteliği kullanılır. |
| `name` | `data-validate` boş olduğunda yedek şema adı. |
| `data-message-box` | Mesajın yazılacağı elemanın id değeri. |

Doğrulama sonrası hedef eleman şu öznitelikleri alır:

- `data-validation-status`: `'true'` veya `'false'`
- `data-validation-full-result`: tüm `Status` nesnesinin JSON hali

## Şema Modeli Referansı

Tüm şemalar ortak global bayraklar da içerebilir.

### Ortak Global Seçenekler

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `required` | `boolean` | `undefined` ve `null` değerlerini reddeder. |
| `dont_validate_empty` | `boolean` | `''` değeri geldiğinde diğer tüm doğrulamaları atlayıp başarılı kabul eder. |
| `allow_undefined` | `boolean` | `undefined` değerini hemen kabul eder. |
| `allow_null` | `boolean` | `null` değerini hemen kabul eder. |
| `name` | `string` | Mesaj çözümleme için kullanılan açık şema adı. |

### Önemli Fark: `dont_validate_empty` ve `ignore_empty`

Bu iki seçenek farklı şeyler yapar.

- `dont_validate_empty`, boş string değerini kabul eder ve doğrulama başarıyla biter.
- `ignore_empty`, bazı doğrulayıcılarda boş string için `empty` hatası üretir.

İsim yanıltıcı olsa da mevcut implementasyonda `ignore_empty`, doğrulamayı atlamaz; hata üretir.

## Tür Bazlı Referans

### `string`

Desteklenen seçenekler:

| Seçenek | Tür | Not |
| --- | --- | --- |
| `regex` | `{ pattern: string, flag: string }` | `new RegExp(pattern, flag)` ile test edilir. |
| `ignore_empty` | `boolean` | `''` için `empty` döndürür. |
| `chars` | `string` | String doğrulamasında kullanılmaz. ID üretim yardımcılarında kullanılır. |
| `casetype` | `'uppercase' | 'lowercase' | 'unset' | 'combined'` | Harf büyüklük doğrulaması. |
| `ignored` | `string[]` | Listedeki tam eşleşmeleri `ignored` hatasıyla reddeder. |
| `min_length` | `number` | `value.length` kullanır. |
| `max_length` | `number` | `value.length` kullanır. |
| `length` | `number` | Tam `value.length` eşleşmesi ister. |

Pipeline sırası:

1. `validate_onlytype`
2. `ignore_empty`
3. `validate_string`
4. `validate_length`
5. `validate_case`
6. `validate_igonered`

Bu tipten gelebilecek hata anahtarları:

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

Örnek:

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

### `number`, `bigint` ve `string-number`

Desteklenen seçenekler:

| Seçenek | Tür | Not |
| --- | --- | --- |
| `min_length` | `number | string` | Basamak sayısı değil, sayısal alt sınırdır. Tarih ifadesi destekler. |
| `max_length` | `number | string` | Basamak sayısı değil, sayısal üst sınırdır. Tarih ifadesi destekler. |
| `length` | `number | string` | Basamak sayısı değil, tam sayısal eşleşmedir. Tarih ifadesi destekler. |
| `base` | `number` | Sadece `string-number` ayrıştırmasında kullanılır. |

Pipeline sırası:

| Tür | Pipeline |
| --- | --- |
| `number` | `validate_onlytype -> validate_numbers` |
| `bigint` | `validate_onlytype -> validate_numbers` |
| `string-number` | `validate_numbers` |

Sayı doğrulayıcısı şu tür tarih ifadelerini destekler:

```json
{
  "type": "number",
  "max_length": "date 1:minute:add"
}
```

Bu ifade karşılaştırmadan önce `Date.now() + 1 dakika` olarak çözülür.

Önemli detay:

- Bu tiplerde `min_length`, `max_length` ve `length`, string uzunluğu değil sayısal karşılaştırma değeridir.

### `object`

Desteklenen seçenekler:

| Seçenek | Tür | Not |
| --- | --- | --- |
| `min_length` | `number` | `value.length` kontrolü yapar. |
| `max_length` | `number` | `value.length` kontrolü yapar. |
| `length` | `number` | `value.length` kontrolü yapar. |

Pipeline sırası:

1. `validate_onlytype`
2. `validate_length`

Önemli detay:

- `typeof []` değeri `'object'` olsa da array için `type: 'array'` kullanılmalıdır.
- `validate_length`, `value.length` beklediğinden düz nesneler için uzunluk odaklı doğrulama uygun değildir.

### `boolean`

Pipeline sırası:

1. `validate_onlytype`

Olası hata anahtarı:

- `type`

### `undefined`

Pipeline sırası:

1. `validate_onlytype`

Bu, değerin gerçekten `undefined` olması gereken özel durumlar için niş bir şema tipidir.

### `email`

Desteklenen seçenekler:

| Seçenek | Tür | Not |
| --- | --- | --- |
| `services` | `string[]` | Yakalanan domain servis kısmını sınırlar. |
| `ignore_empty` | `boolean` | `''` için `empty` döndürür. |
| `min_length` | `number` | String uzunluğu kullanılır. |
| `max_length` | `number` | String uzunluğu kullanılır. |
| `length` | `number` | Tam string uzunluğu aranır. |

Pipeline sırası:

1. `ignore_empty`
2. `validate_email`
3. `validate_length`

Olası hata anahtarları:

- `empty`
- `invalid`
- `services`
- `length`
- `min_length`
- `max_length`

### `ip`

Pipeline sırası:

1. `ignore_empty`
2. `validate_ip`
3. `validate_length`

Mevcut implementasyon IPv4 adreslerini regex ile doğrular.

### `phone`

Pipeline sırası:

1. `ignore_empty`
2. `validate_phone`
3. `validate_length`

Mevcut implementasyon dar kapsamlı, rakam odaklı bir regex kullanır; tam bir uluslararası telefon ayrıştırıcısı değildir.

### `url`

Desteklenen seçenekler:

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `hostnames` | `string[]` | İzin verilen hostname listesi. |
| `ignored_hostnames` | `string[]` | Reddedilen hostname listesi. |
| `protocols` | `string[]` | Sonundaki `:` olmadan izin verilen protokoller. |
| `ports` | `number[]` | İzin verilen açık portlar. |
| `origins` | `string[]` | `https://example.com` gibi izin verilen origin değerleri. |
| `ignore_empty` | `boolean` | `''` için `empty` döndürür. |
| `min_length` | `number` | String uzunluğu kullanılır. |
| `max_length` | `number` | String uzunluğu kullanılır. |
| `length` | `number` | Tam string uzunluğu aranır. |

Pipeline sırası:

1. `ignore_empty`
2. `validate_url`
3. `validate_length`

Olası hata anahtarları:

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

Desteklenen seçenekler:

| Seçenek | Tür |
| --- | --- |
| `values` | `any[]` |

Pipeline sırası:

1. `validate_values`

Örnek:

```json
{
  "status": {
    "type": "values",
    "values": ["draft", "published", "archived"]
  }
}
```

### `array`

Desteklenen seçenekler:

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `possible_types` | `schema[]` | Her eleman listedeki şemalardan en az birine uymalıdır. |
| `max_element` | `number` | Eleman sayısı üst sınırı. |
| `min_element` | `number` | Eleman sayısı alt sınırı. |
| `max_element_eq` | `number` | Mevcut kodda `max_element` ile aynı mantıkta implement edilmiştir. |
| `min_element_eq` | `number` | Mevcut kodda `min_element` ile aynı mantıkta implement edilmiştir. |

Pipeline sırası:

1. `validate_array`

Olası hata anahtarları:

- `type`
- `max_element`
- `min_element`
- `possible_types`

Örnek:

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

Desteklenen seçenekler:

| Seçenek | Tür |
| --- | --- |
| `min_size` | `number` |
| `max_size` | `number` |

Pipeline sırası:

1. `validate_base64`

Önemli detay:

- `min_size` ve `max_size`, decode edilmiş byte uzunluğu yerine base64 string uzunluğu ile karşılaştırılır.

### `doi`

Desteklenen seçenekler:

| Seçenek | Tür |
| --- | --- |
| `ignore_empty` | `boolean` |
| `min_length` | `number` |
| `max_length` | `number` |
| `length` | `number` |

Pipeline sırası:

1. `ignore_empty`
2. `validate_doi`

Implementasyon DOI odaklı bir regex kullanır.

### `unicode-name`

Desteklenen seçenekler:

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `casetype` | `'uppercase' | 'lowercase' | 'unset' | 'combined'` | String case doğrulaması ile aynı davranış. |
| `allowed_chars` | `string` | Harf olmayan ama tek tek izin verilen ekstra karakterler. |
| `ignore_empty` | `boolean` | `''` için `empty` döndürür. |
| `min_length` | `number` | String uzunluğu kullanılır. |
| `max_length` | `number` | String uzunluğu kullanılır. |
| `length` | `number` | Tam string uzunluğu aranır. |

Pipeline sırası:

1. `validate_unicode_name`
2. `ignore_empty`
3. `validate_length`
4. `validate_case`

Önemli detay:

- İlk adım her karakteri Unicode harf kontrolünden geçirir. Harf olmayan karakterler ancak `allowed_chars` içinde varsa kabul edilir.

### `latex`

Desteklenen seçenekler:

| Seçenek | Tür |
| --- | --- |
| `min_length` | `number` |
| `max_length` | `number` |
| `length` | `number` |

Pipeline sırası:

1. `validate_length`
2. `validate_latex`

KaTeX, `throwOnError: true` ile kullanıldığı için geçersiz LaTeX için `invalid` döndürülür.

### `file`

Desteklenen seçenekler:

| Seçenek | Tür | Anlam |
| --- | --- | --- |
| `extension` | `string | string[]` | Buffer üzerinden tespit edilen izinli dosya uzantıları. |
| `mime` | `string | string[]` | Buffer üzerinden tespit edilen izinli MIME tipleri. |
| `max_size` | `{ size: number, size_type: 'bit' | 'kib' | 'mib' | 'gib' | 'tib' | 'byte' | 'kb' | 'mb' | 'gb' | 'tb' }` | Maksimum dosya boyutu. |
| `min_size` | `max_size` ile aynı yapı | Minimum dosya boyutu. |

Pipeline sırası:

1. `validate_file`
2. Uzantı veya MIME kısıtı varsa `validate_mime_extension`
3. Boyut kısıtı varsa `validate_size`

Doğrudan kullanım örneği:

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

Önemli detay:

- Alttaki doğrulayıcı doğrudan kullanımda `Buffer` bekler.

### `multi-type`

Desteklenen seçenekler:

| Seçenek | Tür |
| --- | --- |
| `types` | `schema[]` |

Örnek:

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

## Mesaj Sistemi

Mesajlar JSON dosyalarından yüklenir ve tek bir mesaj nesnesinde birleştirilir.

Örnek:

```json
{
  "$default": {
    "length": "Bu değer #{value} uzunluğunda olmalı"
  },
  "username": {
    "$default": "Bu değer geçersiz",
    "min_length": "Kullanıcı adı en az #{value} karakter olmalı"
  }
}
```

`Status` içindeki çözümleme sırası:

1. Şemaya özel hata mesajı: `messages[name][error]`
2. Şemaya özel varsayılan mesaj: `messages[name]['$default']`
3. Global hata mesajı: `messages['$default'][error]`

`#{value}` yer tutucusu, `reason` alanındaki değer ile değiştirilir.

## Express Middleware'leri

### `validateFields(fields, callback)`

Bu yardımcı birden fazla değeri doğrulayan ve tüm hataları toplayan middleware üretir.

#### Alan tanım biçimleri

String kısayolu:

```ts
['body.username', 'body.email', 'body.password?']
```

Kısayolun davranışı:

- Noktalı yol varsayılan olarak `req` üzerinden çözülür.
- İlk segment `req` veya `res` ise çözümleme açıkça oradan başlar.
- Son segment şema adı olarak kullanılır.
- Sondaki `?`, bu alan için `allow_undefined: true` anlamına gelir.

Nesne biçimi:

```ts
[
  { dataname: 'body.login', schema: 'username' },
  { dataname: 'body.email', schema: 'email', allow_undefined: true }
]
```

Callback imzası:

```ts
(invalidValues, req, res) => any
```

Her hata kaydı şu alanları içerir:

```ts
{
  data: any;
  dataname: string;
  error: string;
  reason: any;
  message: string;
}
```

Örnek:

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

Bu yardımcı başka bir alanın çalışma zamanındaki değerine göre alan kümesi seçer.

Örnek:

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

Bu fonksiyon dışa aktarılır, ancak mevcut kaynak kodunda doğrudan `next()` çağırır ve herhangi bir dosya doğrulaması yapmaz.

Öneri:

- Şimdilik yüklenen dosya buffer'ını `validator({ type: 'file', ... }, buffer)` ile manuel doğrulayın.

## `Schema` Sınıfı

`Schema` sınıfı bir şema nesnesini sarar ve kolaylık metodları sunar.

Örnek:

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

Sarılan şema ile ana doğrulayıcıyı çağırır.

### `schema.create_id()`

String şema ayarlarını kullanarak ID üretir.

ID üretiminde anlamlı olan şema alanları:

- `length`
- `chars`

`src/create-id/presets.ts` içindeki `chars` preset'leri:

- `all`
- `standart`
- `A-Z`
- `a-z`
- `0-9`
- `0-f`
- `0-F`
- `binary`

Preset isimleri ile ek karakterleri aynı string içinde birleştirebilirsiniz.

Örnek:

```ts
import { ID } from 'validare';

const token = await ID({
  type: 'string',
  length: 16,
  chars: 'A-Z0-9'
});
```

### `schema.random()`

Bu yardımcı pratikte sadece şu tiplerde anlamlıdır:

- `number`
- `bigint`
- `string-number`

İçeride `max_length`, `min_length` ve `length` değerlerini dahili rastgele sayı üreticisine iletir.

Pratik uyarı:

- Implementasyon basit bir sayısal rastgele üreticidir; tüm şema tipleri için örnek veri üreten genel bir sistem değildir.
- `length` verilirse bu değer basamak sayısı olarak değil sayısal üst sınır olarak kullanılır.

## Yardımcı Fonksiyonlar

### `get_schema(name)`

İsimle verilen bir şemayı `validator` içindeki çözümleme mantığıyla döndürür.

### `validate_inner_keys(path, object)`

Noktalı bir yolun var olup olmadığını ve tüm adımlarda null olmadan ilerleyip ilerlemediğini kontrol eder.

Örnek:

```ts
const ok = await validate_inner_keys('profile.address.city', payload);
```

### `get_value(name, req, res)`

Express middleware içinde kullanılan dahili yardımcıdır.

Çözümleme kuralları:

- `req.body.email`, `req` üzerinden başlar.
- `res.locals.user`, `res` üzerinden başlar.
- `body.email` de `req` üzerinden başlar çünkü varsayılan kök `req`'dir.

## Depo Yapısı

| Yol | Rol |
| --- | --- |
| `src/index.ts` | Ana giriş noktası ve export yüzeyi. |
| `src/validator` | Ana doğrulama motoru ve doğrulayıcı kayıtları. |
| `src/validator/validators` | Her doğrulayıcı için ayrı klasörler. |
| `src/class` | `Schema` ve `Status` sınıfları. |
| `src/express-middlewares` | Express entegrasyon yardımcıları. |
| `src/functions` | Şema yükleme, mesaj yükleme, DOM entegrasyonu ve genel yardımcılar. |
| `src/types` | TypeScript şema ve middleware tip tanımları. |
| `dist/validare-web.js` | Webpack tarafından üretilen tarayıcı bundle'ı. |
| `build` | Webpack girdisi olarak kullanılan derlenmiş JavaScript çıktısı. |
| `messages` | Örnek mesaj JSON dosyaları. |
| `test` | Tarayıcıdan yüklenen örnek şema parçaları. |

## Geliştirme Notları

`package.json` içindeki mevcut script'ler:

| Script | Komut | Anlam |
| --- | --- | --- |
| `npm run tsc` | `tsc ./test.ts --outDir ./build -w` | Mevcut test iskeleti etrafında TypeScript watch derlemesi. |
| `npm run nodemon` | `nodemon ./build/test.js` | Derlenen test script'ini çalıştırır. |

Webpack şu anda `build/index.js` dosyasını `dist/validare-web.js` içine UMD biçiminde ve `validare` kütüphane adıyla bundle eder.

## Bilinen Implementasyon Notları ve Sınırlamalar

Bu bölüm mevcut davranışı kodun implement ettiği haliyle açıklar.

1. `validateFile` middleware'i tamamlanmamıştır. Export edilir ama doğrulama yapmaz.
2. `ignore_empty`, boş string için `empty` hatası üretir; boş değeri yok saymaz.
3. Sayısal şema tiplerinde `min_length`, `max_length` ve `length`, basamak sayısı değil sayısal karşılaştırma değerleridir.
4. `base64` boyut kontrolleri decode edilmiş byte uzunluğu yerine encode edilmiş string uzunluğu ile yapılır.
5. `validator` ile doğrudan dosya doğrularken giriş olarak `Buffer` verilmelidir.
6. Dosya boyutu yardımcısı şu an minimum boyutun altındaki değerlerde de `max_size` döndürür; mevcut implementasyon davranışı budur.
7. `array.max_element_eq` ve `array.min_element_eq`, şu anda `max_element` ve `min_element` ile aynı kıyas mantığıyla çalışır; `_eq` eki farklı bir eşitlik semantiği getirmez.
8. `object` uzunluk kontrolü `value.length` kullandığından sadece bu özelliğe sahip nesnelerde anlamlıdır.
9. Tarayıcı tarafı şema yükleme, tam olarak `validare-schemas` ve `messages` meta etiket adlarına bağlıdır.
10. Bir hata için mesaj bulunamazsa `Status.message` boş kalabilir.

## Uçtan Uca Örnekler

### Örnek 1. İsimlendirilmiş Şemalar ile Sunucu Tarafı Doğrulama

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

### Örnek 2. Satır İçi Doğrudan Doğrulama

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

### Örnek 3. Tarayıcı Input Doğrulaması

```html
<input data-validate data-message-box="message" name="username" type="text">
<p id="message"></p>
<script src="/dist/validare-web.js"></script>
```

Sayfa yüklendiğinde input otomatik doğrulanır; kullanıcı yazarken veya alanı terk ettiğinde yeniden doğrulanır.

## Özet

validare en doğru şekilde üç entegrasyon stiline sahip şema tabanlı bir doğrulama motoru olarak düşünülmelidir:

- uygulama kodu içinde doğrudan doğrulama
- Express middleware bileşimi
- uzaktan yüklenen şema dosyaları ile tarayıcı tarafı input doğrulama

Mimarisi kompakt ve okunabilirdir: şema çözümleme, kısa devre bayrakları, türe özel doğrulayıcı zincirleri ve isteğe bağlı mesaj çevirisi. Üretim kullanımında özellikle boş değer semantiği, sayısal kıyas isimlendirmesi ve tamamlanmamış dosya middleware'i gibi mevcut implementasyon ayrıntılarına tam olarak uymak gerekir.