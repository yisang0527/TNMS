// page/Qna.jsx

import QnaText1 from "../../component/Q&a/Qna/QnaText1"
import QnaText2 from "../../component/Q&a/Qna/QnaText2"

export default function Qna() {
    return (
        <div>
            <div className="w-[90%] max-w-[1250px] mx-auto mt-20 mb-20 py-[100px] px-[50px] pb-[150px] bg-white border border-gray-100 rounded-2xl shadow-xl">
                <QnaText1 />

                <p className="w-full h-px bg-[#333333] mt-10 mb-15"></p>

                <QnaText2 />
            </div>
        </div>
    )
}