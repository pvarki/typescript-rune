import { isRegularObject } from "../helpers/isRegularObject";
import { isString } from "../helpers/isString";
import {
    BaseContent,
    isBaseContent,
} from "./BaseContent";
import {
    ContentType,
    isContentTypeOrString,
} from "./ContentType";

/**
 * Top-level content type (when it's an object, not a string).
 * These are usually views or modals.
 */
export interface RootContent extends BaseContent {
    readonly type     : ContentType | string;
    readonly classes ?: readonly string[];
    readonly name     : string;
}

/**
 * Returns true if the value is BaseContent.
 *
 * @param value
 */
export function isRootContent ( value: unknown) : value is RootContent {
    return (
        isBaseContent(value)
        && isRegularObject(value)
        && isContentTypeOrString(value?.type)
        && isString(value?.name)
    );
}
