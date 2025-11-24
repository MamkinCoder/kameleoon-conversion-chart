import type { DropdownOption } from "./Dropdown/types";

export type DropdownConfig = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export type ControlsBarProps = {
  variationConfig: DropdownConfig;
  lineStyleConfig: DropdownConfig;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  zoomTargetLabel: string | null;
  onExportPng: () => void;
};
