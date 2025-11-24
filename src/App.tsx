import "@/App.css";
import ControlsBar from "@/components/ControlsBar/ControlsBar";
import ConversionChart from "@/components/ConversionChart/ConversionChart";
import { useChartExport, useChartSetup, useZoom } from "@/hooks";

function App() {
  const {
    variationConfig,
    lineStyleConfig,
    variationId,
    lineStyle,
    chartData,
    variations,
    chartRef,
  } = useChartSetup();

  const {
    zoomState,
    setZoomState,
    zoomTargetLabel,
    onZoomIn,
    onZoomOut,
    onZoomReset,
  } = useZoom(chartData);

  const { handleExportPng } = useChartExport({
    chartRef,
    variationId,
    variations,
  });

  return (
    <div className="app">
      <main className="app-main">
        <div className="chart-container">
          <ControlsBar
            variationConfig={variationConfig}
            lineStyleConfig={lineStyleConfig}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onZoomReset={onZoomReset}
            zoomTargetLabel={zoomTargetLabel}
            onExportPng={handleExportPng}
          />

          <ConversionChart
            variationId={variationId}
            lineStyle={lineStyle}
            zoomState={zoomState}
            onZoomStateChange={setZoomState}
            chartData={chartData}
            variations={variations}
            chartRef={chartRef}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
