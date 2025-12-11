import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const db = getFirestore();

export default function AdminPopup() {
    const [popups, setPopups] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        linkUrl: '',
        isActive: true,
        showOnce: false
    });

    // 팝업 실시간 조회
    useEffect(() => {
        const q = query(collection(db, 'popups'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const popupList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPopups(popupList);
        });
        return () => unsubscribe();
    }, []);

    // 팝업 추가/수정
    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        try {
            if (editingId) {
                await updateDoc(doc(db, 'popups', editingId), {
                    ...formData,
                    updatedAt: serverTimestamp()
                });
                alert('팝업이 수정되었습니다.');
            } else {
                await addDoc(collection(db, 'popups'), {
                    ...formData,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                alert('팝업이 등록되었습니다.');
            }
            
            handleCancel();
        } catch (error) {
            console.error('Error:', error);
            alert('작업에 실패했습니다.');
        }
    };

    // 팝업 삭제
    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'popups', id));
                alert('팝업이 삭제되었습니다.');
            } catch (error) {
                console.error('Error:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    // 활성화 토글
    const toggleActive = async (id, currentStatus) => {
        try {
            await updateDoc(doc(db, 'popups', id), {
                isActive: !currentStatus,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error:', error);
            alert('상태 변경에 실패했습니다.');
        }
    };

    // 수정 모드
    const startEdit = (popup) => {
        setFormData({
            title: popup.title,
            content: popup.content || '',
            linkUrl: popup.linkUrl || '',
            isActive: popup.isActive,
            showOnce: popup.showOnce || false
        });
        setEditingId(popup.id);
        setShowForm(true);
    };

    // 폼 초기화
    const handleCancel = () => {
        setFormData({
            title: '',
            content: '',
            linkUrl: '',
            isActive: true,
            showOnce: false
        });
        setShowForm(false);
        setEditingId(null);
    };

    return (
        <div className="w-full">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-10">
                <p className="font-bold text-[32px]">팝업 관리</p>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        <span className="text-xl">+</span>
                        팝업 추가
                    </button>
                )}
            </div>

            {/* 작성/수정 폼 */}
            {showForm && (
                <div className="border rounded-lg p-6 mb-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">
                            {editingId ? '팝업 수정' : '팝업 추가'}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* 활성화 체크박스 */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-green-600">팝업 활성화</span>
                        </label>

                        {/* 하루동안 보지않기 옵션 */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.showOnce}
                                onChange={(e) => setFormData({...formData, showOnce: e.target.checked})}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-600">"오늘 하루 보지 않기" 옵션 제공</span>
                        </label>

                        {/* 제목 */}
                        <div>
                            <label className="block text-sm font-medium mb-2">제목 *</label>
                            <input
                                type="text"
                                placeholder="팝업 제목"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 내용 */}
                        <div>
                            <label className="block text-sm font-medium mb-2">내용</label>
                            <textarea
                                placeholder="팝업 내용"
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                rows="5"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>



                        {/* 링크 URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">링크 URL (선택)</label>
                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={formData.linkUrl}
                                onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">팝업 클릭 시 이동할 URL</p>
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                {editingId ? '수정 완료' : '등록하기'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 팝업 목록 */}
            <div className="space-y-4">
                {popups.length === 0 ? (
                    <div className="border w-full p-10 text-center text-gray-500 rounded-lg">
                        등록된 팝업이 없습니다.
                    </div>
                ) : (
                    popups.map((popup) => (
                        <div
                            key={popup.id}
                            className={`border rounded-lg p-6 ${
                                popup.isActive ? 'bg-white' : 'bg-gray-100 opacity-60'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                                            popup.isActive 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-400 text-white'
                                        }`}>
                                            {popup.isActive ? '활성' : '비활성'}
                                        </span>
                                        {popup.showOnce && (
                                            <span className="text-xs px-2 py-1 rounded font-medium bg-blue-100 text-blue-700">
                                                하루보기
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {popup.title}
                                    </h3>
                                    {popup.content && (
                                        <p className="text-gray-600 mb-2 whitespace-pre-wrap">
                                            {popup.content}
                                        </p>
                                    )}
                                    {popup.linkUrl && (
                                        <p className="text-sm text-gray-500">
                                            🔗 링크: {popup.linkUrl}
                                        </p>
                                    )}
                                </div>

                                {/* 관리 버튼 */}
                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        onClick={() => toggleActive(popup.id, popup.isActive)}
                                        className={`px-3 py-2 rounded transition font-medium text-sm ${
                                            popup.isActive
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                    >
                                        {popup.isActive ? '비활성화' : '활성화'}
                                    </button>
                                    <button
                                        onClick={() => startEdit(popup)}
                                        className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition font-medium text-sm"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(popup.id)}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded transition font-medium text-sm"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}