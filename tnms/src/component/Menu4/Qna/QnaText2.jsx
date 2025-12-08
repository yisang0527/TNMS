// QnaText2.jsx

export default function QnaText2() {
    return (
        <div>
            <div className="mb-5">
                <p className="font-bold text-[32px] pt-13 pb-3">문의사항</p>
                <p className="text-[20px] text-[#666666]">문의사항을 남겨주시면 관리자가 답변해드립니다!</p>
            </div>

            <div>
                <textarea placeholder="아이디를 입력하시오." className="border w-[300px] h-[66px] bg-[#FFFFFF] p-5 resize-none mr-2" />
                <textarea placeholder="비밀번호를 입력하시오." className="border w-[300px] h-[66px] bg-[#FFFFFF] p-5 resize-none" />

                <button onClick={() => { }} className="font-bold text-[21px] text-[#FFFFFF] leading-[66px] cursor-pointer w-[125px] h-[66px] bg-[#0A2F43] float-right">전송</button>
            </div>


            <textarea placeholder="이곳에 문의사항을 남겨주세요." className="border w-[100%] h-[300px] bg-[#FFFFFF] p-5 resize-none" />
        </div>
    )
}