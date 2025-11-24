import type { NormalizedData, Variation } from "@/data/data";
import type { ZoomState } from "@/lib/zoom";

export const VARIATION_ID = {
  ALL: -1,
} as const;

export type VariationId = number;

export const LINE_STYLE = {
  LINE: "line",
  SMOOTH: "smooth",
  AREA: "area",
  HALO: "halo",
} as const;

export type LineStyle = (typeof LINE_STYLE)[keyof typeof LINE_STYLE];

export const lineStyles = Object.values(LINE_STYLE);

export function isLineStyle(value: string): value is LineStyle {
  return (lineStyles as string[]).includes(value);
}

export type ConversionChartProps = {
  variationId: VariationId;
  lineStyle?: LineStyle;
  zoomState: ZoomState | null;
  onZoomStateChange: (next: ZoomState | null) => void;
  chartData: NormalizedData;
  variations: Variation[];
  chartRef: React.RefObject<HTMLDivElement | null>;
};
