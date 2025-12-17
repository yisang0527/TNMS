// component/Admin/AdminNotice.jsx

import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Check, Bell } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config'

console.log('🔥 AdminNotice mounted');

const db = getFirestore();

export default function AdminNotice() {
    const [notices, setNotices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        important: false,
        author: '관리자' // 필요시 수정
    });

    // 공지사항 실시간 조회
    useEffect(() => {
        let unsubSnapshot = null;

        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setNotices([]);
                if (unsubSnapshot) unsubSnapshot();
                return;
            }

            const q = query(
                collection(db, 'notices'),
                orderBy('createdAt', 'desc')
            );

            unsubSnapshot = onSnapshot(q, (snapshot) => {
                const noticeList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNotices(noticeList);
            });
        });

        return () => {
            unsubAuth();
            if (unsubSnapshot) unsubSnapshot();
        };
    }, []);

    // 공지사항 추가/수정
    const handleSubmit = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        try {
            if (editingId) {
                // 수정
                await updateDoc(doc(db, 'notices', editingId), {
                    title: formData.title,
                    content: formData.content,
                    important: formData.important,
                    updatedAt: serverTimestamp()
                });
                alert('공지사항이 수정되었습니다.');
            } else {
                // 추가
                await addDoc(collection(db, 'notices'), {
                    title: formData.title,
                    content: formData.content,
                    important: formData.important,
                    author: formData.author,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                alert('공지사항이 등록되었습니다.');
            }

            handleCancel();
        } catch (error) {
            console.error('Error:', error);
            alert('작업에 실패했습니다.');
        }
    };

    // 공지사항 삭제
    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'notices', id));
                alert('공지사항이 삭제되었습니다.');
            } catch (error) {
                console.error('Error:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    // 수정 모드
    const startEdit = (notice) => {
        setFormData({
            title: notice.title,
            content: notice.content,
            important: notice.important,
            author: notice.author
        });
        setEditingId(notice.id);
        setShowForm(true);
    };

    // 폼 초기화
    const handleCancel = () => {
        setFormData({
            title: '',
            content: '',
            important: false,
            author: '관리자'
        });
        setShowForm(false);
        setEditingId(null);
    };

    return (
        <div className="w-full">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-10">
                <p className="text-2xl font-bold">공지사항 관리</p>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        공지 작성
                    </button>
                )}
            </div>

            {/* 작성/수정 폼 */}
            {showForm && (
                <div className="border rounded-lg p-6 mb-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">
                            {editingId ? '공지사항 수정' : '공지사항 작성'}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* 중요 공지 체크박스 */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.important}
                                onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-red-600">중요 공지로 설정</span>
                        </label>

                        {/* 제목 입력 */}
                        <div>
                            <label className="block text-sm font-medium mb-2">제목</label>
                            <input
                                type="text"
                                placeholder="공지사항 제목을 입력하세요"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 내용 입력 */}
                        <div>
                            <label className="block text-sm font-medium mb-2">내용</label>
                            <textarea
                                placeholder="공지사항 내용을 입력하세요"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows="8"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                <Check className="w-5 h-5" />
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

            {/* 공지사항 목록 */}
            <div className="space-y-4">
                {notices.length === 0 ? (
                    <div className="border w-full p-10 text-center text-gray-500 rounded-lg">
                        등록된 공지사항이 없습니다.
                    </div>
                ) : (
                    notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`border rounded-lg p-6 ${notice.important ? 'border-l-4 border-l-red-500 bg-red-50' : 'bg-white'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
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
                                    <div className="text-sm text-gray-500">
                                        <span>{notice.author}</span>
                                        <span className="mx-2">·</span>
                                        <span>
                                            {notice.createdAt?.toDate().toLocaleDateString('ko-KR')}
                                        </span>
                                    </div>
                                </div>

                                {/* 관리 버튼 */}
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => startEdit(notice)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                        title="수정"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(notice.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                        title="삭제"
                                    >
                                        <Trash2 className="w-5 h-5" />
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