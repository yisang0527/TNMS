// PrevSnow.jsx

import { useState } from "react"
import PrevSnowText1 from "./sub_component/PrevSnowText1"
import PrevSnowText2 from "./sub_component/PrevSnowText2"
import PrevSnowText3 from "./sub_component/PrevSnowText3"
import PrevSnowText4 from "./sub_component/PrevSnowText4"

export default function PrevSnow() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">대설</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "평상시 대설대비" },
                        { key: "menu2", label: "대설 예보 시 행동요령" },
                        { key: "menu3", label: "대설 특보 중 행동요령" },
                        { key: "menu4", label: "대설 후 행동요령" },
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
                    {selected === "menu1" && <PrevSnowText1 />}
                    {selected === "menu2" && <PrevSnowText2 />}
                    {selected === "menu3" && <PrevSnowText3 />}
                    {selected === "menu4" && <PrevSnowText4 />}
                </div>
            </div>
        </>
    )
}