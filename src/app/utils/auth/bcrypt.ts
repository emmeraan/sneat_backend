
import * as bcrypt from 'node-php-password';


export function hashPassword(pass: string): string {
  return bcrypt.hash(pass);
}

export function checkHash(pass: string, hash: string): boolean {
  return bcrypt.verify(pass, hash);
}
