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
  { date: "2016-09-12", value: 5.8, name: "경북 경주", region: "경상" },
  { date: "2017-11-15", value: 5.4, name: "경북 포항", region: "경상" },
  { date: "2014-04-01", value: 5.1, name: "울산 동구 주변 해역", region: "경상" },
  { date: "2014-04-01", value: 7.0, name: "충남 태안 인근 해역", region: "충청" },
  { date: "2004-05-29", value: 5.2, name: "경북 울진 인근 해역", region: "경상" },
  { date: "2003-03-30", value: 5.0, name: "인천 옹진군 주변 해역", region: "수도권" },
  { date: "1980-09-27", value: 5.3, name: "영일/포항 인근", region: "경상" },
  { date: "1978-10-07", value: 5.0, name: "충남 홍성군 동쪽 해역", region: "충청" },
  { date: "1978-09-16", value: 5.2, name: "경북 상주 인근", region: "경상" },
  { date: "1681-06", value: 7.5, name: "강원 양양 해역", region: "강원" },
  { date: "1643", value: 7.4, name: "울산 해역", region: "경상" },
  { date: "1518", value: 6.7, name: "한반도 중북부", region: "한반도 중북부" },
  { date: "779", value: 7.0, name: "경주 인근", region: "경상" },
];

const regionOrder = ["수도권", "강원", "충청", "전라", "경상", "한반도 중북부"];

const data = rawData.map(item => {
  const regionIndex = regionOrder.indexOf(item.region);
  return {
    // x축을 숫자로 하고 jitter 적용
    x: regionIndex + Math.random() * 0.6 - 0.4,
    y: item.value,
    date: item.date,
    name: item.name,
    region: item.region, // tooltip에서 사용
  };
});

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
    <div className="w-[1150px] h-[700px] mx-auto border border-[#DFDFDF] 
    px-5 py-[30px] flex justify-center items-center">
      <ScatterChart
        width={1200}
        height={650}
        margin={{ top: 50, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} horizontal={true} />

        {/* X축 */}
        {/* XAxis는 category로 설정 */}
        <XAxis
          type="number"
          dataKey="x"
          ticks={[0, 1, 2, 3, 4, 5]}
          tickFormatter={(tick) => regionOrder[tick]}
          interval={0}
          tick={{ angle: -30, textAnchor: "end", dy: 10 }}
          domain={[-0.5, 5.5]}
        />

        {/* Y축 */}
        <YAxis
          dataKey="y"
          name="규모"
          domain={[4, 8]}
          ticks={[4.0, 5.0, 6.0, 7.0, 8.0]}
          tickFormatter={(tick) => tick.toFixed(1)}
        />

        {/* ✨ Tooltip 변경: 날짜 / 지진명 / 규모 */}
        <Tooltip content={<CustomTooltip />} />

        <Legend />

        {/* 점 크기 동적 */}
        <Scatter
          name="국내 이슈된 지진"
          data={data}
          shape={(props) => {
            const { cx, cy, payload } = props;

            // 1️⃣ 점 크기
            const { y } = payload;
            let radius = 10; // 기본 5 (5.0~6.0)

            if (y >= 6.0 && y < 7.0) radius = 20; // 6~7은 조금 크게
            else if (y >= 7.0) radius = 30;      // 7~8은 더 크게

            // 2️⃣ 점 색상 구간별로 다르게
            let fillColor = "#12A2F0"; // 기본
            if (payload.y >= 5.0 && payload.y < 6.0) fillColor = "#75D0F0"; // 5~6
            else if (payload.y >= 6.0 && payload.y < 7.0) fillColor = "#3EA8E0"; // 6~7
            else if (payload.y >= 7.0 && payload.y <= 8.0) fillColor = "#1A78C2"; // 7~8

            //점 지역별로 다르게
            // const regionColors = {
            //   "수도권": "#FF6B6B",
            //   "강원": "#FFD93D",
            //   "충청": "#6BCB77",
            //   "전라": "#4D96FF",
            //   "경상": "#AA4A44",
            //   "한반도 중북부": "#843B62"
            // };

            // let fillColor = regionColors[payload.region] || "#12A2F0";

            return <circle cx={cx} cy={cy} r={radius} fill={fillColor} />;
          }}
        />
      </ScatterChart>
    </div>
  );
}