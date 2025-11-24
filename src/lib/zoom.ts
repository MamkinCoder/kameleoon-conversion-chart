import { formatDateTick } from "@/components/ConversionChart/constants";
import type { NormalizedData } from "@/data/data";

export type ZoomState = {
  anchorIndex: number;
  leftSpan: number;
  rightSpan: number;
  maxLeft: number;
  maxRight: number;
};

export function zoomIn(prev: ZoomState | null): ZoomState | null {
  if (!prev) return prev;

  let { anchorIndex, leftSpan, rightSpan, maxLeft, maxRight } = prev;

  if (leftSpan > 0 && rightSpan > 0) {
    leftSpan -= 1;
    rightSpan -= 1;
  } else if (leftSpan > 0) {
    leftSpan -= 1;
  } else if (rightSpan > 0) {
    rightSpan -= 1;
  } else {
    return prev;
  }

  return { anchorIndex, leftSpan, rightSpan, maxLeft, maxRight };
}

export function zoomOut(prev: ZoomState | null): ZoomState | null {
  if (!prev) return prev;

  let { anchorIndex, leftSpan, rightSpan, maxLeft, maxRight } = prev;

  if (leftSpan >= maxLeft && rightSpan >= maxRight) {
    return prev;
  }

  if (leftSpan < maxLeft && rightSpan < maxRight) {
    leftSpan += 1;
    rightSpan += 1;
  } else if (leftSpan < maxLeft) {
    leftSpan += 1;
  } else if (rightSpan < maxRight) {
    rightSpan += 1;
  }

  return { anchorIndex, leftSpan, rightSpan, maxLeft, maxRight };
}

export function getZoomLabel(
  zoomState: ZoomState | null,
  data: NormalizedData
): string | null {
  if (!zoomState) return null;

  const row = data[zoomState.anchorIndex];
  if (!row) return null;

  const rawDate = row.date as string | undefined;
  if (!rawDate) return null;

  return formatDateTick(rawDate);
}
