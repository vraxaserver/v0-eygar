import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (
    amountInCents: number | null | undefined,
    currencyCode: string | null | undefined
): string => {
    // Provide a default if data is missing
    if (typeof amountInCents !== "number" || !currencyCode) {
        return "N/A";
    }

    // Convert from cents to the main unit (e.g., 15000 -> 150.00)
    const amount: number = amountInCents / 100;

    // Use the browser's Internationalization API for perfect formatting
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0, // Hides .00 for whole numbers
        maximumFractionDigits: 2,
    }).format(amount);
};
