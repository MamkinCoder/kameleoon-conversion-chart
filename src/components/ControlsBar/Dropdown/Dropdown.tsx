import DownArrowIcon from "@/assets/icons/DownArrowIcon";
import React, { useRef } from "react";
import styles from "./styles.module.css";
import type { DropdownProps } from "./types";

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  prefix,
}) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const selected = options.find((o) => o.value === value);
  const selectedLabel = selected?.label ?? "";

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        selectRef.current?.focus();
        selectRef.current?.click();
      }}
    >
      <div className={styles.display}>
        {prefix && <span>{prefix}</span>}
        <span>{selectedLabel}</span>

        <DownArrowIcon className={styles.arrow} />
      </div>

      <select
        ref={selectRef}
        className={styles.nativeSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
