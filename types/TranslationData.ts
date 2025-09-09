import { isRegularObject } from "../helpers/isRegularObject";
import { isString } from "../helpers/isString";

/**
 * Collection of translations in key-value pairs for a single language.
 */
export interface TranslationData {
    readonly [key: string]: string;
}

/**
 * Returns true if the value is TranslationData.
 *
 * @param value
 */
export function isTranslationData ( value: unknown) : value is TranslationData {
    return (
        isRegularObject(value)
        && Object.keys(value).findIndex(
            (key: string): boolean => !isString( value[key] )
        ) < 0
    );
}
