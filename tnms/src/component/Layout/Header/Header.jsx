import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 상단 메뉴 */}
      <div
        className="w-full h-[100px] bg-[#CCCCCC] relative z-50"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="w-[1000px] h-full mx-auto absolute top-0 right-[50%] translate-x-[50%]">
          <img
            src="/logo1.png"
            alt="Logo"
            className="h-[45px] absolute top-[50%] left-[-12%] translate-y-[-50%]"
          />

          <ul className="h-full grid grid-cols-5 items-center font-bold text-[20px]">
            <li className="text-center">재난 이슈</li>
            <li className="text-center">재난 통계</li>
            <li className="text-center">재난예방대비</li>
            <li className="text-center">재난심리상담</li>
            <li className="text-center">참여와 신고</li>
          </ul>
        </div>
      </div>

      {/* 서브 메뉴 */}
      {isOpen && (
        <div
          className="w-full h-[250px] bg-white absolute z-40"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="w-[1000px] h-full mx-auto absolute top-0 right-[50%] translate-x-[50%]">
            <ul className="h-full grid grid-cols-5 pt-10">
              <li>
                <ul>
                  <li className="text-center pb-10">재난 이슈</li>
                </ul>
              </li>

              <li>
                <ul>
                  <li className="text-center pb-10">재난 통계</li>
                </ul>
              </li>

              <li>
                <ul>
                  <li className="text-center pb-10">자연재난행동요령</li>
                  <li className="text-center pb-10">비상연락망</li>
                </ul>
              </li>

              <li>
                <ul>
                  <li className="text-center pb-10">재난심리센터소개</li>
                  <li className="text-center pb-10">재난심리상담</li>
                  <li className="text-center pb-10">재난심리 자가진단</li>
                </ul>
              </li>

              <li>
                <ul>
                  <li className="text-center pb-10">Q&A</li>
                  <li className="text-center pb-10">재난신고하기</li>
                  <li className="text-center pb-10">공지사항</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
