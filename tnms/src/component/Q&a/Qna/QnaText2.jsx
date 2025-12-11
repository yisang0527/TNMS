// component/Admin/Menu4/Qna/QnaText2.jsx

import { useState } from 'react'
import { db } from '../../../firebase/config'
import { addDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore'
import sha256 from 'crypto-js/sha256'

export default function QnaText2() {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    
    // 내 문의 확인
    const [showMyInquiry, setShowMyInquiry] = useState(false)
    const [loginId, setLoginId] = useState("")
    const [loginPw, setLoginPw] = useState("")
    const [myInquiries, setMyInquiries] = useState([])
    const [loginError, setLoginError] = useState("")

    const handleSubmit = async () => {
        if (!id || !pw || !title || !content) {
            alert("모든 항목을 입력해주세요.")
            return
        }

        await addDoc(collection(db, "qna"), {
            tempId: id,
            tempPassword: sha256(pw).toString(),
            title,
            content,
            answered: false,
            answer: "",
            createdAt: Timestamp.now()
        })

        alert("문의가 전송되었습니다!")
        setId("")
        setPw("")
        setTitle("")
        setContent("")
    }

    // 내 문의 확인
    const handleCheckMyInquiry = async () => {
        if (!loginId || !loginPw) {
            setLoginError("아이디와 비밀번호를 입력해주세요.")
            return
        }

        try {
            const hashedPw = sha256(loginPw).toString()
            const q = query(
                collection(db, "qna"),
                where("tempId", "==", loginId),
                where("tempPassword", "==", hashedPw)
            )
            const querySnapshot = await getDocs(q)
            
            if (querySnapshot.empty) {
                setLoginError("일치하는 문의가 없습니다.")
                setMyInquiries([])
                return
            }

            const inquiries = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            
            setMyInquiries(inquiries)
            setLoginError("")
        } catch (error) {
            console.error("문의 확인 실패:", error)
            setLoginError("문의 확인에 실패했습니다.")
        }
    }

    return (
        <div>
            {!showMyInquiry ? (
                <>
                    <div className="mb-5">
                        <p className="font-bold text-[32px] pt-13 pb-3">문의사항</p>
                        <p className="text-[20px] text-[#666666]">문의사항을 남겨주시면 관리자가 답변해드립니다!</p>
                    </div>

                    <div>
                        <textarea 
                            placeholder="아이디를 입력하시오."
                            className="border w-[300px] h-[66px] p-5 mr-2 resize-none"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                        <textarea 
                            placeholder="비밀번호를 입력하시오."
                            className="border w-[300px] h-[66px] p-5 resize-none"
                            value={pw}
                            onChange={e => setPw(e.target.value)}
                        />

                        <button 
                            onClick={handleSubmit}
                            className="font-bold text-[21px] text-white w-[125px] h-[66px] bg-[#0A2F43] float-right hover:bg-[#0d3a52] transition-colors cursor-pointer"
                        >
                            전송
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="border w-full h-[50px] p-5 mt-5"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="이곳에 문의사항을 남겨주세요."
                        className="border w-full h-[300px] p-5 resize-none mt-5"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />

                    <button
                        onClick={() => setShowMyInquiry(true)}
                        className="font-bold text-[18px] text-[#0A2F43] border-2 border-[#0A2F43] w-[200px] h-[50px] mt-5 hover:bg-[#0A2F43] hover:text-white transition-colors cursor-pointer"
                    >
                        내 문의 확인하기
                    </button>
                </>
            ) : (
                <div>
                    <div className="mb-5">
                        <p className="font-bold text-[32px] pt-13 pb-3">내 문의 확인</p>
                        <p className="text-[20px] text-[#666666]">작성하신 문의 내역을 확인하세요</p>
                    </div>

                    {myInquiries.length === 0 ? (
                        <>
                            <div>
                                <textarea 
                                    placeholder="아이디를 입력하시오."
                                    className="border w-[300px] h-[66px] p-5 mr-2 resize-none"
                                    value={loginId}
                                    onChange={e => {
                                        setLoginId(e.target.value)
                                        setLoginError("")
                                    }}
                                />
                                <textarea 
                                    placeholder="비밀번호를 입력하시오."
                                    className="border w-[300px] h-[66px] p-5 resize-none"
                                    value={loginPw}
                                    onChange={e => {
                                        setLoginPw(e.target.value)
                                        setLoginError("")
                                    }}
                                />

                                <button 
                                    onClick={handleCheckMyInquiry}
                                    className="font-bold text-[21px] text-white w-[125px] h-[66px] bg-[#0A2F43] float-right hover:bg-[#0d3a52] transition-colors"
                                >
                                    확인
                                </button>
                            </div>

                            {loginError && (
                                <p className="text-red-600 mt-3">{loginError}</p>
                            )}

                            <button
                                onClick={() => setShowMyInquiry(false)}
                                className="font-bold text-[18px] text-[#0A2F43] border-2 border-[#0A2F43] w-[200px] h-[50px] mt-5 hover:bg-[#0A2F43] hover:text-white transition-colors"
                            >
                                문의 작성하기
                            </button>
                        </>
                    ) : (
                        <div>
                            <div className="space-y-4 mb-5">
                                {myInquiries.map((inquiry) => (
                                    <div key={inquiry.id} className="border p-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-bold text-[20px]">{inquiry.title}</h4>
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                inquiry.answered 
                                                    ? "bg-green-100 text-green-700" 
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {inquiry.answered ? "답변완료" : "답변대기"}
                                            </span>
                                        </div>
                                        
                                        <p className="text-sm text-gray-500 mb-3">
                                            작성일: {inquiry.createdAt?.toDate().toLocaleDateString()}
                                        </p>
                                        
                                        <div className="bg-gray-50 p-4 mb-3">
                                            <p className="text-sm text-gray-600 font-medium mb-1">문의 내용:</p>
                                            <p className="text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>
                                        </div>
                                        
                                        {inquiry.answered && inquiry.answer && (
                                            <div className="bg-blue-50 p-4">
                                                <p className="text-sm text-blue-900 font-medium mb-1">답변:</p>
                                                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setMyInquiries([])
                                    setLoginId("")
                                    setLoginPw("")
                                    setShowMyInquiry(false)
                                }}
                                className="font-bold text-[18px] text-[#0A2F43] border-2 border-[#0A2F43] w-[200px] h-[50px] hover:bg-[#0A2F43] hover:text-white transition-colors"
                            >
                                문의 작성하기
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}