import CalendarIcon from "@/assets/icons/CalendarIcon";
import RewardIcon from "@/assets/icons/RewardIcon";
import React, { useMemo } from "react";
import type { TooltipContentProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatFullDate } from "../constants";
import styles from "./styles.module.css";

type CustomTooltipProps = TooltipContentProps<ValueType, NameType>;

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const sorted = useMemo(
    () =>
      [...payload].sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0)),
    [payload]
  );

  const dateLabel = formatFullDate(String(label));

  return (
    <div className={styles.tooltip}>
      <div className={styles.header}>
        <span className={styles.calendar} aria-hidden="true">
          <CalendarIcon />
        </span>
        <span className={styles.date}>{dateLabel}</span>
      </div>

      <div className={styles.separator} />

      <div className={styles.rows}>
        {sorted.map((item, index) => {
          const valueNum = Number(item.value ?? 0);
          const valueLabel = Number.isFinite(valueNum)
            ? `${valueNum.toFixed(2)}%`
            : item.value;

          return (
            <div key={String(item.dataKey ?? item.name)} className={styles.row}>
              <div className={styles.rowLeft}>
                <span
                  className={styles.bullet}
                  style={{ backgroundColor: item.color || "#888" }}
                />
                <span className={styles.name}>{item.name}</span>
                {index === 0 ? <RewardIcon /> : null}
              </div>
              <span className={styles.value}>{valueLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTooltip;
