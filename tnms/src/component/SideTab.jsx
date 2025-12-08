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
          className="fixed right-0 top-[calc(100px+490px)] transform -translate-y-1/2 p-2 bg-gray-200 rounded shadow z-50"
        >
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-black"></div>
        </button>
      )}

      {/* 사이드탭 */}
      <div
        className={`fixed right-0 bg-white border-l border-gray-300 shadow-lg transition-all duration-300 overflow-hidden
          ${isOpen ? "w-[720px] p-5" : "w-0 p-0"}`}
        style={{ top: "100px", height: "980px" }}
      >
        {isOpen && (
          <>
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute left-[-30px] top-5 p-2 bg-gray-200 rounded shadow"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-black"></div>
            </button>

            {/* 선택 지역 이름 */}
            <h2 className="text-2xl font-bold mb-5">{region}</h2>

            {/* 선택 지역별 내용 */}
            {region === "서울" && <SeoulChart/>}
            {region === "경기" && <GyeonggiChart/>}
            {region === "강원" && <GangwonChart/>}
            {region === "충남" && <ChungnamChart/>}
            {region === "충북" && <ChungbukChart/>}
            {region === "경남" && <GyeongnamChart/>}
            {region === "경북" && <GyeongbukChart/>}
            {region === "전남" && <JeonnamChart/>}
            {region === "전북" && <JeonbukChart/>}
            {region === "제주" && <JejuChart/>}
          </>
        )}
      </div>
    </>
  );
}