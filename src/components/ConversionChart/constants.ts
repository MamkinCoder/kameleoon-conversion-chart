import type { DropdownOption } from "@/components/ControlsBar/Dropdown/types";
import { LINE_STYLE } from "./types";

export const lineStyleOptions: DropdownOption[] = [
  { label: "line", value: LINE_STYLE.LINE },
  { label: "smooth", value: LINE_STYLE.SMOOTH },
  { label: "area", value: LINE_STYLE.AREA },
  { label: "halo", value: LINE_STYLE.HALO },
];

export function formatDateTick(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export function formatFullDate(isoDate: string): string {
  const d = new Date(isoDate);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatPercentTick(percent: string): string {
  return `${percent}%`;
}
