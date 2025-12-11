import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AdminQnA() {
   const [activeTab, setActiveTab] = useState("faq");

   // FAQ 관리
   const [faqs, setFaqs] = useState([]);
   const [editingFaq, setEditingFaq] = useState(null);
   const [newFaq, setNewFaq] = useState({ question: "", answer: "", order: 0 });
   const [showFaqForm, setShowFaqForm] = useState(false);

   // QnA 관리
   const [qnaList, setQnaList] = useState([]);
   const [selectedQna, setSelectedQna] = useState(null);
   const [answerText, setAnswerText] = useState("");

   useEffect(() => {
      fetchFAQs();
      fetchQnAs();
   }, []);

   // FAQ 불러오기
   const fetchFAQs = async () => {
      try {
         const q = query(collection(db, "faqs"), orderBy("order", "asc"));
         const querySnapshot = await getDocs(q);
         const faqData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
         }));
         setFaqs(faqData);
      } catch (error) {
         console.error("FAQ 불러오기 실패:", error);
      }
   };

   // QnA 불러오기
   const fetchQnAs = async () => {
      try {
         const q = query(collection(db, "qna"), orderBy("createdAt", "desc"));
         const querySnapshot = await getDocs(q);
         const qnaData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
         }));
         setQnaList(qnaData);
      } catch (error) {
         console.error("QnA 불러오기 실패:", error);
      }
   };

   // FAQ 추가
   const handleAddFaq = async () => {
      if (!newFaq.question || !newFaq.answer) {
         alert("질문과 답변을 입력해주세요.");
         return;
      }

      try {
         await addDoc(collection(db, "faqs"), {
            ...newFaq,
            createdAt: Timestamp.now()
         });
         alert("FAQ가 추가되었습니다!");
         setNewFaq({ question: "", answer: "", order: 0 });
         setShowFaqForm(false);
         fetchFAQs();
      } catch (error) {
         console.error("FAQ 추가 실패:", error);
         alert("FAQ 추가에 실패했습니다.");
      }
   };

   // FAQ 수정
   const handleUpdateFaq = async (id) => {
      try {
         await updateDoc(doc(db, "faqs", id), editingFaq);
         alert("FAQ가 수정되었습니다!");
         setEditingFaq(null);
         fetchFAQs();
      } catch (error) {
         console.error("FAQ 수정 실패:", error);
         alert("FAQ 수정에 실패했습니다.");
      }
   };

   // FAQ 삭제
   const handleDeleteFaq = async (id) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
         await deleteDoc(doc(db, "faqs", id));
         alert("FAQ가 삭제되었습니다!");
         fetchFAQs();
      } catch (error) {
         console.error("FAQ 삭제 실패:", error);
         alert("FAQ 삭제에 실패했습니다.");
      }
   };

   // QnA 답변 저장
   const handleAnswerQna = async () => {
      if (!answerText) {
         alert("답변을 입력해주세요.");
         return;
      }

      try {
         await updateDoc(doc(db, "qna", selectedQna.id), {
            answer: answerText,
            answered: true,
            answeredAt: Timestamp.now()
         });
         alert("답변이 등록되었습니다!");
         setAnswerText("");
         setSelectedQna(null);
         fetchQnAs();
      } catch (error) {
         console.error("답변 등록 실패:", error);
         alert("답변 등록에 실패했습니다.");
      }
   };

   // QnA 삭제
   const handleDeleteQna = async (id) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      try {
         await deleteDoc(doc(db, "qna", id));
         alert("문의가 삭제되었습니다!");
         fetchQnAs();
      } catch (error) {
         console.error("문의 삭제 실패:", error);
         alert("문의 삭제에 실패했습니다.");
      }
   };

   return (
      <div className="flex-1 p-8">
         <div className="bg-white rounded-lg shadow p-6">
            {/* 탭 */}
            <div className="flex gap-2 mb-6 border-b">
               <button
                  onClick={() => setActiveTab("faq")}
                  className={`px-6 py-3 font-medium transition-colors ${activeTab === "faq"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                     }`}
               >
                  FAQ 관리
               </button>
               <button
                  onClick={() => setActiveTab("qna")}
                  className={`px-6 py-3 font-medium transition-colors ${activeTab === "qna"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                     }`}
               >
                  1:1 문의 관리
               </button>
            </div>

            {/* FAQ 관리 */}
            {activeTab === "faq" && (
               <div>
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-bold">FAQ 관리</h2>
                     <button
                        onClick={() => setShowFaqForm(!showFaqForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                     >
                        {showFaqForm ? "취소" : "FAQ 추가"}
                     </button>
                  </div>

                  {/* FAQ 추가 폼 */}
                  {showFaqForm && (
                     <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <div className="space-y-4">
                           <div>
                              <label className="block text-sm font-medium mb-2">질문</label>
                              <input
                                 type="text"
                                 value={newFaq.question}
                                 onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                 className="w-full px-4 py-2 border rounded-lg"
                                 placeholder="질문을 입력하세요"
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-medium mb-2">답변</label>
                              <textarea
                                 value={newFaq.answer}
                                 onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                 rows="4"
                                 className="w-full px-4 py-2 border rounded-lg"
                                 placeholder="답변을 입력하세요"
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-medium mb-2">순서</label>
                              <input
                                 type="number"
                                 value={newFaq.order}
                                 onChange={(e) => setNewFaq({ ...newFaq, order: parseInt(e.target.value) })}
                                 className="w-32 px-4 py-2 border rounded-lg"
                              />
                           </div>
                           <button
                              onClick={handleAddFaq}
                              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                           >
                              추가
                           </button>
                        </div>
                     </div>
                  )}

                  {/* FAQ 목록 */}
                  <div className="space-y-4">
                     {faqs.map((faq) => (
                        <div key={faq.id} className="p-4 border rounded-lg">
                           {editingFaq?.id === faq.id ? (
                              <div className="space-y-4">
                                 <input
                                    type="text"
                                    value={editingFaq.question}
                                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                 />
                                 <textarea
                                    value={editingFaq.answer}
                                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg"
                                 />
                                 <input
                                    type="number"
                                    value={editingFaq.order}
                                    onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value) })}
                                    className="w-32 px-4 py-2 border rounded-lg"
                                 />
                                 <div className="flex gap-2">
                                    <button
                                       onClick={() => handleUpdateFaq(faq.id)}
                                       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                       저장
                                    </button>
                                    <button
                                       onClick={() => setEditingFaq(null)}
                                       className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                       취소
                                    </button>
                                 </div>
                              </div>
                           ) : (
                              <div>
                                 <div className="flex justify-between items-start mb-2">
                                    <div>
                                       <p className="font-semibold text-lg mb-2">Q. {faq.question}</p>
                                       <p className="text-gray-700 whitespace-pre-wrap">A. {faq.answer}</p>
                                       <p className="text-sm text-gray-500 mt-2">순서: {faq.order}</p>
                                    </div>
                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => setEditingFaq({ ...faq, id: faq.id })}
                                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                       >
                                          수정
                                       </button>
                                       <button
                                          onClick={() => handleDeleteFaq(faq.id)}
                                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                       >
                                          삭제
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* QnA 관리 */}
            {activeTab === "qna" && (
               <div>
                  <h2 className="text-2xl font-bold mb-6">1:1 문의 관리</h2>
                  <div className="space-y-4">
                     {qnaList.map((qna) => (
                        <div key={qna.id} className="p-4 border rounded-lg">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg">{qna.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm ${qna.answered
                                          ? "bg-green-100 text-green-700"
                                          : "bg-yellow-100 text-yellow-700"
                                       }`}>
                                       {qna.answered ? "답변완료" : "대기중"}
                                    </span>
                                 </div>
                                 <p className="text-sm text-gray-500 mb-2">
                                    작성자: {qna.tempId} | {qna.createdAt?.toDate().toLocaleDateString()}
                                 </p>
                                 <p className="text-gray-700 whitespace-pre-wrap mb-4">{qna.content}</p>

                                 {qna.answered && qna.answer && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                       <p className="font-semibold text-blue-900 mb-2">답변:</p>
                                       <p className="text-gray-700 whitespace-pre-wrap">{qna.answer}</p>
                                    </div>
                                 )}
                              </div>
                              <button
                                 onClick={() => handleDeleteQna(qna.id)}
                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
                              >
                                 삭제
                              </button>
                           </div>

                           {!qna.answered && (
                              <div className="border-t pt-4">
                                 {selectedQna?.id === qna.id ? (
                                    <div className="space-y-3">
                                       <textarea
                                          value={answerText}
                                          onChange={(e) => setAnswerText(e.target.value)}
                                          rows="4"
                                          placeholder="답변을 입력하세요"
                                          className="w-full px-4 py-2 border rounded-lg"
                                       />
                                       <div className="flex gap-2">
                                          <button
                                             onClick={handleAnswerQna}
                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                          >
                                             답변 등록
                                          </button>
                                          <button
                                             onClick={() => {
                                                setSelectedQna(null);
                                                setAnswerText("");
                                             }}
                                             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                          >
                                             취소
                                          </button>
                                       </div>
                                    </div>
                                 ) : (
                                    <button
                                       onClick={() => setSelectedQna(qna)}
                                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                       답변하기
                                    </button>
                                 )}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}