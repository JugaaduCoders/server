import * as crypto from 'crypto';

const SALT_LENGTH = 16;
const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const HASH_ALGORITHM = 'sha512';

function generateSalt(length: number = SALT_LENGTH): string {
  return crypto.randomBytes(length).toString('hex');
}

function generatePasswordHash(password: string, salt: string) {
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    HASH_ALGORITHM
  );
  return hash.toString('hex');
}

function createHashPassword(password: string): string {
  const salt = generateSalt();
  const hash = generatePasswordHash(password, salt);
  return `${salt}:${hash}`;
}

function verifyPassword(
  inputPassword: string,
  storedPassword: string
): boolean {
  const [salt, storedHash] = storedPassword.split(':');
  if (!salt || !storedHash) {
    throw new Error('Invalid stored password format');
  }

  const passwordHash = generatePasswordHash(inputPassword, salt);
  return storedHash === passwordHash;
}

export const hashing = {
  createHashPassword,
  verifyPassword,
};
