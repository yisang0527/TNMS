// PrevMountain.jsx

import { useState } from "react"
import PrevMountainText1 from "./sub_component/PrevMountainText1"
import PrevMountainText2 from "./sub_component/PrevMountainText2"
import PrevMountainText3 from "./sub_component/PrevMountainText3"
import PrevMountainText4 from "./sub_component/PrevMountainText4"

export default function PrevMountain() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">산사태</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "산사태 평소 대비" },
                        { key: "menu2", label: "산사태 발생 우려 시" },
                        { key: "menu3", label: "산사태 발생 시" },
                        { key: "menu4", label: "산사태 발생 후" },
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
                    {selected === "menu1" && <PrevMountainText1 />}
                    {selected === "menu2" && <PrevMountainText2 />}
                    {selected === "menu3" && <PrevMountainText3 />}
                    {selected === "menu4" && <PrevMountainText4 />}
                </div>
            </div>
        </>
    )
}