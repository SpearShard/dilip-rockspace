import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Standard Tailwind class merger
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Premium Animation Delay Utility
 * Usage: stagger(0.1, 0.5) // returns "0.1s" then "0.6s" etc.
 */
export const stagger = (delay: number, multiplier: number) => delay + multiplier;

/**
 * Safely format project years or dates
 */
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Truncate text for project cards
 */
export const truncate = (str: string, num: number) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};