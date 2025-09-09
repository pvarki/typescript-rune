import { isRegularObject } from "../helpers/isRegularObject";
import {
    ContentType,
} from "./ContentType";
import { TranslationCollection, isTranslationCollection } from "./TranslationCollection";

/**
 * Translation content for i18n
 */
export interface TranslationContent {
    readonly type : ContentType.I18N;
    readonly data : TranslationCollection;
}

/**
 * Returns true if the value is TranslationContent.
 *
 * @param value
 */
export function isTranslationContent ( value: unknown) : value is TranslationContent {
    return (
        isRegularObject(value)
        && value?.type === ContentType.I18N
        && isTranslationCollection(value?.data)
    );
}
