import { useEffect, useState } from 'react'
import { db } from '../../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export default function QnaText1() {
    const [faqList, setFaqList] = useState([])

    useEffect(() => {
        const fetchFaq = async () => {
            const querySnapshot = await getDocs(collection(db, "faq"))
            setFaqList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }
        fetchFaq()
    }, [])

    return (
        <>
            <p className="font-bold text-[32px] pb-10">Q&A</p>

            <div className="border w-full p-5">
                {faqList.length === 0 ? (
                    <p>FAQ가 등록되지 않았습니다.</p>
                ) : faqList.map((item) => (
                    <div key={item.id} className="mb-4">
                        <p className="font-bold">Q. {item.question}</p>
                        <p className="text-gray-700">A. {item.answer}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => window.open("http://www.epeople.go.kr")}
                className="font-bold text-[18px] text-white w-[200px] h-[85px] bg-[#4DB1E5] mt-10">
                국민신문고 바로가기
            </button>
        </>
    )
}
