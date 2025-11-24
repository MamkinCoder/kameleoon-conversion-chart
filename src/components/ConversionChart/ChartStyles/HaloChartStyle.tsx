import { DEFAULT_LINE_COLOR } from "@/theme/constants";
import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import CommonParts from "./CommonParts";
import type { ChartStyleProps } from "./types";

const HaloChartStyle: React.FC<ChartStyleProps> = ({
  data,
  variations,
  variationColors,
  onDayClick,
}) => {
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

        {variations.map((v) => {
          const stroke = variationColors[v.name] ?? DEFAULT_LINE_COLOR;

          return (
            <React.Fragment key={v.name}>
              <Line
                type="monotone"
                dataKey={v.name}
                stroke={stroke}
                strokeWidth={20}
                strokeOpacity={0.25}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey={v.name}
                stroke={stroke}
                strokeWidth={1}
                dot={false}
              />
            </React.Fragment>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HaloChartStyle;
