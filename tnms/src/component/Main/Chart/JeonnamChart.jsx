// JeonnamChart.jsx
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

// 그래프 안쪽 색상
const plotAreaPlugin = { // 차트 플러그인 객체
  id: "customPlotAreaBackground", // 플러그인 객체 이름
  beforeDraw: (chart) => { // 차트가 그려지기 전에 콜백함수임
    const { ctx, chartArea } = chart; // chartArea = { top, left, bottom, right }
    ctx.save();
    ctx.fillStyle = "#ffffff"; // 차트 안쪽 배경색
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height); // 사각형을 그리는 거 이 순서대로
    ctx.restore();
  },
};

export default function JeonnamChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/ChartJSON/ChartJeonnam.json") // 내가 만든 JSON 파일 호출용??
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
 const legendColors = [ // 이건 색상표 색
    { label: "좋음", color: "#10C525" },
    { label: "보통", color: "#F3FB00" },
    { label: "나쁨", color: "#FF941A" },
    { label: "매우 나쁨", color: "#FF2C30" },
  ];
  if (!data) return <p>Loading...</p>;

  // ===== 값 추출 =====
  const windValue = data.WS_MAX.value;   // 강풍
  const rainValue = data.RN_DAY.value === -9 ? 32 : data.RN_DAY.value;   // 호우
  const snowValue = data.SD_MAX.value === -9 ? 1 : data.SD_MAX.value;   // 폭설
  const tempValue = data.TA_AVG.value;   // 한파
  const dustValue = 27;                    // 황사
  const fireValue = 1;                    // 산불
  const landslideValue = 7;               // 산사태

  // ===== 색상 함수 =====
  const getColorByValue = (value, maxValue) => {
  const ratio = value / maxValue;

  if (ratio <= 0.25) return "#10C525";   // 초록
  if (ratio <= 0.5) return "#F3FB00";    // 노랑
  if (ratio <= 0.75) return "#FF941A";   // 주황
  return "#FF2C30";                      // 빨강
};

  // ===== 차트 데이터 =====
  const chartConfigs = [
  { label: "강풍", value: windValue, unit: "m/s", maxValue: 30, ticks: { count: 4 } },
  { label: "호우", value: rainValue, unit: "mm", maxValue: 50, ticks: { count: 5 } },
  { label: "폭설", value: snowValue, unit: "cm", maxValue: 50, ticks: { count: 5 } },
  {label: "한파", value: tempValue, unit: "℃", minValue: -20, maxValue: 0, ticks: { count: 5 }  },
  { label: "황사", value: dustValue, unit: "㎍/㎥", maxValue: 100, ticks: { stepSize: 25 } },
  { label: "산불", value: fireValue, unit: "횟수", maxValue: 30, ticks: { stepSize: 10 } },
  { label: "산사태", value: landslideValue, unit: "횟수", maxValue: 20, ticks: { stepSize: 5 } },
];

  
  return (
    <div className="flex flex-col items-center gap-6">

      {chartConfigs.map((cfg) => {
        const options = { // 이거 왜 밖으로 뻇냐면 안에서 cfg가 안 돼서 여기로 뺌
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.raw} ${cfg.unit}`,
              },
            },
            // 전체 캔버스 배경색
            beforeDraw: (chart) => {
              const ctx = chart.ctx;
              ctx.save();
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            },
          },

          scales: {
            x: {
              min: cfg.minValue ?? 0,
              max: cfg.maxValue,
              ticks: Array.isArray(cfg.ticks)
      ? {
          // ticks가 배열이면 -> includes로 필터링
          callback: (value) => (cfg.ticks.includes(value) ? value : ""),
        }
      : {
          // ticks가 객체이면 -> 그대로 Chart.js 옵션으로 사용
          ...cfg.ticks, 
        },
  },
            y: {
              ticks: { font: { size: 17, weight: "bold" }, color: "black" },
            },
          },
        };

        return (
          <div key={cfg.label} className="w-[600px] h-[80px] flex flex-col">
            <Bar
              data={{
                labels: [cfg.label],
                datasets: [
                  {
                    label: cfg.label,
                    data: [cfg.value],
                     backgroundColor: getColorByValue(cfg.value, cfg.maxValue),
                    borderRadius: 4,
                    barThickness: 25,
                  },
                ],
              }}
              options={options}
              plugins={[plotAreaPlugin]}
            />

            {/* 단위 표시 */}
            <div className="text-xs -mt-10 pl-1 text-gray-600 text-left">{cfg.unit}</div>
          </div>
        );
      })}
      <div className="flex gap-4 mt-4 justify-center">
    {legendColors.map((lg) => (
      <div key={lg.label} className="flex items-center gap-1">
        <div className="w-4 h-4" style={{ backgroundColor: lg.color }}></div>
        <div className="text-xs">{lg.label}</div>
      </div>
    ))}
  </div>
    </div>
  );
}