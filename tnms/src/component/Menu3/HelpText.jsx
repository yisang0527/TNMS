
export default function HelpText(){
    return(

        <div className="w-[1500px]] mx-auto h-[1500px] bg-cover bg-center" style={{ backgroundImage: "url('/background1.png')" }}> 
        <h2 className="text-[48px] font-bold mb-[-10px] pl-[200px] pt-[80px]">
          센터소개
        </h2><br/>
        <div className="w-[1500px] h-[200px] border-t-3 border-black mx-auto 
        grid place-items-center text-[24px] text-[#333333]"
        style={{ backgroundColor: "#F5FCFE" }}>
            크고 작은 재난을 경험하여 발생한 심리적 충격을 완화하고 재난을 경험하기 전 일상으로<br/>
            빠르게 복귀하실 수 있도록 여러 가지 재난심리회복지원 활동을 진행하고 있습니다.
        </div>
        <div className="pt-20 ml-50">
            <h4 className="text-[28px] text-[#333333] font-bold pb-5">재난심리회복지원센터는 어떤 일을 하나요?</h4>
            <div>
            <p className="flex items-center mb-2 text-[24px]">
            <span
                className="w-5 h-5 rounded-full mr-2"
                style={{ backgroundColor: "#259EDA" }}
            ></span>
            갑작스러운 재난으로 불안과 충격을 겪은 분들에게 신속한 심리적 도움을 제공해 마음의 안정을 돕습니다.
            </p>
            <p className="flex items-center mb-2 text-[24px]">
            <span
                className="w-5 h-5 rounded-full mr-2"
                style={{ backgroundColor: "#259EDA" }}
            ></span>
            개인·집단 상담과 심리검사를 통해 감정을 다루고 일상을 되찾을 수 있도록 체계적으로 지원합니다.
            </p>
            <p className="flex items-center mb-2 text-[24px]">
            <span
                className="w-5 h-5 rounded-full mr-2"
                style={{ backgroundColor: "#259EDA" }}
            ></span>
            더 깊은 치료가 필요한 경우 정신건강복지센터 등 전문기관과 연결해 지속적인 도움을 받을 수 있도록 안내합니다.
            </p>
            <p className="flex items-center mb-2 text-[24px]">
            <span
                className="w-5 h-5 rounded-full mr-2"
                style={{ backgroundColor: "#259EDA" }}
            ></span>
            교육과 프로그램을 통해 지역사회가 함께 회복하고 심리적 회복력을 높일 수 있도록 돕습니다.
            </p>
            </div>
        </div>
        <div>
            <table className="mx-auto w-full max-w-[1500px]">
                <thead>
                    <tr className="border-t-2 border-black border-b-2 border-black">
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
                    <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>서울특별시 양천구 중앙로 345<br/>
                        대한적십자사 서울특별시지사 재난 안전센터</td>
                    </tr>
                    <tr style={{ borderBottom: "2px solid #A7A7A7" }}>
                    <td className="px-4 py-3 text-center align-middle">부산</td>
                    <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>부산광역시 재난심리회복지원센터</td>
                    <td className="px-4 py-3 text-center align-middle">051-801-4070</td>
                    <td className="px-4 py-3 text-center align-middle" style={{ backgroundColor: "#C4E4F5" }}>부산광역시 부산진구 동성로 144 <br/>
                        대한적십자사 부산광역시지사 구호복지팀</td>
                    </tr>
                </tbody>
                </table>
        </div>
        </div>
    )
}