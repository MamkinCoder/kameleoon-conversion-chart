import { getZoomLabel, zoomIn, zoomOut, type ZoomState } from "@/lib/zoom";
import { useCallback, useMemo, useState } from "react";

export const useZoom = (chartData: any) => {
  const [zoomState, setZoomState] = useState<ZoomState | null>(null);

  const zoomTargetLabel = useMemo(
    () => getZoomLabel(zoomState, chartData),
    [zoomState, chartData]
  );

  const onZoomIn = useCallback(() => {
    setZoomState((prev) => zoomIn(prev));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoomState((prev) => zoomOut(prev));
  }, []);

  const onZoomReset = useCallback(() => {
    setZoomState(null);
  }, []);

  return {
    zoomState,
    setZoomState,
    zoomTargetLabel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
  };
};
