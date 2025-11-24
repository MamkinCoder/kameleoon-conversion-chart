import { DEFAULT_LINE_COLOR, LINE_COLORS } from "@/theme/constants";
import AreaChartStyle from "./ChartStyles/AreaChartStyle";
import HaloChartStyle from "./ChartStyles/HaloChartStyle";
import LineChartStyle from "./ChartStyles/LineChartStyle";
import { LINE_STYLE, VARIATION_ID, type ConversionChartProps } from "./types";

const ConversionChart: React.FC<ConversionChartProps> = ({
  variationId = VARIATION_ID.ALL,
  lineStyle = LINE_STYLE.LINE,
  zoomState,
  onZoomStateChange,
  chartData,
  variations,
  chartRef,
}) => {
  const variationColors: Record<string, string> = {};
  variations.forEach((v, index) => {
    const color =
      index === 0
        ? DEFAULT_LINE_COLOR
        : LINE_COLORS[(index - 1) % LINE_COLORS.length];

    variationColors[v.name] = color;
  });

  const filteredVariations =
    variationId === VARIATION_ID.ALL
      ? variations
      : variations.filter((v) => (v.id ?? 0) === variationId);

  const total = chartData.length;

  let start = 0;
  let end = total - 1;

  if (zoomState) {
    start = Math.max(0, zoomState.anchorIndex - zoomState.leftSpan);
    end = Math.min(total - 1, zoomState.anchorIndex + zoomState.rightSpan);
  }

  const dataForRange = chartData.slice(start, end + 1);

  const handleDayClick = (localIndex: number | null) => {
    if (localIndex == null || Number.isNaN(localIndex)) {
      onZoomStateChange(null);
      return;
    }

    const globalIndex = start + localIndex;

    const leftMax = globalIndex;
    const rightMax = total - 1 - globalIndex;

    onZoomStateChange({
      anchorIndex: globalIndex,
      leftSpan: leftMax,
      rightSpan: rightMax,
      maxLeft: leftMax,
      maxRight: rightMax,
    });
  };

  const chartRenderers = {
    [LINE_STYLE.AREA]: (
      <AreaChartStyle
        data={dataForRange}
        variations={filteredVariations}
        variationColors={variationColors}
        onDayClick={handleDayClick}
      />
    ),
    [LINE_STYLE.HALO]: (
      <HaloChartStyle
        data={dataForRange}
        variations={filteredVariations}
        variationColors={variationColors}
        onDayClick={handleDayClick}
      />
    ),
    [LINE_STYLE.LINE]: (
      <LineChartStyle
        data={dataForRange}
        variations={filteredVariations}
        variationColors={variationColors}
        lineStyle={lineStyle}
        onDayClick={handleDayClick}
      />
    ),
    [LINE_STYLE.SMOOTH]: (
      <LineChartStyle
        data={dataForRange}
        variations={filteredVariations}
        variationColors={variationColors}
        lineStyle={lineStyle}
        onDayClick={handleDayClick}
      />
    ),
  } as const;

  return (
    <div ref={chartRef} style={{ width: "100%", height: 400 }}>
      {chartRenderers[lineStyle]}
    </div>
  );
};

export default ConversionChart;
