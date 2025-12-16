import { useState } from "react";
import Count from "../../component/Issues/Count"; // Bar 그래프
import Scale from "../../component/Issues/Scale"; // 다른 그래프
import IssueMap from "../../component/Issues/IssueMap";
import IssueMarkers from "../../component/Issues/IssueMarkers";

export default function Issues() {
  const [selectedTab, setSelectedTab] = useState("bar");
  const [selectedTab2, setSelectedTab2] = useState("civil-defense");
  const [mapInstance, setMapInstance] = useState(null);

  const outdoorPositions = [
    { title: "가좌여자중학교 운동장", latlng: { lat: 37.50855136, lng: 126.6792995 } },
  { title: "영산포초등학교 운동장", latlng: { lat: 34.99351694, lng: 126.7146381 } },
  { title: "청라1호근린공원", latlng: { lat: 37.53170691, lng: 126.6033821 } },
  { title: "공촌공원", latlng: { lat: 37.55110102, lng: 126.684326 } },
  { title: "곤양중학교 운동장", latlng: { lat: 35.05958132, lng: 127.973164 } },
  { title: "초정공원", latlng: { lat: 37.54084886, lng: 126.7414985 } },
  { title: "구례동중학교 운동장", latlng: { lat: 35.19247823, lng: 127.545776 } },
  { title: "계산공업고등학교 운동장", latlng: { lat: 37.53445433, lng: 126.739424 } },
  { title: "계산여자고등학교 운동장", latlng: { lat: 37.53879761, lng: 126.7423346 } },
  { title: "성지초등학교 운동장", latlng: { lat: 37.52618255, lng: 126.7199647 } },
  { title: "작전고등학교 운동장", latlng: { lat: 37.53271039, lng: 126.7300349 } },
  { title: "고리울초등학교", latlng: { lat: 37.52695792, lng: 126.826703 } },
  { title: "도당초등학교", latlng: { lat: 37.51929545, lng: 126.7916867 } },
  { title: "동곡초등학교", latlng: { lat: 37.49036373, lng: 126.8171301 } },
  { title: "동산초등학교", latlng: { lat: 37.53117872, lng: 126.7850714 } },
  { title: "개도중학교 운동장", latlng: { lat: 34.57144578, lng: 127.6594913 } },
  { title: "대현초등학교 운동장", latlng: { lat: 35.72906897, lng: 129.058042 } },
  { title: "무을초등학교 운동장", latlng: { lat: 36.26397863, lng: 128.197388 } },
  { title: "선주고등학교 운동장", latlng: { lat: 36.14159982, lng: 128.3120274 } },
  { title: "형곡고등학교 운동장", latlng: { lat: 36.10203337, lng: 128.3384316 } },
  { title: "도개초등학교 운동장", latlng: { lat: 36.30058173, lng: 128.3311269 } },
  { title: "덕적초중고등학교 운동장", latlng: { lat: 37.22548883, lng: 126.1475307 } },
  { title: "영흥초운동장", latlng: { lat: 37.25422447, lng: 126.4676498 } },
  { title: "대신어린이공원", latlng: { lat: 35.86148174, lng: 129.2220692 } },
  { title: "가은초등학교 운동장", latlng: { lat: 36.64315777, lng: 128.0628689 } },
  { title: "영강체육공원", latlng: { lat: 36.6024, lng: 128.2121 } },
  { title: "성주중앙초등학교 운동장", latlng: { lat: 35.91649814, lng: 128.2870784 } },
  { title: "왜가리생태관", latlng: { lat: 36.48451733, lng: 128.5279425 } },
  { title: "함평골프고등학교", latlng: { lat: 35.02666646, lng: 126.535688 } },
  { title: "미암초등학교 운동장", latlng: { lat: 34.69994116, lng: 126.5740123 } },
  { title: "비산초등학교 운동장", latlng: { lat: 36.11877894, lng: 128.3747675 } },
  { title: "성서공업지역 주변 완충녹지", latlng: { lat: 35.84914201, lng: 128.5080322 } },
  { title: "배실웨딩공원", latlng: { lat: 35.86223624, lng: 128.5051783 } },
  { title: "배꽃공원", latlng: { lat: 35.85969043, lng: 128.5018889 } },
  { title: "와룡(위)공원", latlng: { lat: 35.85811953, lng: 128.5006369 } },
  { title: "와룡(아랫)공원", latlng: { lat: 35.85631134, lng: 128.5005997 } },
  { title: "샛별어린이공원", latlng: { lat: 35.85755299, lng: 128.5043325 } },
  { title: "햇님어린이공원", latlng: { lat: 35.85687295, lng: 128.5047188 } },
  { title: "사령봉어린이공원", latlng: { lat: 35.85267842, lng: 128.5031456 } },
  { title: "늘푸른공원", latlng: { lat: 35.85996377, lng: 128.5046054 } },
  { title: "계골산공원", latlng: { lat: 35.86083298, lng: 128.4992775 } },
  { title: "돌산공원", latlng: { lat: 35.85722443, lng: 128.493602 } },
  { title: "신당어린이공원", latlng: { lat: 35.85824179, lng: 128.4990522 } },
  { title: "오정공원", latlng: { lat: 35.8562925, lng: 128.4963937 } },
  { title: "점터공원", latlng: { lat: 35.85467008, lng: 128.4938943 } },
  { title: "갈뫼공원", latlng: { lat: 35.85218037, lng: 128.4941788 } },
  { title: "앞돌어린이공원", latlng: { lat: 35.85326788, lng: 128.4970888 } },
  { title: "청록어린이공원", latlng: { lat: 35.85394181, lng: 128.497113 } },
  { title: "은하수공원", latlng: { lat: 35.85118031, lng: 128.4870788 } },
  { title: "미리내공원", latlng: { lat: 35.8516352, lng: 128.4836054 } },
  { title: "강창근린공원", latlng: { lat: 35.85237436, lng: 128.479228 } },
  { title: "호림공원", latlng: { lat: 35.84271248, lng: 128.4889108 } }
  ];

  const civilDefensePositions = [
    { title: "민방위청사 1", latlng: { lat: 36.34, lng: 127.37 } },
    { title: "민방위청사 2", latlng: { lat: 36.33, lng: 127.36 } },
  ];

  const positions =
    selectedTab2 === "outdoor" ? outdoorPositions : civilDefensePositions;

  return (
    <div className="max-w-[1250px] mx-auto mt-20 mb-20 py-[100px] px-[50px] pb-[150px] bg-white border border-gray-100 rounded-2xl shadow-xl">
      <h3 className="text-[32px] font-bold text-[#333333] mb-[70px]">재난 이슈</h3>

      {/* 그래프 섹션 */}
      <h4 className="text-[24px] font-bold text-[#333333] mb-[10px]">지역별 그래프</h4>
      <p className="text-[18px] text-[#333333] mb-[40px]">
        현재 이슈되는 재난은 <span className="font-bold">지진</span>입니다
      </p>

      <div className="mb-5">
        <button
          className={`inline-block text-[18px] font-bold w-[100px] h-[50px] border mr-4 ${
            selectedTab === "bar" ? "bg-[#333] text-white" : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab("bar")}
        >
          횟수
        </button>
        <button
          className={`inline-block text-[18px] font-bold w-[100px] h-[50px] border ${
            selectedTab === "scale" ? "bg-[#333] text-white" : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab("scale")}
        >
          규모
        </button>
      </div>

      {selectedTab === "bar" && <Count />}
      {selectedTab === "scale" && <Scale />}
      <p className="mt-[20px]">
        <span className="font-bold">Tip</span> 그래프 위에 마우스를 올리면 정확한 값을 확인할 수 있습니다.
      </p>

      {/* 대피소 지도 섹션 */}
      <h4 className="text-[24px] font-bold text-[#333333] mb-[10px]">대피시설 분포</h4>
      <div className="mb-5">
        <button
          className={`inline-block text-[18px] font-bold w-[120px] h-[50px] border mr-4 ${
            selectedTab2 === "outdoor"
              ? "bg-[#333] text-white"
              : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab2("outdoor")}
        >
          옥외 대피소
        </button>
        <button
          className={`inline-block text-[18px] font-bold w-[120px] h-[50px] border ${
            selectedTab2 === "civil-defense"
              ? "bg-[#333] text-white"
              : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab2("civil-defense")}
        >
          민방위 대피소
        </button>
      </div>

      <IssueMap onMapReady={setMapInstance} />
      {mapInstance && <IssueMarkers map={mapInstance} positions={positions} type={selectedTab2} />}
    </div>
  );
}