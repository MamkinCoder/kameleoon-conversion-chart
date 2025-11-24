export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  prefix?: string;
};
