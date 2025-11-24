export type Variation = {
  id?: number;
  name: string;
};

export type DataPoint = {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
};

export type ExperimentData = {
  variations: Variation[];
  data: DataPoint[];
};

export type NormalizedData = Record<string, string | number>[];
