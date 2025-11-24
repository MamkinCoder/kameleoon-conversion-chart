import type { DropdownOption } from "@/components/ControlsBar/Dropdown/types";
import { THEME } from "./types";

export const themeOptions: DropdownOption[] = [
  { label: "Day", value: THEME.DAY },
  { label: "Night", value: THEME.NIGHT },
  { label: "System", value: THEME.SYSTEM },
];

export const LINE_COLORS = [
  "var(--line-1)",
  "var(--line-2)",
  "var(--line-3)",
  "var(--line-4)",
  "var(--line-5)",
] as const;

export const DEFAULT_LINE_COLOR = "var(--line-default)";
export const MUTED_GREY = "var(--color-grey-muted)";

export const CHART_LINE_WIDTH = 2;
