import {Link} from "react-router-dom"
import "./footer.css";
import waLogo from "../../assets/waLogo.png"

function Footer() {
  return (
    <footer className="footer">
      <footer-left>
        <div className="footerLink">
      <a
        href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/help/SDIJKM7102.html?menuSeq=336"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white cursor-pointer"
      >
        지난재난통계 |&nbsp;
      </a>
      <a
        href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/help/SDIJKM7102.html?menuSeq=336"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white cursor-pointer"
      >
        재난행동요령 |&nbsp;
      </a>
      <a
        href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/help/SDIJKM7102.html?menuSeq=336"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white cursor-pointer"
      >
        Q&A |&nbsp;
      </a>
      <a
        href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/help/SDIJKM7102.html?menuSeq=336"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white cursor-pointer"
      >
        공지사항
      </a>
      </div>
      <br/>
      <br/>
      <div className="p-wrapper">
      <p>대전광역시 중구 선화동 22-10 중앙로역 2번 출구 인근</p>
      <p><span className="p-bold">긴급신고/민원전화</span> 042-222-2402</p>
      <p><span className="p-bold">문의시간</span> 평일 9:00-18:00</p>
      </div>
      <p>&copyright Natural Disaster Control System. all rights reserved.</p>
      <p>자연재난관제시스템에서 제공하는 자료는 공익목적으로만 사용해야하며 상업목적으로 사용할 경우 저작권을 침해합니다.</p>
      </footer-left>
      <div className="footer-right">
      <img src={waLogo} alt="웹표준로고"/>
      </div>
      

    </footer>
  );
}

export default Footer;