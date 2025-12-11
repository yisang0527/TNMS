// PrevCold.jsx

import { useState } from "react"
import PrevColdText1 from "./sub_component/PrevColdText1"
import PrevColdText2 from "./sub_component/PrevColdText2"
import PrevColdText3 from "./sub_component/PrevColdText3"

export default function PrevCold() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">한파</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "평상시 행동요령" },
                        { key: "menu2", label: "한파 발생 시 행동요령" },
                        { key: "menu3", label: "한파 관련 정보" }
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
                    {selected === "menu1" && <PrevColdText1 />}
                    {selected === "menu2" && <PrevColdText2 />}
                    {selected === "menu3" && <PrevColdText3 />}
                </div>
            </div>
        </>
    )
}