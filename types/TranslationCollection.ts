import { isRegularObject } from "../helpers/isRegularObject";
import {
    isTranslationData,
    TranslationData,
} from "./TranslationData";

/**
 * Collection of translations
 */
export interface TranslationCollection {
    readonly [lang: string]: TranslationData;
}

/**
 * Returns true if the value is TranslationCollection.
 *
 * @param value
 */
export function isTranslationCollection ( value: unknown) : value is TranslationCollection {
    return (
        isRegularObject(value)
        && Object.keys(value).findIndex((key: string): boolean => {
            return !isTranslationData( (value as unknown as {[key: string]: unknown})[key] );
        }) < 0
    );
}
