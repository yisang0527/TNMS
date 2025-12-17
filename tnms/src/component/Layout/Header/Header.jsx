import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 상단 메뉴 */}
      <div
        className="w-full h-[100px] bg-white relative z-50 shadow-sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="max-w-[1250px] h-full mx-auto px-6 flex items-center gap-8">
          <Link to="/"><img
            src="/logo1.png"
            alt="Logo"
            className="h-[45px] flex-shrink-0 mr-17.5"
          /></Link>

          <ul className="flex-1 flex justify-between items-center font-bold text-[18px]">
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              재난 이슈
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              재난 통계
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              재난예방대비
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              재난심리상담
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              참여와 신고
            </li>
          </ul>
        </div>
      </div>

      {/* 서브 메뉴 */}
      <div
        className={`w-full bg-white absolute z-40 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
          }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="max-w-[1250px] mx-auto px-6 py-8 flex gap-8">
          {/* 로고 공간 (빈 공간) */}
          <div className="w-[165px] h-[45px] flex-shrink-0"></div>

          {/* 서브메뉴들 */}
          <div className="flex-1 flex justify-between">
            <div>
              <ul className="space-y-4">
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/issues">재난 이슈</Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4 pl-7.5">
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/stats">재난 통계</Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4 pl-7.5">
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/prev">자연재난행동요령</Link>
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/number">비상연락망</Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/help">재난심리센터소개</Link>
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <a href="https://www.redcross.or.kr/recovery/recovery_support.do" target="_blank" >재난심리상담</a>
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/pcm/cyb/SelfDgnssForm.jsp?menuSeq=566" target="_blank" >재난심리 자가진단</a>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/qna">Q&A</Link>
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <a href="https://www.safetyreport.go.kr/#main" target="_blank">재난신고하기</a>
                </li>
                <li className="text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-200">
                  <Link to="/notice">공지사항</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}