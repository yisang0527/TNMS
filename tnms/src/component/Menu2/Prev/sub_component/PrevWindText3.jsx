// PrevWindText3.jsx

export default function PrevWindText3() {
    return (
        <>
            <div>
                <div className="flex mt-25 mb-2">
                    <p className="w-[20px] h-[4px] bg-amber-800"></p>
                    <p className="w-[20px] h-[4px] bg-blue-400"></p>
                </div>

                <p className="text-[20px] mb-10 font-bold">핵심 행동요령</p>

                <div className="w-[100%] h-[150px] border-[#cccccc] border-10 bg-[#ffffff]">
                    <p className="text-center pt-13 text-[18px]">강풍에 대한 특보 기준을 미리 알아두고 강풍특보나 응급상황 시 즉시 대처할 수 있도록 합니다.</p>
                </div>
            </div>

            <div>
                <div className="flex mt-25 mb-2">
                    <p className="w-[20px] h-[4px] bg-amber-800"></p>
                    <p className="w-[20px] h-[4px] bg-blue-400"></p>
                </div>

                <p className="text-[20px] mb-10 font-bold">강풍이란</p>

                <ul className="text-[18px] font-normal text-[#333333] ml-1.5">
                    <li>- 바람이 일정속도 이상으로 발생하여 인명 및 재산 피해를 유발하는 재해를 말하며, 육상에서 풍속 14m/s이상(50.4km/h) 또는 순간풍속 20m/s(72km/h)이상이 예상될 때 주의보를,<br />육상에서 풍속 21m/s(75.6km/h)이상 또는 순간 풍속 26m/s(93.6km/h)이상이 예상될 때 경보를 발령합니다.</li>
                </ul>
            </div>

            <div>
                <div className="flex mt-25 mb-2">
                    <p className="w-[20px] h-[4px] bg-amber-800"></p>
                    <p className="w-[20px] h-[4px] bg-blue-400"></p>
                </div>

                <p className="text-[20px] mb-10 font-bold">강풍특보</p>

                <div className="w-[100%] border border-l-0 border-r-0 flex justify-around relative bg-[#ffffff]">
                    <div className="text-center">
                        <p className="pt-5 pb-5 text-[17px]">종류</p>
                        <p className="pt-5 pb-5 text-[16px]">강풍</p>
                    </div>

                    <div className="text-center">
                        <p className="pt-5 pb-5 text-[17px]">주의보</p>
                        <p className="pt-5 pb-5 text-[16px]">	육상에서 풍속 14m/s(50.4km/h)이상<br />또는 순간풍속 20m/s(72km/h) 이상,<br />다만 산지는 풍속 17m/s(61.2km/h)이상<br />또는 순간풍속 25m/s(90km/h)이상이 예상될 때</p>
                    </div>

                    <div className="text-center">
                        <p className="pt-5 pb-5 text-[17px]">경보</p>
                        <p className="pt-5 pb-5 text-[16px]">육상에서 풍속 21m/s(75.6km/h) 이상<br />또는 순간풍속 26m/s(93.6km/h) 이상,<br />다만 산지는 풍속 24m/s(86.4km/h)이상<br />또는 순간풍속 30m/s(108km/h)이상이 예상될 때</p>
                    </div>

                    <p className="absolute w-[100%] h-[1px] bg-[#cccccc] top-[60px]"></p>
                </div>
            </div>

            <div>
                <div className="flex items-center pt-25 mb-10">
                    <p className="w-[20px] h-[20px] border-4 border-[#132a35] mr-2 bg-[#ffffff]"></p>
                    <p className="font-bold text-[20px] text-[#132a35]">주요기관 연락처</p>
                </div>

                <div className="w-[100%] h-[250px] flex justify-between bg-[#ffffff]">
                    <div className="w-[385px] border border-[#cccccc]">
                        <p className="text-center w-[383px] h-[75px] bg-[#eee] pt-6 text-[16px]">1. 위기상황, 긴급상황 시 신고전화</p>

                        <ul className="p-5 text-[16px]">
                            <li>- 재난신고 119, 범죄신고 112, 민원 상담 110</li>
                            <li>- 행정안전부 중앙재난안전상황실 044)205-1542~3</li>
                        </ul>
                    </div>

                    <div className="w-[385px] border border-[#cccccc] border-l-0 border-r-0">
                        <p className="text-center w-[383px] h-[75px] bg-[#eee] pt-7 text-[15px]">2. 행정안전부 국민행동요령, 임시피난시설 등 안내</p>

                        <ul className="p-5 text-[16px]">
                            <li>- 행정안전부 홈페이지 http://www.mois.go.kr</li>
                            <li>- 행정안전부 국민재난안전포털 http://www.safekorea.go.kr</li>
                            <li>- 스마트폰 어플리케이션 '안전디딤돌'</li>
                        </ul>
                    </div>

                    <div className="w-[385px] border border-[#cccccc]">
                        <p className="text-center w-[383px] h-[75px] bg-[#eee] pt-6 text-[16px]">3. 유관기관 연락처 및 홈페이지</p>

                        <ul className="p-5 text-[16px]">
                            <li>- 기상청 02)2181-0503, http://www.kma.go.kr</li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="w-[100%] h-[1px] bg-[#ccc] mt-15 mb-15"></p>
            <p className="font-bold text-[18px] mb-30">소관부서 : 자연재난대응과 (044-205-5232)</p>
        </>
    )
}