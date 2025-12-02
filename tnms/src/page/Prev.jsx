import { useState } from "react";
import Prev_wind from "../component/Prev_wind";

export default function prev() {

    const [selected, setSelected] = useState("wind");

    return (
        <div className="max-w-[1500px] mx-auto border">
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
                            className={`w-[140px] h-[55px] border transition-all ${selected === tab.key ? "border-[#75C1E6] border-3" : "bg-white"}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>
                    {selected === "wind" && <Prev_wind />}
                </div>
            </div>

        </div>
    )
}