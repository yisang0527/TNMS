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
    { title: "공원 대피소", latlng: { lat: 36.35, lng: 127.38 } },
    { title: "학교 대피소", latlng: { lat: 36.36, lng: 127.39 } },
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