import { HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding } from "crypto";

export const SERVER_URL = "http://localhost:3000/api/v1";

export const ENCRYPTION_ALGORITHM = "aes256";
export const INPUT_ENCODING: Utf8AsciiBinaryEncoding = "utf-8";
export const OUTPUT_ENCODING: HexBase64BinaryEncoding = "base64";
