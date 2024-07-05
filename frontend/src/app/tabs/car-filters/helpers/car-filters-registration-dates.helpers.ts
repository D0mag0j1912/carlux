export function generateCarFiltersRegistrationYears(): number[] {
    const currentYear = new Date().getFullYear();
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    return range(currentYear, currentYear - 20, -1);
}
