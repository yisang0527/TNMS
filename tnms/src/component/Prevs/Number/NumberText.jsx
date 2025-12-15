// NumberText.jsx

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
    url: "https://org.seoul.go.kr/org/orgChart.do",
    img: seoul,
    icon: resize
  },
  {
    name: "부산광역시",
    url: "https://www.busan.go.kr/bhorganization01",
    img: busan,
    icon: resize
  },
  {
    name: "대구광역시",
    url: "https://www.daegu.go.kr/index.do?menu_id=00000248",
    img: degu,
    icon: resize
  },
  {
    name: "인천광역시",
    url: "https://www.incheon.go.kr/IC040221",
    img: inchun,
    icon: resize
  },
  {
    name: "광주광역시",
    url: "https://www.gwangju.go.kr/contentsView.do?pageId=www147",
    img: gwangju,
    icon: resize
  },
  {
    name: "대전광역시",
    url: "https://www.daejeon.go.kr/drh/drhOrganization.do?menuSeq=6376",
    img: daejeon,
    icon: resize
  },
  {
    name: "울산광역시",
    url: "https://www.ulsan.go.kr/u/rep/contents.ulsan?mId=001005007001001000",
    img: ulsan,
    icon: resize
  },
  {
    name: "세종특별자치시",
    url: "https://www.sejong.go.kr/kor/sub01_010101.do#sub01_010101",
    img: sejong,
    icon: resize
  },
  {
    name: "경기도",
    url: "https://www.gg.go.kr/org/orgChart.do?menuId=1808",
    img: gyeonggi,
    icon: resize
  },
  {
    name: "강원특별자치도",
    url: "https://state.gwd.go.kr/portal/introduce/guidance/organization",
    img: ganwon,
    icon: resize
  },
  {
    name: "충청북도",
    url: "https://www.chungbuk.go.kr/www/contents.do?key=478",
    img: chungbuk,
    icon: resize
  },
  {
    name: "충청남도",
    url: "https://www.chungnam.go.kr/cnportal/main/contents.do?menuNo=500984",
    img: chungnam,
    icon: resize
  },
  {
    name: "전북특별자치도",
    url: "https://www.jeonbuk.go.kr/index.jeonbuk?menuCd=DOM_000000101003001000",
    img: jeollabukdo,
    icon: resize
  },
  {
    name: "전라남도",
    url: "https://www.jeonnam.go.kr/contentsView.do?menuId=jeonnam0601010000",
    img: jeollanamdo,
    icon: resize
  },
  {
    name: "경상북도",
    url: "https://www.gb.go.kr/Main/page.do?mnu_uid=6851&LARGE_CODE=720&MEDIUM_CODE=60&SMALL_CODE=40&SMALL_CODE2=20",
    img: gyeonsangbukdo,
    icon: resize
  },
  {
    name: "경상남도",
    url: "https://www.gyeongnam.go.kr/index.gyeong?menuCd=DOM_000000137001001000",
    img: gyeongnam,
    icon: resize
  },
  {
    name: "제주특별자치도",
    url: "https://www.jeju.go.kr/jeju/jeju/org/organization.htm",
    img: jeju,
    icon: resize
  },
];

export default function NumberText() {
  return (
    <div>
      <div className="w-[90%] max-w-[1250px] mx-auto mt-20 mb-20 p-[100px_50px_150px] pb-60 bg-[#FFFFFF] rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-[32px] font-bold mb-6 ml-[30px]">
          비상연락망
        </h2>

        <div className="p-6 grid grid-cols-6 gap-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {emergencyLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="w-[170px] mb-[50px]"
            >

              <img
                src={item.img}
                alt={item.name}
                className="w-[200px] h-20 object-contain mb-3 border border-[#E0E0E0] rounded bg-white"
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