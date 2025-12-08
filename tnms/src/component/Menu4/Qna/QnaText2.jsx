import { useState } from 'react'
import { db } from '../../../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import sha256 from 'crypto-js/sha256'

export default function QnaText2() {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async () => {
        if (!id || !pw || !content) {
            alert("모든 항목을 입력해주세요.")
            return
        }

        await addDoc(collection(db, "inquiries"), {
            userId: id,
            password: sha256(pw).toString(),  
            content,
            isAnswered: false,
            answer: "",
            createdAt: serverTimestamp()
        })

        alert("문의가 전송되었습니다!")
        setId("")
        setPw("")
        setContent("")
    }

    return (
        <div>
            <div className="mb-5">
                <p className="font-bold text-[32px] pt-13 pb-3">문의사항</p>
                <p className="text-[20px] text-[#666666]">문의사항을 남겨주시면 관리자가 답변해드립니다!</p>
            </div>

            <div>
                <textarea placeholder="아이디를 입력하시오."
                    className="border w-[300px] h-[66px] p-5 mr-2 resize-none"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <textarea placeholder="비밀번호를 입력하시오."
                    className="border w-[300px] h-[66px] p-5 resize-none"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                />

                <button onClick={handleSubmit}
                    className="font-bold text-[21px] text-white w-[125px] h-[66px] bg-[#0A2F43] float-right">
                    전송
                </button>
            </div>

            <textarea placeholder="이곳에 문의사항을 남겨주세요."
                className="border w-full h-[300px] p-5 resize-none mt-5"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
        </div>
    )
}
