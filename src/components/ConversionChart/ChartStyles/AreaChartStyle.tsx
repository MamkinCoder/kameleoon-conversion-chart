import { CHART_LINE_WIDTH, DEFAULT_LINE_COLOR } from "@/theme/constants";
import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import CommonParts from "./CommonParts";
import type { ChartStyleProps } from "./types";

const AreaChartStyle: React.FC<ChartStyleProps> = ({
  data,
  variations,
  variationColors,
  onDayClick,
}) => {
  return (
    <ResponsiveContainer>
      <AreaChart
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
        {variations.map((v) => {
          const stroke = variationColors[v.name] ?? DEFAULT_LINE_COLOR;

          return (
            <Area
              key={v.name}
              type="monotone"
              dataKey={v.name}
              stroke={stroke}
              strokeWidth={CHART_LINE_WIDTH}
              dot={false}
              fill={stroke}
              fillOpacity={0.3}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartStyle;
