// SideTab.jsx

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
export default function SideTab({ isOpen, region, onClose, onOpen }) {
  return (
    <>
      {/* 열기 버튼 */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed right-0 top-[calc(100px+490px)] transform -translate-y-1/2 p-2 bg-gray-200 rounded shadow z-1100"
        >
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-black"></div>
        </button>
      )}

      {/* 사이드탭 */}
      <div
        className={`fixed right-0 top-[100px] bg-[#D4EBF7] border-l border-gray-300 shadow-lg transition-all duration-300 overflow-hidden z-1000 shadow-[-3px_3px_5px]
          ${isOpen ? "w-[720px] p-5" : "w-0 p-0"}`}
        style={{ height: "calc(100vh - 100px)" }} // 화면 높이에 맞춤
      >
        {isOpen && (
          <>
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute left-[-30px] top-5 p-2 bg-gray-200 rounded shadow z-1100"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-black"></div>{/* 여기 수정해야 돼 */}
            </button>

            {/* 선택 지역 이름 */}
            <h2 className="text-2xl font-bold mb-5">{region}</h2>

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