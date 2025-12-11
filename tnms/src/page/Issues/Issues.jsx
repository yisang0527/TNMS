import { useState } from "react";
import Count from "../../component/Issues/Count"; // Bar 그래프(기본)
import Scale from "../../component/Issues/Scale"; // 다른 그래프

export default function Issues() {
    const [selectedTab, setSelectedTab] = useState("bar"); 
    // 기본: bar 그래프

    return (
        <div className="w-[1250px] h-[1500px] mx-auto">
            <h3 className="text-[32px] font-bold text-[#333333] mb-[70px] mt-[100px]">재난 이슈</h3>
            <h4 className="text-[24px] font-bold text-[#333333] mb-[10px]">지역별 그래프</h4>
            <p className="text-[18px] font-bold text-[#333333] mb-[40px]">최근 이슈인 재난에 대한 지역별 상세 그래프</p>

            <div className="mb-5">

                {/* 막대그래프 버튼 */}
                <button
                    className={
                        "inline-block text-[18px] font-bold w-[100px] h-[50px] border mr-4 " +
                        (selectedTab === "bar"
                            ? "bg-[#333] text-white"
                            : "text-[#333] border-[#333]")
                    }
                    onClick={() => setSelectedTab("bar")}
                >
                    횟수
                </button>

                {/* 다른 그래프 버튼 */}
                <button
                    className={
                        "inline-block text-[18px] font-bold w-[100px] h-[50px] border " +
                        (selectedTab === "scale"
                            ? "bg-[#333] text-white"
                            : "text-[#333] border-[#333]")
                    }
                    onClick={() => setSelectedTab("scale")}
                >
                    규모
                </button>
            </div>
            
            {/* 그래프 변경 */}
            {selectedTab === "bar" && <Count />}
            {selectedTab === "scale" && <Scale />}

            <p className="mt-[20px]"><span className="font-bold">Tip</span> 그래프 위에 마우스를 올리면 정확한 값을 확인할 수 있습니다.</p>
        </div>
    );
}