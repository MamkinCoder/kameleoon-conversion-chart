import { CHART_LINE_WIDTH, DEFAULT_LINE_COLOR } from "@/theme/constants";
import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { LINE_STYLE, type LineStyle } from "../types";
import CommonParts from "./CommonParts";
import type { ChartStyleProps } from "./types";

type Props = ChartStyleProps & {
  lineStyle: LineStyle;
};

const LineChartStyle: React.FC<Props> = ({
  data,
  variations,
  lineStyle,
  variationColors,
  onDayClick,
}) => {
  const lineType = lineStyle === LINE_STYLE.SMOOTH ? "monotone" : "linear";

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        onClick={(state) => {
          if (!state || state.activeTooltipIndex == null) {
            onDayClick?.(null);
            return;
          }

          const localIdx = Number(state.activeTooltipIndex);
          if (Number.isNaN(localIdx)) {
            onDayClick?.(null);
            return;
          }

          onDayClick?.(localIdx);
        }}
      >
        <CommonParts data={data} />

        {variations.map((v) => (
          <Line
            key={v.name}
            type={lineType}
            dataKey={v.name}
            stroke={variationColors[v.name] ?? DEFAULT_LINE_COLOR}
            strokeWidth={CHART_LINE_WIDTH}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartStyle;
