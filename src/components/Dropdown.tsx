export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <label
      style={{ display: "flex", flexDirection: "column", fontSize: "0.875rem" }}
    >
      <span style={{ marginBottom: "0.25rem" }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
