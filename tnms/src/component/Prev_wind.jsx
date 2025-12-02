import { useState } from "react"
import Prev_wind_text1 from "./Prev_wind_text1"

export default function Prev_wind() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-5xl pt-15 pb-5">강풍</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-5 mb-5">
                    <p className="w-[30px] h-[30px] border-4 border-[#132a35] mr-2"></p>
                    <p className="font-bold text-3xl text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "평소 대비" },
                        { key: "menu2", label: "지진 발생 시" },
                        { key: "menu3", label: "지진 대피 후" }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelected(tab.key)}
                            className={`w-[500px] h-[35px] transition-all border-1 border-[#132a35] ${selected === tab.key ? "bg-[#132a35] text-[#ffffff] font-bold" : "bg-white"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>
                    {selected === "menu1" && <Prev_wind_text1 />}
                </div>
            </div>
        </>
    )
}