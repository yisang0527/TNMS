// PrevWind.jsx

import { useState } from "react"
import PrevWindText1 from "./sub_component/PrevWindText1"
import PrevWindText2 from "./sub_component/PrevWindText2"
import PrevWindText3 from "./sub_component/PrevWindText3"

export default function PrevWind() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">강풍</p>

                <div className="m-auto bg-[#cccccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "평상시 강풍대비" },
                        { key: "menu2", label: "강풍 발생 시 행동요령" },
                        { key: "menu3", label: "강풍 관련 정보" }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelected(tab.key)}
                            className={`w-[500px] h-[35px] transition-all border border-[#132a35] cursor-pointer ${selected === tab.key ? "bg-[#132a35] text-[#ffffff] font-bold" : "bg-white"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>
                    {selected === "menu1" && <PrevWindText1 />}
                    {selected === "menu2" && <PrevWindText2 />}
                    {selected === "menu3" && <PrevWindText3 />}
                </div>
            </div>
        </>
    )
}