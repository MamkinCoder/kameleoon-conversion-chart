import React from "react";
import styles from "../styles/ControlsBar.module.css";
import Dropdown, { type DropdownOption } from "./Dropdown";

export type DropdownConfig = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

type ControlsBarProps = {
  leftFirst: DropdownConfig;
  leftSecond: DropdownConfig;
  right: DropdownConfig;
};

const ControlsBar: React.FC<ControlsBarProps> = ({
  leftFirst,
  leftSecond,
  right,
}) => {
  return (
    <div className={styles.controlsRow}>
      <div className={styles.leftGroup}>
        <Dropdown
          label={leftFirst.label}
          value={leftFirst.value}
          options={leftFirst.options}
          onChange={leftFirst.onChange}
        />
        <Dropdown
          label={leftSecond.label}
          value={leftSecond.value}
          options={leftSecond.options}
          onChange={leftSecond.onChange}
        />
      </div>

      <div className={styles.rightGroup}>
        <Dropdown
          label={right.label}
          value={right.value}
          options={right.options}
          onChange={right.onChange}
        />
      </div>
    </div>
  );
};

export default ControlsBar;
