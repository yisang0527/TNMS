import { useState } from "react";
import PrevWind from "../components/PrevWind";
import PrevDust from "../components/PrevDust";
import PrevRain1 from "../components/PrevRain1";
import PrevMountain from "../components/PrevMountain";
import PrevRain2 from "../components/PrevRain2";
import PrevFire from "../components/PrevFire";
import PrevSnow from "../components/PrevSnow";
import PrevCold from "../components/PrevCold";

export default function Prev() {

    const [selected, setSelected] = useState("wind");

    return (
        <div className="max-w-[1500px] mx-auto">
            <div>
                <p className="font-bold text-5xl pt-13 pb-10">자연재난행동요령</p>

                <div className="flex justify-between">
                    {[
                        { key: "wind", label: "강풍" },
                        { key: "dust", label: "황사" },
                        { key: "rain1", label: "장마" },
                        { key: "mountain", label: "산사태" },
                        { key: "rain2", label: "호우" },
                        { key: "fire", label: "산불" },
                        { key: "snow", label: "폭설" },
                        { key: "cold", label: "한파" }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelected(tab.key)}
                            className={`w-[140px] h-[55px] border transition-all ${selected === tab.key ? "border-[#75C1E6] border-2" : "bg-white"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>
                    {selected === "wind" && <PrevWind />}
                    {selected === "dust" && <PrevDust />}
                    {selected === "rain1" && <PrevRain1 />}
                    {selected === "mountain" && <PrevMountain />}
                    {selected === "rain2" && <PrevRain2 />}
                    {selected === "fire" && <PrevFire />}
                    {selected === "snow" && <PrevSnow />}
                    {selected === "cold" && <PrevCold />}
                </div>
            </div>

        </div>
    )
}