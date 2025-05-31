import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getWeekDates(timestampMs: number): Date[] {
    const origDate = new Date(timestampMs);
    const day = origDate.getDay();

    const dayDiffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(origDate);
    monday.setDate(origDate.getDate() + dayDiffToMonday);

    const weekRange: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const dt = new Date(monday);
        dt.setDate(monday.getDate() + i);
        weekRange.push(dt);
    }

    return weekRange;
}