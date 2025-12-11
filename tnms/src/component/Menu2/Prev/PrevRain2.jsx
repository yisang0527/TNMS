// PrevRain2.jsx

import { useState } from "react"
import PrevRain1Text1 from "./sub_component/PrevRain1Text1"
import PrevRain1Text2 from "./sub_component/PrevRain1Text2"
import PrevRain1Text3 from "./sub_component/PrevRain1Text3"
import PrevRain1Text4 from "./sub_component/PrevRain1Text4"

export default function PrevRain1() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-[28px] pt-15 pb-11">호우</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-5">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "사전준비" },
                        { key: "menu2", label: "호우특보 예보시" },
                        { key: "menu3", label: "호우특보 중" },
                        { key: "menu4", label: "호우 이후" },
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
                    {selected === "menu1" && <PrevRain1Text1 />}
                    {selected === "menu2" && <PrevRain1Text2 />}
                    {selected === "menu3" && <PrevRain1Text3 />}
                    {selected === "menu4" && <PrevRain1Text4 />}
                </div>
            </div>
        </>
    )
}