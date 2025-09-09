import {
    RootContent,
    isRootContent,
} from "./RootContent";
import { Content } from "./Content";
import { ContentType } from "./ContentType";

/**
 * View content type.
 */
export interface ViewContent extends RootContent {
    readonly type  : ContentType;
    readonly name  : string;
    readonly path ?: string;
    readonly body  : string | Content | readonly Content[];
}

/**
 * Returns true if the value is ViewContent
 *
 * @param value
 */
export function isViewContent (value: unknown) : value is ViewContent {
    return (
        isRootContent(value)
        && value?.type === ContentType.VIEW
    );
}
