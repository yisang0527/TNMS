// component/Admin/Menu4/Qna/QnaText1.jsx

import { useEffect, useState } from 'react'
import { db } from '../../../firebase/config'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export default function QnaText1() {
    const [faqList, setFaqList] = useState([])
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const q = query(collection(db, "faqs"), orderBy("order", "asc"))
                const querySnapshot = await getDocs(q)
                setFaqList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                console.error("FAQ 불러오기 실패:", error)
            }
        }
        fetchFaq()
    }, [])

    const toggleFaq = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <>
            <p className="font-bold text-[32px] pb-10">Q&A</p>

            <div className="border w-full p-5">
                {faqList.length === 0 ? (
                    <p>FAQ가 등록되지 않았습니다.</p>
                ) : faqList.map((item) => (
                    <div key={item.id} className="mb-4 border-b pb-4 last:border-b-0">
                        <button
                            onClick={() => toggleFaq(item.id)}
                            className="w-full text-left flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                            <p className="font-bold">Q. {item.question}</p>
                            <span className="text-2xl text-gray-400 ml-4 flex-shrink-0">
                                {expandedId === item.id ? "−" : "+"}
                            </span>
                        </button>
                        {expandedId === item.id && (
                            <div className="mt-2 pl-2">
                                <p className="text-gray-700 whitespace-pre-wrap">A. {item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='flex'>
                <button 
                    onClick={() => window.open("http://www.epeople.go.kr")}
                    className="font-bold text-[18px] text-white w-[200px] h-[85px] bg-[#4DB1E5] mt-10 cursor-pointer hover:bg-[#3da0d4] transition-colors"
                >
                    국민신문고 바로가기
                </button>
                <p className='mt-11 ml-15'>
                    국민재난안전포털 'QNA'가 행정기관 민원서비스를 통합에 따라<br />
                    국민권익위원회에서 운영하는 <b>국민신문고()</b>를 통하여 관리되고 있습니다.<br />
                    국민신문고 시스템 이용문의 전화 : <b>1600-8172</b>
                </p>
            </div>
        </>
    )
}