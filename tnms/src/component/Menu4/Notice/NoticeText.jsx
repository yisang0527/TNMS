// NoticeText.jsx

export default function NoticeText() {
    return (
        <>
            <p className="font-bold text-[32px] pb-10">공지사항</p>

            <div className="border w-[100%] h-[300px]">
                <p className="p-10">
                    ===============================================<br />
                    이곳에 관리자 페이지와 연동하여 자주 묻는 질문들을 올릴 예정입니다.<br />
                    담당자는 텍스트 지우기, Tailwind css 수정 후 작업해주시길 바랍니다.<br />
                    ===============================================
                </p>
            </div>
        </>
    )
}