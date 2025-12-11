import SeoulChart from "./Chart/SeoulChart";
import GyeonggiChart from "./Chart/GyeonggiChart";
import GangwonChart from "./Chart/GangwonChart";
import ChungnamChart from "./Chart/ChungnamChart";
import ChungbukChart from "./Chart/ChungbukChart";
import GyeongnamChart from "./Chart/GyeongnamChart"; 
import GyeongbukChart from "./Chart/GyeongbukChart";
import JeonnamChart from "./Chart/JeonnamChart";
import JeonbukChart from "./Chart/JeonbukChart";
import JejuChart from "./Chart/JejuChart";


export default function SideTab({ isOpen, region, onClose, onOpen, mapObj, setSelectedRegion}) {

  const fillSeoul = () => {
    if (window.polygonsRef) {
      window.polygonsRef.current.forEach(({ polygon, name }) => {
        if (name === "서울") {
          polygon.setOptions({ fillOpacity: 0.9 });
          window.selectedPolygonRef.current = polygon;
        } else {
          polygon.setOptions({ fillOpacity: 0.2 });
        }
      });
    }
  };

  const resetPolygons = () => {
    if (window.polygonsRef) {
      window.polygonsRef.current.forEach(({ polygon }) => {
        polygon.setOptions({ fillOpacity: 0.2 });
      });
      if (window.selectedPolygonRef) window.selectedPolygonRef.current = null;
    }
  };
  return (
    <>
      {/* 열기 버튼 */}
      {!isOpen && (
       <button
        onClick={() => {
          onOpen();                 // 사이드탭 열기
          setSelectedRegion("서울"); // 선택 지역 이름

          if (window.polygonsRef) {
            window.polygonsRef.current.forEach(({ polygon, name }) => {
              polygon.setOptions({ fillOpacity: name === "서울" ? 0.9 : 0.2 });
            });
            window.selectedPolygonRef.current = window.polygonsRef.current.find(p => p.name === "서울")?.polygon;
          }

          if (mapObj && window.kakao) {
            const kakao = window.kakao;
            const seoulCenter = new kakao.maps.LatLng(37.62808571674803, 127.25024225297835);
            mapObj.setCenter(seoulCenter);
            mapObj.setLevel(9);
            }
          }}
  className="fixed right-0 top-[calc(100px+430px)] w-[30px] h-[100px] transform -translate-y-1/2 p-2 bg-[#D4EBF7] rounded shadow z-1600"
>
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-black"></div>
        </button>
      )}
      {/* 닫기 버튼 */}
      <button
        onClick={() => {
          onClose();
          setSelectedRegion(null); // 기본 지역 해제
          resetPolygons();         // 모든 폴리곤 색 초기화

          // 지도 초기 위치로 이동
          if (mapObj && window.kakao) {
            const kakao = window.kakao;
            const initialCenter = new kakao.maps.LatLng(36.3504, 127.3845);
            mapObj.setCenter(initialCenter);
            mapObj.setLevel(13);
          }
        }}
        className={`
        fixed w-[30px] h-[100px]
        top-[calc(100px+430px)] 
        p-2 bg-[#D4EBF7] rounded  z-[1500]
        transform -translate-y-1/2
        transition-transform duration-300
        ${isOpen 
          ? "right-0 translate-x-[-720px]"   // 열릴 때 → 오른쪽 0에서 시작해서 +720px 이동
          : "right-0 translate-x-0"}        // 닫혔을 때 → 오른쪽 0 위치
      `}
      >
        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-black"></div>
      </button>

      {/* 사이드탭 */}
      <div
        className={`fixed right-0 top-[100px] bg-[#D4EBF7]  transition-all duration-300 overflow-hidden z-1700
          ${isOpen ? "w-[720px] p-5" : "w-0 p-0"}`}
        style={{ height: "calc(100vh - 100px)" }} // 화면 높이에 맞춤
      >
        {isOpen && (
          <>
            
            

            {/* 선택 지역 이름 */}
            <h2 className="text-4xl font-bold mb-5 text-[#333333]">{region}</h2>

            {/* 선택 지역별 내용 */}
            {region === "서울" && <SeoulChart />}
            {region === "경기도" && <GyeonggiChart />}
            {region === "강원도" && <GangwonChart />}
            {region === "충청남도" && <ChungnamChart />}
            {region === "충청북도" && <ChungbukChart />}
            {region === "경상남도" && <GyeongnamChart />}
            {region === "경상북도" && <GyeongbukChart />}
            {region === "전라남도" && <JeonnamChart />}
            {region === "전라북도" && <JeonbukChart />}
            {region === "제주도" && <JejuChart />}
          </>
        )}
      </div>
    </>
  );
}