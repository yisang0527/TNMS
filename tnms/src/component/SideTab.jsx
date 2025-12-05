

// SideTab 컴포넌트
// Props:
// open - 사이드탭 열림 여부
// region - 선택된 지역 이름
// onClose - 닫기 버튼 클릭 함수
// onOpen - 열기 버튼 클릭 함수
export default function SideTab({ open, region, onClose, onOpen }) {
  return (
    <>
      {/* -----------------------------------------
          1️⃣ 열기 버튼
          - 사이드탭이 닫혀있을 때만 보여짐
          - 오른쪽 벽에 붙어있음
      ----------------------------------------- */}
      {!open && (
        <button
          onClick={onOpen}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded shadow z-3">
          {/* 오른쪽 화살표 삼각형 */}
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-black"></div>
        </button>
      )}

      {/* -----------------------------------------
          2️⃣ 사이드탭 영역
          - 화면 오른쪽 고정
          - open 상태에 따라 width 변화
          - transition으로 부드럽게 열리고 닫힘
      ----------------------------------------- */}
      <div
        className={`
          fixed top-0 right-0 h-full
          bg-white border-l border-gray-300
          overflow-hidden
          transition-all duration-300
          ${open ? "w-80 p-5" : "w-0 p-0"}
          flex flex-col
        `}
      >
        {open && (
          <>
            {/* -----------------------------------------
                3️⃣ 닫기 버튼
                - 탭이 열렸을 때만 보여짐
                - 탭 왼쪽에 붙어 있음
            ----------------------------------------- */}
            <button
              onClick={onClose}
              className="absolute left-[-30px] top-5 p-2 bg-gray-200 rounded shadow"
            >
              {/* 왼쪽 화살표 삼각형 */}
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-black"></div>
            </button>

            {/* -----------------------------------------
                4️⃣ 선택된 지역 이름
            ----------------------------------------- */}
            <h2 className="text-xl font-bold mb-4">{region}</h2>

            {/* -----------------------------------------
                5️⃣ 선택 지역별 내용 표시
                - 지도 클릭으로 선택된 지역에 따라 내용 변경
                - 별도 버튼으로 선택하지 않음
            ----------------------------------------- */}
            {region === "서울" && <div>서울 데이터</div>}
            {region === "경남" && <div>경남 데이터</div>}
            {region === "경북" && <div>경북 데이터</div>}
            {region === "전남" && <div>전남 데이터</div>}
            {region === "전북" && <div>전북 데이터</div>}
            {region === "제주" && <div>제주 데이터</div>}
            {region === "강원" && <div>강원 데이터</div>}
          </>
        )}
      </div>
    </>
  );
}
