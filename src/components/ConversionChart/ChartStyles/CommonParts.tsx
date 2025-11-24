import CustomTooltip from "@/components/ConversionChart/CustomTooltip/CustomTooltip";
import { buildPercentTicks } from "@/lib/dataTransform";
import { CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { formatDateTick, formatPercentTick } from "../constants";
import type { CommonPartsProps } from "./types";

const CommonParts: React.FC<CommonPartsProps> = ({ data }) => {
  const ticks = buildPercentTicks(data);
  const maxY = ticks[ticks.length - 1];
  return (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={formatDateTick}
        tick={{ fill: "var(--chart-axis-color)" }}
        axisLine={{ stroke: "var(--chart-axis-color)" }}
      />
      <YAxis
        domain={[0, maxY]}
        ticks={ticks}
        tickFormatter={formatPercentTick}
        tick={{ fill: "var(--chart-axis-color)" }}
        axisLine={{ stroke: "var(--chart-axis-color)" }}
      />
      <Tooltip content={(props) => <CustomTooltip {...props} />} />
    </>
  );
};

export default CommonParts;
