// Prev.jsx
import { useState } from "react";

import PrevWind from "../../../component/Prevs/Prev/PrevWind";
import PrevDust from "../../../component/Prevs/Prev/PrevDust";
import PrevRain1 from "../../../component/Prevs/Prev/PrevRain1";
import PrevMountain from "../../../component/Prevs/Prev/PrevMountain";
import PrevRain2 from "../../../component/Prevs/Prev/PrevRain2";
import PrevFire from "../../../component/Prevs/Prev/PrevFire";
import PrevSnow from "../../../component/Prevs/Prev/PrevSnow";
import PrevCold from "../../../component/Prevs/Prev/PrevCold";

import windImg from "../../../../public/windLogo.png";
import dustImg from "../../../../public/dustLogo.png";
import rain1Img from "../../../../public/rain1Logo.png";
import mountainImg from "../../../../public/mountainLogo.png";
import rain2Img from "../../../../public/rain2Logo.png";
import fireImg from "../../../../public/fireLogo.png";
import snowImg from "../../../../public/snowLogo.png";
import coldImg from "../../../../public/coldLogo.png";

import pickWindImg from "../../../../public/pickWindLogo.png";
import pickDustImg from "../../../../public/pickDustLogo.png";
import pickRain1Img from "../../../../public/pickRain1Logo.png";
import pickMountainImg from "../../../../public/pickMountainLogo.png";
import pickRain2Img from "../../../../public/pickRain2Logo.png";
import pickFireImg from "../../../../public/pickFireLogo.png";
import pickSnowImg from "../../../../public/pickSnowLogo.png";
import pickColdImg from "../../../../public/pickColdLogo.png";

export default function Prev() {

    const tabs = [
        { key: "wind", label: "강풍", img: windImg, pickImg: pickWindImg, component: <PrevWind /> },
        { key: "dust", label: "황사", img: dustImg, pickImg: pickDustImg, component: <PrevDust /> },
        { key: "rain1", label: "장마", img: rain1Img, pickImg: pickRain1Img, component: <PrevRain1 /> },
        { key: "mountain", label: "산사태", img: mountainImg, pickImg: pickMountainImg, component: <PrevMountain /> },
        { key: "rain2", label: "호우", img: rain2Img, pickImg: pickRain2Img, component: <PrevRain2 /> },
        { key: "fire", label: "산불", img: fireImg, pickImg: pickFireImg, component: <PrevFire /> },
        { key: "snow", label: "폭설", img: snowImg, pickImg: pickSnowImg, component: <PrevSnow /> },
        { key: "cold", label: "한파", img: coldImg, pickImg: pickColdImg, component: <PrevCold /> },
    ];


    const [selected, setSelected] = useState(tabs[0].key);

    return (
        <div>
            <div className="w-[90%] max-w-[1250px] mx-auto mt-20 mb-20 py-[100px] px-[50px] pb-[150px] bg-white border border-gray-100 rounded-2xl shadow-xl">
                <p className="font-bold text-[32px] pb-10">자연재난행동요령</p>

                {/* 버튼 영역 */}
                <div className="flex justify-between">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setSelected(tab.key)}
                            className={`w-[125px] h-[55px] border-2 bg-white shadow-[3px_3px_8px_0px_rgba(0,0,0,0.2)]
                flex flex-col items-center justify-center relative cursor-pointer font-bold text-[20px] rounded-md
                ${selected === tab.key ? "border-[#75C1E6] border-2 text-[22px]" : "border-gray-300"}`}
                        >

                            {/* 이미지 → 선택된 경우 pick 이미지로 교체 */}
                            <img
                                src={selected === tab.key ? tab.pickImg : tab.img}
                                alt={tab.label}
                                className="w-[50px] h-[50px] opacity-50 absolute left-0 z-0"
                            />

                            {/* 텍스트 */}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>



                {/* 선택된 탭 내용 */}
                <div className="mt-8">
                    {tabs.find(tab => tab.key === selected)?.component}
                </div>

            </div>
        </div>
    );
}