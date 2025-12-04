import React, { useState } from "react";
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
  const menuLst = [
    { name: "지난재난통계", link: "/", subMenu: [{name:"지난재난통계",link:"/"}] },
    { name: "재난예방대비", link: "/", subMenu: [{name:"재난대비행동요령",link:"/"}, {name:"비상연락망",link:"/"}] },
    { name: "재난심리상담", link:"/", subMenu: [{name: "상담센터소개",link:"/"},{name:"재난심리상담",link:"/"},{name:"재난심리 자가진단",link:"/"}] },
    { name: "참여와신고", link:"/", subMenu: [{name:"Q&A",link:"/"},{name:"재난신고하기",link:"/"},{name:"공지사항",link:"/"}] }
  ];

  // 현재 호버 중인 메뉴 이름
  const [hoverMenu, setHoverMenu] = useState(null);

  return (
    <nav className="nav">
        <img src="./logo1.png" alt="Logo" className="logo"/>
      <ul className="navContainer">
        {menuLst.map((v, idx) => (
          <li
            key={idx}
            className={hoverMenu === v.name ? "active" : ""}
            onMouseEnter={() => setHoverMenu(v.name)}
            onMouseLeave={() => setHoverMenu(null)}
          >
            <v.name === "재난심리상담" ? (
              <a href="https://www.redcross.or.kr/recovery/recovery_support.do" target="_blank" rel="noopener noreferrer">
                {v.name}
              </a>
            ) : ( 

            )
            <Link to={v.link}>{v.name}</Link>
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