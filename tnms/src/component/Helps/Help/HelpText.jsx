// HelpText.jsx

export default function HelpText() {
    return (

        <div className="w-[90%] max-w-[1250px] mx-auto mt-20 mb-20 p-[100px_50px_150px] pb-75 bg-[#FFFFFF] border border-gray-100 rounded-2xl shadow-xl">
            <h2 className="text-[32px] font-bold">
                센터소개
            </h2>

            <div className="w-full h-[200px] mt-10 border-t-3 border-black mx-auto grid place-items-center text-[18px] text-[#333333]"
                style={{ backgroundColor: "#F5FCFE" }}>
                크고 작은 재난을 경험하여 발생한 심리적 충격을 완화하고 재난을 경험하기 전 일상으로<br />
                빠르게 복귀하실 수 있도록 여러 가지 재난심리회복지원 활동을 진행하고 있습니다.
            </div>

            <div className="pt-20 mb-20">
                <h4 className="text-[24px] text-[#333333] font-bold pb-8">재난심리회복지원센터는 어떤 일을 하나요?</h4>
                <div>
                    <p className="flex items-center mb-4 text-[18px]">
                        <span
                            className="w-5 h-5 rounded-full mr-5"
                            style={{ backgroundColor: "#259EDA" }}
                        ></span>
                        갑작스러운 재난으로 불안과 충격을 겪은 분들에게 신속한 심리적 도움을 제공해 마음의 안정을 돕습니다.
                    </p>
                    <p className="flex items-center mb-4 text-[18px]">
                        <span
                            className="w-5 h-5 rounded-full mr-5"
                            style={{ backgroundColor: "#259EDA" }}
                        ></span>
                        개인·집단 상담과 심리검사를 통해 감정을 다루고 일상을 되찾을 수 있도록 체계적으로 지원합니다.
                    </p>
                    <p className="flex items-center mb-4 text-[18px]">
                        <span
                            className="w-5 h-5 rounded-full mr-5"
                            style={{ backgroundColor: "#259EDA" }}
                        ></span>
                        더 깊은 치료가 필요한 경우 정신건강복지센터 등 전문기관과 연결해 지속적인 도움을 받을 수 있도록 안내합니다.
                    </p>
                    <p className="flex items-center mb-4 text-[18px]">
                        <span
                            className="w-5 h-5 rounded-full mr-5"
                            style={{ backgroundColor: "#259EDA" }}
                        ></span>
                        교육과 프로그램을 통해 지역사회가 함께 회복하고 심리적 회복력을 높일 수 있도록 돕습니다.
                    </p>
                </div>
            </div>
            <div>
                <table className="mx-auto w-full max-w-[1500px]">
                    <thead>
                        <tr className="border-t-2 border-b-2 h-[70px] text-[18px]">
                            <th className="px-4 py-3 text-center align-middle">지역</th>
                            <th className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>명칭</th>
                            <th className="px-4 py-3 text-center align-middle">전화번호</th>
                            <th className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">서울</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>서울특별시 재난 심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">02-2181-3107</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>서울특별시 양천구 중앙로 345<br />
                                대한적십자사 서울특별시지사 재난 안전센터</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">부산</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>부산광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">051-801-4070</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>부산광역시 부산진구 동성로 144 <br />
                                대한적십자사 부산광역시지사 구호복지팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">대구</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>대구광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">053-550-7117</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>대구광역시 중구 태평로 7 <br />
                                대한적십자사 대구광역시지사 구호복지팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">인천</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>인천광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">032-810-1341</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>인천광역시 연수구 연수동 함박뫼로 220  <br />
                                대한적십자사 인천광역시지사 구호복지팀 </td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">광주</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>광주광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">062-570-7725</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>광주광역시 북구 매곡로 117 <br />
                                대한적십자사 광주·전남지사 구호복지팀 </td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">대전</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>대전광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">042-220-0141</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>대전광역시 중구 선화서로 19 <br />
                                대한적십자사 대전·세종지사 재난안전센터</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">울산</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>울산광역시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">052-210-9521</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>울산광역시 중구 성안8길 71 <br />
                                대한적십자사 울산광역시지사 구호봉사팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }} className="h-[75px]">
                            <td className="px-4 py-3 text-center align-middle" >세종</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>세종특별자치시 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">044-862-0141</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>세종특별자치시 한솔동로 26</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }} className="h-[60px]">
                            <td className="px-4 py-3 text-center align-middle">경기</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경기도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">031-230-1624</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경기도 수원시 권선구 권광로 129 <br />
                                대한적십자사 경기도지사 구호복지팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">강원</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>강원특별자치도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">033-253-1295</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>강원특별자치도 춘천시 중앙로 17 <br />
                                대한적십자사 강원특별자치도지사 구호복지팀 </td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">충청북도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>충청북도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">043-230-8643</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>충청북도 청주시 흥덕구 가로수로 1000 <br />
                                대한적십자사 충청북도지사 구호복지팀 </td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }} >
                            <td className="px-4 py-3 text-center align-middle">충청남도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>충청남도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">041-640-4845</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>충청남도 홍성군 홍북면 충남대로 118  <br />
                                대한적십자사 충청남도지사 구호복지팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">전북</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>전북특별자치도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">063-280-5838</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>전북특별자치도 전주시 덕진구 혁신로 463 <br />
                                대한적십자사 전북특별자치도지사 구호복지팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }} className="h-[75px]">
                            <td className="px-4 py-3 text-center align-middle">전라남도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>전라남도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">061-272-2807</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>전라남도 목포시 양을로 220번길 7-3</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">경상북도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경상북도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">054-830-0746</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경상북도 안동시 풍천면 도청대로 489 <br />
                                대한적십자사 경상북도지사 구호봉사팀</td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">경상남도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경상남도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">055-278-2725</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>경상남도 창원시 의창구 용지로 226 <br />
                                대한적십자사 경상남도지사 구호복지팀 </td>
                        </tr>
                        <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                            <td className="px-4 py-3 text-center align-middle">제주도</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>제주도 재난심리회복지원센터</td>
                            <td className="px-4 py-3 text-center align-middle">064-758-3506</td>
                            <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>제주특별자치도 제주시 전농로 7 <br />
                                대한적십자사 제주특별자치도지사 재난안전팀 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}