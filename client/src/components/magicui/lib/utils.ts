// src/lib/utils.ts

/**
 * Concatenates a list of class names, filtering out any falsy values.
 * This is useful for conditionally applying class names.
 * 
 * @param classes - An array of class names.
 * @returns A string with all the valid class names concatenated.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
  }
  