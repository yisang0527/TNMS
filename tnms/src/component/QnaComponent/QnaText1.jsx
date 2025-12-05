// QnaText1.jsx
import { Link } from "react-router-dom"

export default function QnaText1() {

    const url = "http://www.epeople.go.kr"

    return (
        <>
            <p className="font-bold text-[32px] pt-13 pb-10">Q&A</p>

            <div className="border w-[100%] h-[300px]">
                <p className="p-10">
                    ===============================================<br />
                    이곳에 관리자 페이지와 연동하여 자주 묻는 질문들을 올릴 예정입니다.<br />
                    담당자는 텍스트 지우기, Tailwind css 수정 후 작업해주시길 바랍니다.<br />
                    ===============================================
                </p>
            </div>

            <div className="flex items-center mt-10">
                <div className="w-[200px] h-[85px] bg-[#4DB1E5] mr-10 flex justify-center">
                    <button onClick={() => { window.open(url) }} className="font-bold text-[18px] text-[#FFFFFF] leading-[85px] cursor-pointer">국민신문고 바로가기</button>
                </div>

                <div>
                    <p className="text-[#555555]">국민재난안전포털 'Q&A'가 행정기관 민원서비스 통합에 따라</p>
                    <p className="text-[#555555]">국민권익위원회에서 운영하는 <span className="font-bold text-[#333333]">국민신문고(www.epeople.go.kr)</span>를 통하여 관리되고 있습니다.</p>
                    <p className="text-[#555555]">국민신문고 시스템 이용문의 전화 : <span className="font-bold text-[#333333]">1600-8172</span></p>
                </div>
            </div>
        </>
    )
} 