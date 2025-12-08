import '../../../css/ETC/Header/Header.css';
import { useState } from "react";
import { Link } from "react-router-dom";

import headerImg from "../../../../public/logo1.png"

const Header = () => {
  const menuLst = [
    {
      name: "지난재난통계",
      subMenu: [
        { name: "지난재난통계", link: "/stats" }]
    },
    {
      name: "재난예방대비",
      subMenu: [
        { name: "재난대비행동요령", link: "/prev" },
        { name: "비상연락망", link: "/number" }]
    },
    {
      name: "재난심리상담",
      subMenu: [
        { name: "상담센터소개", link: "/" },
        { name: "재난심리상담", link: "https://www.redcross.or.kr/recovery/recovery_support.do", external: true },
        { name: "재난심리 자가진단", link: "https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/pcm/cyb/SelfDgnssForm.jsp?menuSeq=566", external: true }]
    },
    {
      name: "참여와신고",
      subMenu: [
        { name: "Q&A", link: "/qna" },
        { name: "재난신고하기", link: "https://www.safetyreport.go.kr/#main", external: true },
        { name: "공지사항", link: "/notice" }]
    }
  ];

  // 현재 호버 중인 메뉴 이름
  const [hoverMenu, setHoverMenu] = useState(null);

  return (
    <nav className="nav">
      <img src={headerImg} alt="Logo" className="logo" />
      <ul className="navContainer">
        {menuLst.map((v, idx) => (
          <li
            key={idx}
            className={hoverMenu === v.name ? "active" : ""}
            onMouseEnter={() => setHoverMenu(v.name)}
            onMouseLeave={() => setHoverMenu(null)}
          >
            {v.name}
          </li>
        ))}
      </ul>

      <div className="detailMenu">
        {menuLst.map((v, idx) => (
          <ul
            key={idx}
            onMouseEnter={() => setHoverMenu(v.name)}
            onMouseLeave={() => setHoverMenu(null)}
            className={hoverMenu === v.name ? "show" : "hide"}
          >
            {v.subMenu.map((sub, subIdx) => (
              <li key={subIdx}>
                <Link to={sub.link}>{sub.name}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button className="login">관리자 로그인</button>
    </nav>
  );
};

export default Header;