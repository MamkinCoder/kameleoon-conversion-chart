import type { DropdownOption } from "@/components/ControlsBar/Dropdown/types";
import { VARIATION_ID } from "@/components/ConversionChart/types";
import type { ExperimentData, NormalizedData } from "@/data/data";

export function normalizeExperimentData(raw: ExperimentData): NormalizedData {
  const { variations } = raw;

  return raw.data.map((point) => {
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
}

export function buildVariationOptions(raw: ExperimentData): DropdownOption[] {
  const options: DropdownOption[] = [];

  options.push({
    label: "All variations",
    value: String(VARIATION_ID.ALL),
  });

  raw.variations.forEach((v) => {
    const id = v.id ?? 0;
    options.push({
      label: v.name,
      value: String(id),
    });
  });

  return options;
}

export function buildPercentTicks(
  data: Array<Record<string, number | string>>
): number[] {
  let max = 0;

  for (const row of data) {
    for (const [key, value] of Object.entries(row)) {
      if (key === "date") continue;

      const n = typeof value === "number" ? value : Number(value);

      if (!Number.isNaN(n) && n > max) {
        max = n;
      }
    }
  }

  const roundedMax = Math.ceil(max / 10) * 10 || 10;

  const ticks: number[] = [];
  for (let v = 0; v <= roundedMax; v += 10) {
    ticks.push(v);
  }

  return ticks;
}
