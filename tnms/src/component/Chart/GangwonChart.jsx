// GyeonggiChart.jsx
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function GyeonggiChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/ChartJSON/ChartGyeonggi.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>Loading...</p>;

  // ===== 값 추출 =====
  const windValue = data.WS_MAX.value;   // 강풍
  const rainValue = data.RN_DAY.value;   // 호우
  const snowValue = data.SD_MAX.value;   // 폭설
  const tempValue = data.TA_AVG.value;   // 한파
  const dustValue = 0;                    // 황사
  const fireValue = 0;                    // 산불
  const landslideValue = 0;               // 산사태

  // ===== 색상 함수 =====
  const getWindColor = (val) => {
    if (val < 7) return "rgba(75,192,192,0.6)";
    if (val < 14) return "rgba(255,206,86,0.6)";
    return "rgba(255,99,132,0.6)";
  };

  const getRainColor = (val) => {
    if (val <= 5) return "rgba(75,192,192,0.6)";
    if (val <= 20) return "rgba(255,206,86,0.6)";
    return "rgba(255,99,132,0.6)";
  };

  const getSnowColor = (val) => {
    if (val <= 5) return "rgba(75,192,192,0.6)";
    if (val <= 20) return "rgba(255,206,86,0.6)";
    return "rgba(255,99,132,0.6)";
  };

  const getTempColor = (val) => {
    if (val >= 10) return "rgba(75,192,192,0.6)";
    if (val >= 0) return "rgba(255,206,86,0.6)";
    return "rgba(255,99,132,0.6)";
  };

  // ===== 차트 데이터 =====
  const chartConfigs = [
    { label: "강풍", value: windValue, unit: "m/s", color: getWindColor(windValue) },
    { label: "호우", value: rainValue, unit: "mm", color: getRainColor(rainValue) },
    { label: "폭설", value: snowValue, unit: "cm", color: getSnowColor(snowValue) },
    { label: "한파", value: tempValue, unit: "℃", color: getTempColor(tempValue) },
    { label: "황사", value: dustValue, unit: "", color: "rgba(200,200,200,0.3)" },
    { label: "산불", value: fireValue, unit: "", color: "rgba(200,200,200,0.3)" },
    { label: "산사태", value: landslideValue, unit: "", color: "rgba(200,200,200,0.3)" },
  ];

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const unitMap = {
              "강풍": "m/s",
              "호우": "mm",
              "폭설": "cm",
              "한파": "℃",
              "황사": "",
              "산불": "",
              "산사태": "",
            };
            return `${context.raw} ${unitMap[context.label]}`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 30,
        ticks: { callback: (v) => [0, 14, 21, 30].includes(v) ? v : "" },
      },
      y: { ticks: { font: { size: 12 } } },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      {chartConfigs.map((cfg) => (
        <div key={cfg.label} className="w-[600px] h-[80px] flex flex-col">
          <Bar
            data={{
              labels: [cfg.label],
              datasets: [
                {
                  label: cfg.label,
                  data: [cfg.value],
                  backgroundColor: cfg.color,
                  borderRadius: 4,
                  barThickness: 25,
                },
              ],
            }}
            options={options}
          />
          <div className="text-center text-xs -mt-2 text-gray-700">{cfg.unit}</div>
        </div>
      ))}
    </div>
  );
}
