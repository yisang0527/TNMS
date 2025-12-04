import { useState } from "react";
import './Header.css';

const Header = () => {
  const menuLst = [
    { name: "지난재난통계", subMenu: ["지난재난통계"] },
    { name: "재난예방대비", subMenu: ["재난대비행동요령", "비상연락망"] },
    { name: "재난심리상담", subMenu: ["상담센터소개", "재난심리상담", "재난심리 자가진단"] },
    { name: "참여와신고", subMenu: ["Q&A", "재난신고하기", "공지사항"] }
  ];

  // 현재 호버 중인 메뉴 이름
  const [hoverMenu, setHoverMenu] = useState(null);

  return (
    <nav className="nav">
      <img src="./logo1.png" alt="Logo" className="logo" />
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
              <li key={subIdx}>{sub}</li>
            ))}
          </ul>
        ))}
      </div>
      <button className="login">관리자 로그인</button>
    </nav>
  );
};

export default Header;