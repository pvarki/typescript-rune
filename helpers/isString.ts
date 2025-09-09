
export function isString (value: unknown): value is string {
    return typeof value === "string";
}

export function isStringOrUndefined (value: unknown): value is string | undefined {
    return value === undefined || typeof value === "string";
}
