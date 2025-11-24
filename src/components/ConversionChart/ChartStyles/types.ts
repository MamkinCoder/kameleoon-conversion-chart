import type { ExperimentData, NormalizedData } from "@/data/data";

export type ChartPoint = ReturnType<typeof Object> & {
  date: string;
};

export type Variation = ExperimentData["variations"][number];

export type CommonPartsProps = {
  data: NormalizedData;
};

export type ChartStyleProps = {
  data: NormalizedData;
  variations: Variation[];
  variationColors: Record<string, string>;
  onDayClick?: (localIndex: number | null) => void;
};
