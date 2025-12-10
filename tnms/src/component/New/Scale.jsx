import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const rawData = [
  { date: "2004-05-29", value: 5.2 },
  { date: "2016-09-12", value: 5.8 },
  { date: "2017-11-15", value: 5.4 },
  { date: "2022-10-29", value: 4.1 },
  { date: "2025-02-07", value: 4.8 },
  { date: "2021-09-18", value: 3.9 },
  { date: "2022-04-27", value: 5.6 },
  { date: "2023-12-01", value: 2.9 },
  { date: "2024-06-15", value: 6.0 }
];

// 날짜 → 숫자(timestamp) 변환
const data = rawData.map(item => ({
  x: new Date(item.date).getTime(),
  y: item.value,
  date: item.date
}));

export default function ExampleScatter() {
  return (
    <div className="w-[1000px] h-[500px] mx-auto border border-[#DFDFDF] 
    px-[20px] py-[30px] flex justify-center items-center">
      <ScatterChart
        width={900}
        height={450}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />

        {/* X축: 날짜 기반 → 연도만 표시 */}
        <XAxis 
          dataKey="x"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(t) => new Date(t).getFullYear()}
        />

        {/* Y축: 눈금 2~6, 점 위치는 소수점 가능 */}
        <YAxis 
          dataKey="y" 
          name="규모"
          domain={[2, 6]}
          ticks={[2.0, 3.0, 4.0, 5.0, 6.0]}
          tickFormatter={(tick) => tick.toFixed(1)} // 소수점 1자리 표시
        />

        {/* Tooltip: 날짜 전체 표시 */}
        <Tooltip 
          labelFormatter={(t) => new Date(t).toLocaleDateString()} 
        />

        <Legend />

        {/* 점 크기 동적 적용 */}
        <Scatter 
          name="산점도 데이터" 
          data={data} 
          fill="#8884d8"
          shape={(props) => {
            const { cx, cy, payload } = props;
            const radius = 5 + (payload.y - 2) * 2.5; // y값 따라 크기 조절
            return <circle cx={cx} cy={cy} r={radius} fill="#8884d8" />;
          }}
        />
      </ScatterChart>
    </div>
  );
}