// PrevDust.jsx

import { useState } from "react"
import PrevDustText1 from "./sub_component/PrevDustText1"
import PrevDustText2 from "./sub_component/PrevDustText2"
import PrevDustText3 from "./sub_component/PrevDustText3"

export default function PrevDust() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">황사</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "황사발생 전 행동요령" },
                        { key: "menu2", label: "황사발생 중 행동요령" },
                        { key: "menu3", label: "황사발생 후 행동요령" },
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
                    {selected === "menu1" && <PrevDustText1 />}
                    {selected === "menu2" && <PrevDustText2 />}
                    {selected === "menu3" && <PrevDustText3 />}
                </div>
            </div>
        </>
    )
}