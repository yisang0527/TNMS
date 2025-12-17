// Index.jsx
import { useState, useEffect } from "react";
import MainMap from "../../component/Main/MainMap";
import SideTab from "../../component/Main/SideTab";

export default function Index() {
  // ⭐ 메인 상태 2개
  const [selectedRegion, setSelectedRegion] = useState(null); // 클릭된 지역 이름
  const [sideOpen, setSideOpen] = useState(false); // 사이드탭 열림 여부
  const [mapObj, setMapObj] = useState(null); // MainMap에서 전달받은 지도 객체
  


  // 사이드탭이 열릴 때, selectedRegion이 없다면 기본값으로 서울로 설정
  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion("서울"); // 처음에는 서울로 기본 선택
    }
  }, [selectedRegion]);  // selectedRegion이 변경될 때마다 호출

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* -------------------------------------
        🟦 메인 지도
        - 지역 클릭 시 selectedRegion 변경
        - 클릭하면 sideOpen(true)
      -------------------------------------- */}
      <div className="absolute inset-0">
        <MainMap
          setSelectedRegion={setSelectedRegion}
          setSideOpen={setSideOpen}
          setMapObj={setMapObj}
        />
      </div>
      <SideTab
        isOpen={sideOpen}
        region={selectedRegion}
        onClose={() => setSideOpen(false)}
        onOpen={() => setSideOpen(true)}
        mapObj={mapObj}
        setSelectedRegion={setSelectedRegion}
      />
      
    </div>
  );
}