import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(_input: string, normalize = true): string {
  const input = normalize ? _input.toLowerCase() : _input;

  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function parsePage(page: string | undefined) {
  if (!page) return 1;

  const parsed = parseInt(page);
  if (isNaN(parsed)) return 1;

  return Math.max(1, parsed);
}
