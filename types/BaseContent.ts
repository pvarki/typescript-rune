import { isArrayOrUndefined } from "../helpers/isArray";
import { isRegularObject } from "../helpers/isRegularObject";
import {
    ContentType,
    isContentTypeOrString,
} from "./ContentType";

/**
 * Base content type (e.g. when it's an object, not a string)
 */
export interface BaseContent {
    readonly type     : ContentType | string;
    readonly classes ?: readonly string[];
}

/**
 * Returns true if the value is BaseContent.
 *
 * @param value
 */
export function isBaseContent ( value: unknown) : value is BaseContent {
    return (
        isRegularObject(value)
        && isContentTypeOrString(value?.type)
        && isArrayOrUndefined(value?.classes)
    );
}
