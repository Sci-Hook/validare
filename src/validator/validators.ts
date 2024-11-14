import { validate_onlytype } from "./validators/only-type";
import { validate_numbers } from "./validators/number";
import { validate_string } from "./validators/string";
import { validate_length } from "./validators/length";
import { validate_email } from "./validators/email";
import { validate_ip } from "./validators/ip";
import { validate_phone } from "./validators/phone";
import { validate_url } from "./validators/url";
import { validate_file } from "./validators/file";
import { validate_values } from "./validators/values";
import { validate_case } from "./validators/check-case";
import { validate_igonered } from "./validators/check-ignored";
import { validate_array } from "./validators/array";
import { validate_base64 } from "./validators/base64";
import { validate_doi } from "./validators/doi";

export const validators = {
    string:[validate_onlytype,validate_string,validate_length,validate_case,validate_igonered],
    number:[validate_onlytype,validate_numbers],
    bigint:[validate_onlytype,validate_numbers],
    object:[validate_onlytype,validate_length],
    boolean:[validate_onlytype],
    undefined:[validate_onlytype],
    email:[validate_email,validate_length],
    ip:[validate_ip,validate_length],
    phone:[validate_phone,validate_length],
    url:[validate_url,validate_length],
    "string-number":[validate_numbers],
    "file":[validate_file],
    "values":[validate_values],
    'array':[validate_array],
    'base64':[validate_base64],
    'doi':[validate_doi]

}