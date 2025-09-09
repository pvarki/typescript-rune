import {
    RootContent,
    isRootContent,
} from "./RootContent";
import { ContentType } from "./ContentType";

/**
 * Asset content type.
 */
export interface AssetContent extends RootContent {
    readonly type  : ContentType.ASSET;
    readonly name  : string;
    readonly body  : string;
}

/**
 * Returns true if the value is AssetContent
 *
 * @param value
 */
export function isAssetContent (value: unknown) : value is AssetContent {
    return (
        isRootContent(value)
        && value?.type === ContentType.ASSET
    );
}
