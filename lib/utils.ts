import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of the input string.
 *
 * If `normalize` is true, the input string is converted to lowercase before capitalization.
 *
 * @param {string} _input - The input string to be capitalized.
 * @param {boolean} [normalize=true] - Whether to convert the input to lowercase before capitalizing. Defaults to true.
 * @returns {string} The capitalized string.
 *
 * @example
 * capitalize("hELLO"); // Returns "Hello"
 * capitalize("hELLO", false); // Returns "HELLO"
 */
export function capitalize(_input: string, normalize = true): string {
  const input = normalize ? _input.toLowerCase() : _input;

  return input.charAt(0).toUpperCase() + input.slice(1);
}
