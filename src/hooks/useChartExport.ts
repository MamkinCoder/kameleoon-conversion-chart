import {
  VARIATION_ID,
  type VariationId,
} from "@/components/ConversionChart/types";
import type { ExperimentData } from "@/data/data";
import { DEFAULT_LINE_COLOR, LINE_COLORS } from "@/theme/constants";
import type { RefObject } from "react";
import { useCallback, useMemo } from "react";

type Variations = ExperimentData["variations"];

interface UseChartExportParams {
  chartRef: RefObject<HTMLDivElement | null>;
  variationId: VariationId;
  variations: Variations;
}

export const useChartExport = ({
  chartRef,
  variationId,
  variations,
}: UseChartExportParams) => {
  const variationColors = useMemo(() => {
    const map: Record<string, string> = {};
    variations.forEach((v, index) => {
      const color =
        index === 0
          ? DEFAULT_LINE_COLOR
          : LINE_COLORS[(index - 1) % LINE_COLORS.length];

      map[v.name] = color;
    });
    return map;
  }, [variations]);

  const resolveColor = useCallback((colorStr: string): string => {
    if (!colorStr.startsWith("var(")) return colorStr;

    const varName = colorStr.slice(4, -1).trim();

    const rootStyles = getComputedStyle(document.documentElement);
    const resolved = rootStyles.getPropertyValue(varName).trim();

    return resolved || colorStr;
  }, []);

  const handleExportPng = useCallback(() => {
    const container = chartRef.current;
    if (!container) return;

    const svgNodes = Array.from(
      container.querySelectorAll("svg")
    ) as SVGSVGElement[];

    if (!svgNodes.length) return;

    let svg = svgNodes[0];
    let maxArea = (svg.clientWidth || 0) * (svg.clientHeight || 0);

    svgNodes.forEach((node) => {
      const area = (node.clientWidth || 0) * (node.clientHeight || 0);
      if (area > maxArea) {
        maxArea = area;
        svg = node;
      }
    });

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement;

    const originalElems = svg.querySelectorAll<SVGElement>(
      "[stroke^='var'], [fill^='var']"
    );
    const clonedElems = clonedSvg.querySelectorAll<SVGElement>(
      "[stroke^='var'], [fill^='var']"
    );

    originalElems.forEach((origEl, index) => {
      const cloneEl = clonedElems[index];
      const styles = getComputedStyle(origEl);

      const stroke = styles.stroke;
      const fill = styles.fill;

      if (stroke && stroke !== "none") cloneEl.setAttribute("stroke", stroke);
      if (fill && fill !== "none") cloneEl.setAttribute("fill", fill);
    });

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);

    const img = new Image();
    img.onload = () => {
      const vb = svg.viewBox;
      const width =
        (vb && vb.baseVal && vb.baseVal.width) || svg.clientWidth || 800;
      const height =
        (vb && vb.baseVal && vb.baseVal.height) || svg.clientHeight || 400;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);

      const visibleVariations =
        variationId === VARIATION_ID.ALL
          ? variations
          : variations.filter((v) => (v.id ?? 0) === variationId);

      if (visibleVariations.length > 0) {
        const padding = 16;
        const lineGap = 18;
        const dotRadius = 4;

        const startX = padding;
        const startY = padding + 20;

        ctx.font =
          "12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textBaseline = "middle";

        const defaultTextColor = resolveColor(DEFAULT_LINE_COLOR);

        visibleVariations.forEach((v, index) => {
          const y = startY + index * lineGap;

          const cssColor = variationColors[v.name] ?? "#888";
          const trueColor = resolveColor(cssColor);

          ctx.beginPath();
          ctx.arc(startX + dotRadius, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = trueColor;
          ctx.fill();

          ctx.fillStyle = defaultTextColor;
          ctx.fillText(String(v.name), startX + dotRadius * 2 + 6, y);
        });
      }

      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
  }, [chartRef, variationId, variations, variationColors, resolveColor]);

  return { handleExportPng };
};
