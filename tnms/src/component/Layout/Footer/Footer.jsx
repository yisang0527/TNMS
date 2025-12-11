// Footer.jsx
import "../../../css/Layout/Footer.css";
import footerImg from "../../../../public/waLogo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footerLink">
            <a href="..." target="_blank" rel="noopener noreferrer">지난재난통계 |&nbsp;</a>
            <a href="..." target="_blank" rel="noopener noreferrer">재난행동요령 |&nbsp;</a>
            <a href="..." target="_blank" rel="noopener noreferrer">Q&A |&nbsp;</a>
            <a href="..." target="_blank" rel="noopener noreferrer">공지사항</a>
          </div>

          <br /><br />

          <div className="p-wrapper">
            <p>
              대전광역시 중구 선화동 22-10 중앙로역 2번 출구 인
              <a href="/adminlogin" className="hidden-link">근</a>
            </p>
            <p><span className="p-bold">긴급신고/민원전화</span> 042-222-2402</p>
            <p><span className="p-bold">문의시간</span> 평일 9:00-18:00</p>
          </div>

          <p>&copyright Natural Disaster Control System. all rights reserved.</p>
          <p>자연재난관제시스템에서 제공하는 자료는 공익목적으로만 사용해야하며 상업목적으로 사용할 경우 저작권을 침해합니다.</p>
        </div>

        <div className="footer-right">
          <img src={footerImg} alt="웹표준 인증로고" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
