const emergencyLinks = [
  {
    name: "서울특별시",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_seoul.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "부산광역시",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_busan.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "대구광역시",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_degu.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "인천광역시",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_inchun.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "광주광역시",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_gwangju.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "대전광역시",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_daejeon.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "울산광역시",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_ulsan.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "세종특별자치시",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_sejong.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "경기도",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_gyeonggi.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "강원특별자치도",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_ganwon.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "충청북도",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_chungbuk.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "충청남도",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_chungnam.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "전북특별자치도",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_jeollabukdo.jpg",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "전라남도",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_jeollanamdo.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "경상북도",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_gyeonsangbukdo.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "경상남도",
    url: "https://www.nfa.go.kr",
    img: "/emergency_contact/imgi_gyeongnam.gif",
    icon: "/emergency_contact/resize.png"
  },
  {
    name: "제주특별자치도",
    url: "https://www.police.go.kr",
    img: "/emergency_contact/imgi_jeju.gif",
    icon: "/emergency_contact/resize.png"
  },
];

export default function number() {
  return (
    <div className="p-6 grid grid-cols-6 gap-6
                    max-xl:grid-cols-4
                    max-lg:grid-cols-3
                    max-sm:grid-cols-2">
      {emergencyLinks.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center 
                     transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-16 h-16 object-contain mb-3"
          />
          <div className="text-sm font-semibold mb-1 text-gray-800">
            {item.name}
          </div>
          <div className="text-xl opacity-70">{item.icon}</div>
        </a>
      ))}
    </div>
  );
}