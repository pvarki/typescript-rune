import { isRegularObject } from "../helpers/isRegularObject";
import { isString } from "../helpers/isString";
import {
    BaseContent,
    isBaseContent,
} from "./BaseContent";
import { Content } from "./Content";
import { ContentType } from "./ContentType";

/**
 * Base content type (e.g. when it's an object, not a string)
 */
export interface BaseParentContent extends BaseContent {
    readonly type     : ContentType | string;
    readonly variant ?: { readonly width ?: "full" };
    readonly body    ?: Content | readonly Content[];
}

/**
 * Returns true if the value is BaseParentContent.
 *
 * @param value
 */
export function isBaseParentContent ( value: unknown) : value is BaseParentContent {
    return (
        isBaseContent(value)
        && isRegularObject(value)
        && isString(value?.type)
    );
}
