import {
    RootContent,
    isRootContent,
} from "./RootContent";
import { Content } from "./Content";
import { ContentType } from "./ContentType";

/**
 * Component content type.
 */
export interface ComponentContent extends RootContent {
    readonly type     : ContentType.COMPONENT;
    readonly classes ?: readonly string[];
    readonly name     : string;
    readonly body    ?: string | Content | readonly Content[];
}

/**
 * Returns true if the value is ComponentContent
 *
 * @param value
 */
export function isComponentContent (value: unknown) : value is ComponentContent {
    return (
        isRootContent(value)
        && value?.type === ContentType.COMPONENT
    );
}
