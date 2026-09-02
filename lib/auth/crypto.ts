import {
  createHash,
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(nodeScrypt);
const PASSWORD_HASH_PREFIX = "scrypt";

export function createOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashOpaqueToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashOrganizerPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `${PASSWORD_HASH_PREFIX}$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyOrganizerPassword(
  password: string,
  encodedHash: string,
): Promise<boolean> {
  const [prefix, salt, expectedHex, ...rest] = encodedHash.split("$");

  if (
    prefix !== PASSWORD_HASH_PREFIX ||
    !salt ||
    !expectedHex ||
    rest.length > 0 ||
    !/^[a-f\d]{128}$/i.test(expectedHex)
  ) {
    return false;
  }

  const expected = Buffer.from(expectedHex, "hex");
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;

  return timingSafeEqual(actual, expected);
}