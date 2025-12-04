import './Prev.css';
import { useState } from "react";

import PrevWind from "../component/PrevComponent/PrevWind";
import PrevDust from "../component/PrevComponent/PrevDust";
import PrevRain1 from "../component/PrevComponent/PrevRain1";
import PrevMountain from "../component/PrevComponent/PrevMountain";
import PrevRain2 from "../component/PrevComponent/PrevRain2";
import PrevFire from "../component/PrevComponent/PrevFire";
import PrevSnow from "../component/PrevComponent/PrevSnow";
import PrevCold from "../component/PrevComponent/PrevCold";

import windImg from "../assets/windLogo.png";
import dustImg from "../assets/dustLogo.png";
import rain1Img from "../assets/rain1Logo.png";
import mountainImg from "../assets/mountainLogo.png";
import rain2Img from "../assets/rain2Logo.png";
import fireImg from "../assets/fireLogo.png";
import snowImg from "../assets/snowLogo.png";
import coldImg from "../assets/coldLogo.png";

export default function Prev() {

    // 버튼과 컴포넌트 내용을 하나의 객체 배열로 합침
    const tabs = [
        { key: "wind", label: "강풍", img: windImg, component: <PrevWind /> },
        { key: "dust", label: "황사", img: dustImg, component: <PrevDust /> },
        { key: "rain1", label: "장마", img: rain1Img, component: <PrevRain1 /> },
        { key: "mountain", label: "산사태", img: mountainImg, component: <PrevMountain /> },
        { key: "rain2", label: "호우", img: rain2Img, component: <PrevRain2 /> },
        { key: "fire", label: "산불", img: fireImg, component: <PrevFire /> },
        { key: "snow", label: "폭설", img: snowImg, component: <PrevSnow /> },
        { key: "cold", label: "한파", img: coldImg, component: <PrevCold /> },
    ];

    const [selected, setSelected] = useState(tabs[0].key);

    return (
        <div className="max-w-[1440px] mx-auto">
            <p className="font-bold text-[32px] pt-13 pb-10">자연재난행동요령</p>

            {/* 버튼 영역 */}
            <div className="flex justify-between">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setSelected(tab.key)}
                        className={`w-[140px] h-[55px] border transition-all relative shadow-[8px_5px_5px_0px_rgba(0,0,0,0.2)] cursor-pointer font-bold text-[20px]
                            ${selected === tab.key ? "border-[#75C1E6] border-2 bg-white" : "bg-white"}`}
                    >
                        <img src={tab.img} alt={tab.label} className="w-13 h-13 absolute top-0 right-7 " />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 선택된 탭에 맞는 컴포넌트 표시 */}
            <div className="mt-8">
                {tabs.find(tab => tab.key === selected)?.component}
            </div>
        </div>
    );
}