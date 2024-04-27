import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: string[]): string {
  return twMerge(clsx(inputs))
}
