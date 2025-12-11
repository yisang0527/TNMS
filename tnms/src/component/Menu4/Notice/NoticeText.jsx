// component/Notice/NoticeText.jsx

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Bell } from 'lucide-react';

const db = getFirestore();

export default function NoticeText() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const noticeList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotices(noticeList);
            setLoading(false);
        }, (error) => {
            console.error('공지사항 조회 실패:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full">
            <p className="font-bold text-[32px] pb-10">공지사항</p>

            <div className="space-y-4">
                {loading ? (
                    <div className="border w-full p-10 text-center text-gray-500">
                        로딩 중...
                    </div>
                ) : notices.length === 0 ? (
                    <div className="border w-full p-10 text-center text-gray-500">
                        등록된 공지사항이 없습니다.
                    </div>
                ) : (
                    notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`border w-full p-6 rounded-lg hover:shadow-md transition ${notice.important ? 'border-l-4 border-l-red-500 bg-red-50' : 'bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                {notice.important && (
                                    <>
                                        <Bell className="w-5 h-5 text-red-500" />
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            중요
                                        </span>
                                    </>
                                )}
                                <h3 className="text-xl font-bold text-gray-800">
                                    {notice.title}
                                </h3>
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap mb-4">
                                {notice.content}
                            </p>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <span>{notice.author}</span>
                                <span>·</span>
                                <span>
                                    {notice.createdAt?.toDate().toLocaleDateString('ko-KR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}