// Index.jsx

import { useState } from "react";
import MainMap from "../../component/Main/MainMap";
import SideTab from "../../component/Main/SideTab";

export default function Index() {
  // ⭐ 메인 상태 2개
  const [selectedRegion, setSelectedRegion] = useState(null); // 클릭된 지역 이름
  const [sideOpen, setSideOpen] = useState(false); // 사이드탭 열림 여부

  return (
    <div className="w-full h-full relative">
      {/* -------------------------------------
        🟦 메인 지도
        - 지역 클릭 시 selectedRegion 변경
        - 클릭하면 sideOpen(true)
      -------------------------------------- */}
      <MainMap 
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      setSideOpen={setSideOpen}
    />
    <SideTab
        isOpen={sideOpen}
        region={selectedRegion}
        onClose={() => setSideOpen(false)}
        onOpen={() => setSideOpen(true)}
      />
      
    </div>
  );
}