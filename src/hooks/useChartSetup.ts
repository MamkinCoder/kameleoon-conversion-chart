import type { DropdownConfig } from "@/components/ControlsBar/types";
import { lineStyleOptions } from "@/components/ConversionChart/constants";
import {
  LINE_STYLE,
  VARIATION_ID,
  type LineStyle,
  type VariationId,
} from "@/components/ConversionChart/types";
import type { ExperimentData } from "@/data/data";
import rawJson from "@/data/data.json";
import { useZoom } from "@/hooks/useZoom";
import {
  buildVariationOptions,
  normalizeExperimentData,
} from "@/lib/dataTransform";
import { useRef, useState } from "react";

const raw = rawJson as ExperimentData;
const chartData = normalizeExperimentData(raw);
const { variations } = raw;

export const useChartSetup = () => {
  const [variation, setVariation] = useState<string>(String(VARIATION_ID.ALL));
  const [variationId, setVariationId] = useState<VariationId>(VARIATION_ID.ALL);
  const [lineStyle, setLineStyle] = useState<LineStyle>(LINE_STYLE.LINE);

  const chartRef = useRef<HTMLDivElement | null>(null);

  const {
    zoomState,
    setZoomState,
    zoomTargetLabel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
  } = useZoom(chartData);

  const variationConfig: DropdownConfig = {
    value: variation,
    onChange: (value) => {
      setVariation(value);
      setVariationId(Number(value) as VariationId);
    },
    options: buildVariationOptions(raw),
  };

  const lineStyleConfig: DropdownConfig = {
    value: lineStyle,
    onChange: (value) => setLineStyle(value as LineStyle),
    options: lineStyleOptions,
  };

  return {
    variationConfig,
    lineStyleConfig,
    zoomTargetLabel,
    onZoomIn,
    onZoomOut,
    onZoomReset,

    variationId,
    lineStyle,
    zoomState,
    setZoomState,
    chartData,
    variations,
    chartRef,
  };
};
