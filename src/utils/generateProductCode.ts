import { nanoid } from 'nanoid';

export function generateProductCode(): string {
  const prefix = 'SP-';
  const randomPart = nanoid(6).toUpperCase(); // Generate a random string of 8 characters
  return `${prefix}${randomPart}`;
}
