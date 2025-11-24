import ExportIcon from "@/assets/icons/ExportIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import TechnicalRefreshIcon from "@/assets/icons/TechnicalRefreshIcon";
import { themeOptions } from "@/theme/constants";
import { useTheme } from "@/theme/theme";
import { THEME } from "@/theme/types";
import React from "react";
import Dropdown from "./Dropdown/Dropdown";
import styles from "./styles.module.css";
import type { ControlsBarProps } from "./types";

const ControlsBar: React.FC<ControlsBarProps> = ({
  variationConfig,
  lineStyleConfig,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoomTargetLabel,
  onExportPng,
}) => {
  const { theme, setTheme } = useTheme();

  const triggerSpin = (el: HTMLElement) => {
    el.classList.remove(styles.spinOnce);
    el.classList.remove(styles.jiggle);

    void el.offsetWidth;

    el.classList.add(styles.spinOnce);

    el.addEventListener(
      "animationend",
      () => {
        el.classList.remove(styles.spinOnce);
        el.classList.add(styles.jiggle);
      },
      { once: true }
    );
  };

  return (
    <div className={styles.controlsRow}>
      <div className={styles.group}>
        <div className={styles.subGroup}>
          <Dropdown
            value={variationConfig.value}
            options={variationConfig.options}
            onChange={variationConfig.onChange}
          />

          <Dropdown
            value={theme}
            options={themeOptions}
            onChange={(v) =>
              setTheme(v as typeof THEME.DAY | typeof THEME.NIGHT)
            }
          />
        </div>
      </div>

      <div className={styles.group}>
        <Dropdown
          value={lineStyleConfig.value}
          options={lineStyleConfig.options}
          onChange={lineStyleConfig.onChange}
          prefix="Line style:"
        />

        <div className={styles.subGroup}>
          <button type="button" className={styles.button} onClick={onExportPng}>
            <ExportIcon className={styles.buttonIcon} />
          </button>

          <div>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonMinus}`}
              onClick={onZoomOut}
              aria-label="Zoom out"
            >
              <MinusIcon />
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPlus}`}
              onClick={onZoomIn}
              aria-label="Zoom in"
            >
              <PlusIcon />
            </button>
          </div>

          <div
            className={`${styles.center} ${styles.jiggle}`}
            onClick={(e) => {
              triggerSpin(e.currentTarget);
              onZoomReset();
            }}
          >
            <TechnicalRefreshIcon />
          </div>

          {zoomTargetLabel && (
            <span className={styles.zoomLabel}>
              Zooming into: <strong>{zoomTargetLabel}</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
