import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type LockedTooltip = {
  index: number;
  label: string | number;
  payload: TooltipContentProps<ValueType, NameType>["payload"];
};
