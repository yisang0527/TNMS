// NumberText.jsx

import background from "../../../../public/background1.jpg";
import resize from "../../../../public/resize.png"

import seoul from "../../../../public/numberLogo1.gif"
import busan from "../../../../public/numberLogo2.gif"
import degu from "../../../../public/numberLogo3.gif"
import chungbuk from "../../../../public/numberLogo4.gif"
import chungnam from "../../../../public/numberLogo5.gif"
import daejeon from "../../../../public/numberLogo6.gif"
import ganwon from "../../../../public/numberLogo7.gif"
import gwangju from "../../../../public/numberLogo8.gif"
import gyeonggi from "../../../../public/numberLogo9.gif"
import gyeongnam from "../../../../public/numberLogo10.gif"
import gyeonsangbukdo from "../../../../public/numberLogo11.gif"
import inchun from "../../../../public/numberLogo12.gif"
import jeju from "../../../../public/numberLogo13.gif"
import jeollabukdo from "../../../../public/numberLogo14.jpg"
import jeollanamdo from "../../../../public/numberLogo15.gif"
import sejong from "../../../../public/numberLogo16.gif"
import ulsan from "../../../../public/numberLogo17.gif"

const emergencyLinks = [
  {
    name: "서울특별시",
    url: "https://www.police.go.kr",
    img: seoul,
    icon: resize
  },
  {
    name: "부산광역시",
    url: "https://www.nfa.go.kr",
    img: busan,
    icon: resize
  },
  {
    name: "대구광역시",
    url: "https://www.police.go.kr",
    img: degu,
    icon: resize
  },
  {
    name: "인천광역시",
    url: "https://www.nfa.go.kr",
    img: inchun,
    icon: resize
  },
  {
    name: "광주광역시",
    url: "https://www.police.go.kr",
    img: gwangju,
    icon: resize
  },
  {
    name: "대전광역시",
    url: "https://www.nfa.go.kr",
    img: daejeon,
    icon: resize
  },
  {
    name: "울산광역시",
    url: "https://www.police.go.kr",
    img: ulsan,
    icon: resize
  },
  {
    name: "세종특별자치시",
    url: "https://www.nfa.go.kr",
    img: sejong,
    icon: resize
  },
  {
    name: "경기도",
    url: "https://www.police.go.kr",
    img: gyeonggi,
    icon: resize
  },
  {
    name: "강원특별자치도",
    url: "https://www.nfa.go.kr",
    img: ganwon,
    icon: resize
  },
  {
    name: "충청북도",
    url: "https://www.police.go.kr",
    img: chungbuk,
    icon: resize
  },
  {
    name: "충청남도",
    url: "https://www.nfa.go.kr",
    img: chungnam,
    icon: resize
  },
  {
    name: "전북특별자치도",
    url: "https://www.police.go.kr",
    img: jeollabukdo,
    icon: resize
  },
  {
    name: "전라남도",
    url: "https://www.nfa.go.kr",
    img: jeollanamdo,
    icon: resize
  },
  {
    name: "경상북도",
    url: "https://www.police.go.kr",
    img: gyeonsangbukdo,
    icon: resize
  },
  {
    name: "경상남도",
    url: "https://www.nfa.go.kr",
    img: gyeongnam,
    icon: resize
  },
  {
    name: "제주특별자치도",
    url: "https://www.police.go.kr",
    img: jeju,
    icon: resize
  },
];

export default function NumberText() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <div
        className="w-[1500px] mx-auto bg-cover bg-center"
      >
        <h2 className="text-[32px] font-bold mb-6 ml-[30px] pt-[80px]">
          비상연락망
        </h2><br />
        <div className="p-6 grid grid-cols-6 gap-6
                      max-xl:grid-cols-4
                      max-lg:grid-cols-3
                      max-sm:grid-cols-2
                      ">
          {emergencyLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="w-[200px] mb-[80px]"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[200px] h-[80px] object-contain mb-3 border border-[#E0E0E0] rounded bg-white"
              />
              <div className="flex flex-row items-center justify-end gap-2">
                <div className="text-sm font-semibold mb-1 text-gray-800">
                  {item.name}
                </div>
                <img src={item.icon} alt="아이콘" className="w-6 h-6 opacity-70" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}