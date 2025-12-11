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
  { date: "2016-09-12", value: 5.8, name: "경주 지진" },
  { date: "2017-11-15", value: 5.4, name: "포항 지진" },
  { date: "2016-07-05", value: 5.0, name: "울산 동구 해역 지진" },
  { date: "1548", value: 7.0, name: "산둥반도 해역 지진" },
  { date: "1668", value: 8.5, name: "탄청 대지진" },
  { date: "1700", value: 7.0, name: "대마도 지진" },
  { date: "1707", value: 8.9, name: "호에이 대지진" }
];

// 날짜 → timestamp 변환
const data = rawData.map(item => ({
  x: new Date(item.date).getTime(),
  y: item.value,
  date: item.date,
  name: item.name
}));

// ✨ Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    // 1️⃣ 날짜 처리 (YYYY → YYYY년 , YYYY-MM-DD는 그대로)
    let formattedDate = item.date;
    if (/^\d{4}$/.test(item.date)) {
      formattedDate = `${item.date}년`;
    }

    // 2️⃣ 규모 처리 (정수라도 소수점 1자리 강제)
    const formattedScale = item.y.toFixed(1);

    return (
      <div
        style={{
          background: "white",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          lineHeight: "1.4",
        }}
      >
        <div>{formattedDate}</div>
        <div>{item.name}</div>
        <div>{formattedScale}</div>
      </div>
    );
  }
  return null;
};


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

        {/* X축 */}
        <XAxis 
          dataKey="x"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(t) => new Date(t).getFullYear()}
        />

        {/* Y축 */}
        <YAxis 
          dataKey="y" 
          name="규모"
          domain={[4, 9]}
          ticks={[4.0, 5.0, 6.0, 7.0, 8.0, 9.0]}
          tickFormatter={(tick) => tick.toFixed(1)}
        />

        {/* ✨ Tooltip 변경: 날짜 / 지진명 / 규모 */}
        <Tooltip content={<CustomTooltip />} />

        <Legend />

        {/* 점 크기 동적 */}
        <Scatter 
          name="국내 이슈된 지진"
          data={data} 
          fill="#12A2F0"
          shape={(props) => {
            const { cx, cy, payload } = props;
            const radius = 5 + (payload.y - 2) * 2.5;
            return <circle cx={cx} cy={cy} r={radius} fill="#12A2F0" />;
          }}
        />
      </ScatterChart>
    </div>
  );
}
