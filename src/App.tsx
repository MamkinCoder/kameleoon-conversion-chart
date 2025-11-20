import { useState } from "react";
import ControlsBar, { type DropdownConfig } from "./components/ControlsBar";
import ConversionChart from "./components/ConversionChart";

function App() {
  const [variation, setVariation] = useState("all");
  const [timeRange, setTimeRange] = useState("day");
  const [lineStyle, setLineStyle] = useState("line");

  const variationConfig: DropdownConfig = {
    label: "Variation",
    value: variation,
    onChange: setVariation,
    options: [
      { label: "All variations", value: "all" },
      { label: "Original", value: "0" },
      { label: "Variation A", value: "10001" },
      { label: "Variation B", value: "10002" },
      { label: "Variation C", value: "10003" },
    ],
  };

  const timeRangeConfig: DropdownConfig = {
    label: "Time range",
    value: timeRange,
    onChange: setTimeRange,
    options: [
      { label: "Day", value: "day" },
      { label: "Week", value: "week" },
    ],
  };

  const lineStyleConfig: DropdownConfig = {
    label: "Line style",
    value: lineStyle,
    onChange: setLineStyle,
    options: [
      { label: "Line", value: "line" },
      { label: "Smooth", value: "smooth" },
      { label: "Area", value: "area" },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <ControlsBar
        leftFirst={variationConfig}
        leftSecond={timeRangeConfig}
        right={lineStyleConfig}
      />

      {/* Later we’ll feed variation/timeRange/lineStyle into this */}
      <ConversionChart />
    </div>
  );
}

export default App;
