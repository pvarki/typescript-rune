
export function isRegularObject (value: unknown): value is {[key: string]: unknown} {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof Date) &&
        !(value instanceof RegExp)
    );
}
