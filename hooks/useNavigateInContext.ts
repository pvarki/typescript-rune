import {
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { isString } from "../helpers/isString";
import {
  RendererContext,
  RendererEvent,
} from "../RendererContextImpl";

/**
 * A hook that provides navigation functionality within a renderer context.
 */
export function useNavigateInContext ( context : RendererContext | undefined) : void {

  const navigate = useNavigate();

  const navigateEventCallback = useCallback(
    (_event: RendererEvent, to : unknown) => {
      if (isString(to)) {
        navigate(to);
      } else {
        console.error(`Error: Invalid navigation target:`, to);
      }
    },
    [navigate]
  );

  // Listen for navigation events from the renderer context
  useEffect(() => {
    if (!context) return;
    return context.addEventListener( RendererEvent.NAVIGATE, navigateEventCallback );
  });

}
