// page/Qna.jsx

import QnaText1 from "../../component/Menu4/Qna/QnaText1"
import QnaText2 from "../../component/Menu4/Qna/QnaText2"

export default function Qna() {
    return (
        <div>
            <div className="max-w-[1250px] bg-[#FFFFFF] border-x border-[#333333] mx-auto p-[100px_50px_250px] ">
                <QnaText1 />

                <p className="w-[100%] h-[1px] bg-[#333333] mt-10 mb-15"></p>

                <QnaText2 />
            </div>
        </div>
    )
}