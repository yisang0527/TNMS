import { useState } from "react"
import Prev_dust_text1 from "./sub_component/Prev_dust_text1"
import Prev_dust_text2 from "./sub_component/Prev_dust_text2"
import Prev_dust_text3 from "./sub_component/Prev_dust_text3"

export default function Prev_dust() {

    const [selected, setSelected] = useState("menu1")

    return (
        <>
            <div>
                <p className="font-bold text-5xl pt-15 pb-11">황사</p>

                <div className="m-auto bg-[#ccc] w-[98%] h-[1px]"></div>

                <div className="flex items-center pt-11 mb-11">
                    <p className="w-[30px] h-[30px] border-4 border-[#132a35] mr-2"></p>
                    <p className="font-bold text-3xl text-[#132a35]">진행별 행동요령</p>
                </div>

                <div className="flex justify-between">
                    {[
                        { key: "menu1", label: "황사발생 전 행동요령" },
                        { key: "menu2", label: "황사발생 중 행동요령" },
                        { key: "menu3", label: "황사발생 후 행동요령" }
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
                    {selected === "menu1" && <Prev_dust_text1 />}
                    {selected === "menu2" && <Prev_dust_text2 />}
                    {selected === "menu3" && <Prev_dust_text3 />}
                </div>
            </div>
        </>
    )
}