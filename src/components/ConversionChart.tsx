import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import raw from "../data/data.json";

type Variation = {
  id?: number;
  name: string;
};

type RawPoint = {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
};

type RawData = {
  variations: Variation[];
  data: RawPoint[];
};

const typedRaw = raw as RawData;
const { variations } = typedRaw;

const chartData = typedRaw.data.map((point) => {
  const row: Record<string, string | number> = {
    date: point.date,
  };

  variations.forEach((v) => {
    const idKey = (v.id ?? 0).toString();
    const visits = point.visits[idKey] ?? 0;
    const conv = point.conversions[idKey] ?? 0;

    const rate = visits > 0 ? (conv / visits) * 100 : 0;
    row[v.name] = rate;
  });

  return row;
});

const ConversionChart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `${v}%`} />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(2)}%`}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          {variations.map((v) => (
            <Line
              key={v.name}
              type="monotone"
              dataKey={v.name}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionChart;
