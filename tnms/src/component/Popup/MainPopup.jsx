import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';

const db = getFirestore();

export default function MainPopup() {
    const [popups, setPopups] = useState([]);
    const [closedPopups, setClosedPopups] = useState([]);

    // 활성화된 팝업만 조회
    useEffect(() => {
        const q = query(collection(db, 'popups'), where('isActive', '==', true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const popupList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPopups(popupList);
        });
        return () => unsubscribe();
    }, []);

    // 로컬 스토리지에서 닫힌 팝업 목록 불러오기
    useEffect(() => {
        const closed = JSON.parse(localStorage.getItem('closedPopups') || '{}');
        const today = new Date().toDateString();
        
        // 날짜가 바뀌면 초기화
        if (closed.date !== today) {
            localStorage.setItem('closedPopups', JSON.stringify({ date: today, ids: [] }));
            setClosedPopups([]);
        } else {
            setClosedPopups(closed.ids || []);
        }
    }, []);

    // 팝업 닫기
    const closePopup = (id, dontShowToday = false) => {
        if (dontShowToday) {
            const closed = JSON.parse(localStorage.getItem('closedPopups') || '{}');
            const newClosed = {
                date: new Date().toDateString(),
                ids: [...(closed.ids || []), id]
            };
            localStorage.setItem('closedPopups', JSON.stringify(newClosed));
            setClosedPopups(newClosed.ids);
        } else {
            setClosedPopups(prev => [...prev, id]);
        }
    };

    // 표시할 팝업 필터링
    const visiblePopups = popups.filter(popup => !closedPopups.includes(popup.id));

    if (visiblePopups.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* 팝업들 */}
            <div className="relative flex flex-wrap gap-4 justify-center p-4 max-h-screen overflow-y-auto">
                {visiblePopups.map((popup, index) => (
                    <div
                        key={popup.id}
                        className="bg-white rounded-lg shadow-2xl w-full"
                        style={{
                            minWidth: '600px',
                            minHeight: '300px',
                            animation: 'fadeIn 0.3s ease-in-out',
                            animationDelay: `${index * 0.1}s`,
                            border: '2px solid red'
                        }}
                    >
                        {/* 팝업 내용 */}
                        <div 
                            className={`p-8 min-h-[250px] flex flex-col justify-center ${popup.linkUrl ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                                if (popup.linkUrl) {
                                    window.open(popup.linkUrl, '_blank');
                                }
                            }}
                        >
                            {/* 이미지 */}
                            {popup.imageUrl && (
                                <div className="mb-4">
                                    <img 
                                        src={popup.imageUrl} 
                                        alt={popup.title}
                                        className="w-full h-auto rounded-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            {/* 제목 */}
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                {popup.title}
                            </h2>

                            {/* 내용 */}
                            {popup.content && (
                                <p className="text-lg text-gray-600 whitespace-pre-wrap leading-relaxed">
                                    {popup.content}
                                </p>
                            )}
                        </div>

                        {/* 하단 버튼 영역 */}
                        <div className="border-t p-5 flex justify-between items-center bg-gray-50 rounded-b-lg">
                            {popup.showOnce ? (
                                <button
                                    onClick={() => closePopup(popup.id, true)}
                                    className="text-sm text-gray-600 hover:text-gray-800 underline font-medium"
                                >
                                    오늘 하루 보지 않기
                                </button>
                            ) : (
                                <div></div>
                            )}
                            <button
                                onClick={() => closePopup(popup.id, false)}
                                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition font-medium text-lg"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}