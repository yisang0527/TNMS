import { useState } from "react";
import Count from "../../component/Issues/Count"; // Bar 그래프
import Scale from "../../component/Issues/Scale"; // 다른 그래프
import IssueMap from "../../component/Issues/IssueMap";
import IssueMarkers from "../../component/Issues/IssueMarkers";

export default function Issues() {
  const [selectedTab, setSelectedTab] = useState("bar");
  const [selectedTab2, setSelectedTab2] = useState("outdoor");
  const [mapInstance, setMapInstance] = useState(null);

  const outdoorPositions = [
  { title: "가좌여자중학교 운동장", latlng: { lat: 37.50855136, lng: 126.6792995 } },
  { title: "영산포초등학교 운동장", latlng: { lat: 34.99351694, lng: 126.7146381 } },
  { title: "청라1호근린공원", latlng: { lat: 37.53170691, lng: 126.6033821 } },
  { title: "공촌공원", latlng: { lat: 37.55110102, lng: 126.684326 } },
  { title: "곤양중학교 운동장", latlng: { lat: 35.05958132, lng: 127.973164 } },
  { title: "초정공원", latlng: { lat: 37.54084886, lng: 126.7414985 } },
  { title: "구례동중학교 운동장", latlng: { lat: 35.19247823, lng: 127.545776 } },
  { title: "계산공업고등학교 운동장", latlng: { lat: 37.53445433, lng: 126.739424 } },
  { title: "계산여자고등학교 운동장", latlng: { lat: 37.53879761, lng: 126.7423346 } },
  { title: "성지초등학교 운동장", latlng: { lat: 37.52618255, lng: 126.7199647 } },
  { title: "작전고등학교 운동장", latlng: { lat: 37.53271039, lng: 126.7300349 } },
  { title: "고리울초등학교", latlng: { lat: 37.52695792, lng: 126.826703 } },
  { title: "도당초등학교", latlng: { lat: 37.51929545, lng: 126.7916867 } },
  { title: "동곡초등학교", latlng: { lat: 37.49036373, lng: 126.8171301 } },
  { title: "동산초등학교", latlng: { lat: 37.53117872, lng: 126.7850714 } },
  { title: "개도중학교 운동장", latlng: { lat: 34.57144578, lng: 127.6594913 } },
  { title: "대현초등학교 운동장", latlng: { lat: 35.72906897, lng: 129.058042 } },
  { title: "무을초등학교 운동장", latlng: { lat: 36.26397863, lng: 128.197388 } },
  { title: "선주고등학교 운동장", latlng: { lat: 36.14159982, lng: 128.3120274 } },
  { title: "형곡고등학교 운동장", latlng: { lat: 36.10203337, lng: 128.3384316 } },
  { title: "도개초등학교 운동장", latlng: { lat: 36.30058173, lng: 128.3311269 } },
  { title: "덕적초중고등학교 운동장", latlng: { lat: 37.22548883, lng: 126.1475307 } },
  { title: "영흥초운동장", latlng: { lat: 37.25422447, lng: 126.4676498 } },
  { title: "대신어린이공원", latlng: { lat: 35.86148174, lng: 129.2220692 } },
  { title: "가은초등학교 운동장", latlng: { lat: 36.64315777, lng: 128.0628689 } },
  { title: "영강체육공원", latlng: { lat: 36.6024, lng: 128.2121 } },
  { title: "성주중앙초등학교 운동장", latlng: { lat: 35.91649814, lng: 128.2870784 } },
  { title: "왜가리생태관", latlng: { lat: 36.48451733, lng: 128.5279425 } },
  { title: "함평골프고등학교", latlng: { lat: 35.02666646, lng: 126.535688 } },
  { title: "미암초등학교 운동장", latlng: { lat: 34.69994116, lng: 126.5740123 } },
  { title: "비산초등학교 운동장", latlng: { lat: 36.11877894, lng: 128.3747675 } },
  { title: "성서공업지역 주변 완충녹지", latlng: { lat: 35.84914201, lng: 128.5080322 } },
  { title: "배실웨딩공원", latlng: { lat: 35.86223624, lng: 128.5051783 } },
  { title: "배꽃공원", latlng: { lat: 35.85969043, lng: 128.5018889 } },
  { title: "와룡(위)공원", latlng: { lat: 35.85811953, lng: 128.5006369 } },
  { title: "와룡(아랫)공원", latlng: { lat: 35.85631134, lng: 128.5005997 } },
  { title: "샛별어린이공원", latlng: { lat: 35.85755299, lng: 128.5043325 } },
  { title: "햇님어린이공원", latlng: { lat: 35.85687295, lng: 128.5047188 } },
  { title: "사령봉어린이공원", latlng: { lat: 35.85267842, lng: 128.5031456 } },
  { title: "늘푸른공원", latlng: { lat: 35.85996377, lng: 128.5046054 } },
  { title: "계골산공원", latlng: { lat: 35.86083298, lng: 128.4992775 } },
  { title: "돌산공원", latlng: { lat: 35.85722443, lng: 128.493602 } },
  { title: "신당어린이공원", latlng: { lat: 35.85824179, lng: 128.4990522 } },
  { title: "오정공원", latlng: { lat: 35.8562925, lng: 128.4963937 } },
  { title: "점터공원", latlng: { lat: 35.85467008, lng: 128.4938943 } },
  { title: "갈뫼공원", latlng: { lat: 35.85218037, lng: 128.4941788 } },
  { title: "앞돌어린이공원", latlng: { lat: 35.85326788, lng: 128.4970888 } },
  { title: "청록어린이공원", latlng: { lat: 35.85394181, lng: 128.497113 } },
  { title: "은하수공원", latlng: { lat: 35.85118031, lng: 128.4870788 } },
  { title: "미리내공원", latlng: { lat: 35.8516352, lng: 128.4836054 } },
  { title: "강창근린공원", latlng: { lat: 35.85237436, lng: 128.479228 } },
  { title: "호림공원", latlng: { lat: 35.84271248, lng: 128.4889108 } },
  { title: "대청중고등학교 운동장", latlng: { lat: 37.83230226, lng: 124.6971456 } },
  { title: "병곡면 고래불휴게소 앞 주차장", latlng: { lat: 36.62322683, lng: 129.410438 } },
  { title: "호산근린공원", latlng: { lat: 35.8489611, lng: 128.4839809 } },
  { title: "광수어린이공원", latlng: { lat: 35.82724565, lng: 128.5344693 } },
  { title: "송일어린이공원", latlng: { lat: 35.82419664, lng: 128.5325471 } },
  { title: "조암공원", latlng: { lat: 35.82768525, lng: 128.5248779 } },
  { title: "선돌공원", latlng: { lat: 35.82327285, lng: 128.5166575 } },
  { title: "마을마당공원", latlng: { lat: 35.82385739, lng: 128.5269827 } },
  { title: "한샘청동공원", latlng: { lat: 35.81989895, lng: 128.5179888 } },
  { title: "월명공원", latlng: { lat: 35.82802926, lng: 128.528997 } },
  { title: "감천리어린이공원", latlng: { lat: 35.82966143, lng: 128.528747 } },
  { title: "감포관광단지 주차장", latlng: { lat: 35.76746876, lng: 129.4910967 } },
  { title: "외서초등학교 운동장", latlng: { lat: 36.47927593, lng: 128.1073371 } },
  { title: "상주초등학교 운동장", latlng: { lat: 36.41618005, lng: 128.1565368 } },
  { title: "복룡동 시민문화공원", latlng: { lat: 36.41803428, lng: 128.1700354 } },
  { title: "봉화중고등학교", latlng: { lat: 36.89524348, lng: 128.7397245 } },
  { title: "조성초등학교 운동장", latlng: { lat: 34.80961682, lng: 127.2483658 } },
  { title: "곡성생활체육공원(동악체육공원)", latlng: { lat: 35.28262902, lng: 127.2849377 } },
  { title: "문창고등학교 운동장", latlng: { lat: 36.60272996, lng: 128.2002038 } },
  { title: "단밀초등학교 운동장", latlng: { lat: 36.37573991, lng: 128.3803082 } },
  { title: "흑산초등학교 홍도분교", latlng: { lat: 34.6851755, lng: 125.1924403 } },
  { title: "대덕초등학교", latlng: { lat: 35.91769524, lng: 127.971644 } },
  { title: "한천초등학교 운동장", latlng: { lat: 34.97907681, lng: 127.0040521 } },
  { title: "도곡초등학교 운동장", latlng: { lat: 35.01310446, lng: 126.9086724 } },
  { title: "천태초등학교 운동장", latlng: { lat: 34.94535581, lng: 126.8934381 } },
  { title: "연왕어린이공원", latlng: { lat: 35.83494103, lng: 128.5324281 } },
  { title: "사랑어린이공원", latlng: { lat: 35.82977435, lng: 128.5311974 } },
  { title: "효성어린이공원", latlng: { lat: 35.83367079, lng: 128.530088 } },
  { title: "평화어린이공원", latlng: { lat: 35.83018473, lng: 128.5288751 } },
  { title: "옹달샘어린이공원", latlng: { lat: 35.83177514, lng: 128.5291278 } },
  { title: "학산어린이공원", latlng: { lat: 35.83159904, lng: 128.5267157 } },
  { title: "창공어린이공원", latlng: { lat: 35.83318844, lng: 128.5315778 } },
  { title: "미성어린이공원", latlng: { lat: 35.83282328, lng: 128.5335803 } },
  { title: "오복어린이공원", latlng: { lat: 35.81422135, lng: 128.5292709 } },
  { title: "진천어린이공원", latlng: { lat: 35.81277528, lng: 128.5229456 } },
  { title: "가오중학교 운동장", latlng: { lat: 36.30844072, lng: 127.4574392 } },
  { title: "구봉중학교 운동장", latlng: { lat: 34.73187728, lng: 127.7145915 } },
  { title: "신월초등학교 운동장", latlng: { lat: 34.72702778, lng: 127.7139622 } },
  { title: "동대전중학교 운동장", latlng: { lat: 36.34539836, lng: 127.4549246 } },
  { title: "양지초등학교 운동장", latlng: { lat: 34.77260337, lng: 127.7010858 } },
  { title: "부림초등학교 운동장", latlng: { lat: 35.46497369, lng: 128.3206826 } },
  { title: "의령고등학교 운동장", latlng: { lat: 35.32253122, lng: 128.266266 } },
  { title: "운암초등학교", latlng: { lat: 37.14354372, lng: 127.0761874 } },
  { title: "오산대원초등학교", latlng: { lat: 37.13030505, lng: 127.0708234 } },
  { title: "효령초등학교 운동장", latlng: { lat: 36.15672015, lng: 128.5866156 } },
  { title: "대금고등학교 운동장", latlng: { lat: 36.98112346, lng: 127.5290362 } },
  { title: "쌍봉초등학교 운동장", latlng: { lat: 37.00261037, lng: 127.5423259 } },
  { title: "삼성초등학교 운동장", latlng: { lat: 37.01986706, lng: 127.4966028 } },
  { title: "삼리초등학교",latlng: { lat: 37.357997, lng: 127.324126 },},
  { title: "강동초등학교",latlng: { lat: 37.785756, lng: 128.944332 },},
  { title: "매산초등학교 운동장",latlng: { lat: 37.591066, lng: 127.845884 },},
  { title: "횡계초등학교",latlng: { lat: 37.675993, lng: 128.711328 },},
  { title: "전주성심여자중학교",latlng: { lat: 35.813290, lng: 127.150711 },},
  { title: "결성초등학교",latlng: { lat: 36.524595, lng: 126.544183 },},
  { title: "이리고등학교 운동장",latlng: { lat: 35.949357, lng: 126.955925 },},
  { title: "조림초등학교",latlng: { lat: 36.738745, lng: 126.785197 },},
  { title: "녹전초등학교",latlng: { lat: 37.148034, lng: 128.681488 },},
  ];

  const civilDefensePositions = [
   {
    title: "우리은행창신동지점 지하1층",
    latlng: { lat: 37.572209721406836, lng: 127.01227833594984 },
  },
  {
    title: "유원강변아파트 지하주차장 1~2층",
    latlng: { lat: 37.514617972535405, lng: 126.95126177450096 },
  },
   {
    title: "부산세관본부 지하1층",
    latlng: { lat: 35.10448352758026, lng: 129.03898041726208 },
  },
  {
    title: "정관 동일스위트2차 아파트 주차장 지하2층",
    latlng: { lat: 35.3290338158577, lng: 129.167038950798 },
  },
  {
    title: "신성미소시티 지하1층~5층",
    latlng: { lat: 35.86672716040076, lng: 128.58819757248716 },
  },
  {
    title: "테크노폴리스 중흥에스클래스포디움 지하1~2층",
    latlng: { lat: 35.7004216956085, lng: 128.467728164262 },
  },
  {
    title: "신포지하상가 지하1층",
    latlng: { lat: 37.47312743307429, lng: 126.62932867717119 },
  },
  {
    title: "e편한세상 도화5단지 아파트 지하주차장 1층~2층",
    latlng: { lat: 37.47252747034219, lng: 126.6630024164573 },
  },
  {
    title: "호반리젠시빌2차 지하 1층",
    latlng: { lat: 35.126853975094285, lng: 126.85512509880951 },
  },
  {
    title: "보라2차아파트 지하1층 주차장",
    latlng: { lat: 35.14295132690244, lng: 126.79434327483187 },
  },
  {
    title: "용방마을아파트 318동 앞 주차건물 지하1층",
    latlng: { lat: 36.32700088946982, lng: 127.45136517506775 },
  },
   {
    title: "용문동 서우아파트 지하1층 지하실",
    latlng: { lat: 36.33535204627014, lng: 127.39431042145581 },
  },
    {
    title: "송정한양수자인아파트 지하주차장 1층",
    latlng: { lat: 35.6029725225575, lng: 129.363535807837 },
  },
   {
    title: "평창3차현대아파트 603동 앞 지하주차장 1층",
    latlng: { lat: 35.54485405306545, lng: 129.33809054461435 },
  },
  {
    title: "삼우아파트 외부 지하1층주차장,대피소",
    latlng: { lat: 37.30223116027914, lng: 127.00448043381559 },
  },
  {
    title: "수내 공영주차장",
    latlng: { lat: 37.368565987529585, lng: 127.11500570118457 },
  },
  {
  title: "금용아파트 지하주차장 1층",
  latlng: { lat: 37.73336793826836, lng: 127.08533544904672 },
},
{
  title: "관악역 지하보도 B1층",
  latlng: { lat: 37.418874037469934, lng: 126.9091895525484 },
},
{
  title: "동부새롬아파트 지하 1층 주차장",
  latlng: { lat: 37.39219782256913, lng: 126.98049286481921 },
},
{
  title: "삼산아파트",
  latlng: { lat: 37.76849949595208, lng: 126.77040030780057 },
},
{
  title: "김포한강롯데캐슬 22단지 모든동의 지하주차장1층",
  latlng: { lat: 37.64500848702886, lng: 126.68454518773582 },
},
{
  title: "솜리문화예술회관(익산예술의전당 분관) 지하1층",
  latlng: { lat: 35.93922915935745, lng: 126.96947593928985 },
},
{
  title: "봉동명진로얄2차아파트 전체 동의 지하주차장 1층",
  latlng: { lat: 35.93621609483206, lng: 127.16111609190354 },
},
{
  title: "안동농업협동조합 지하1층 식당",
  latlng: { lat: 36.564838554502366, lng: 128.72045330877535 },
},
{
  title: "코오롱하늘채 아파트 지하주차장 1,2층",
  latlng: { lat: 36.5790813640718, lng: 128.496058078554 },
},
{
  title: "양산물금우미린아파트",
  latlng: { lat: 35.328014869469, lng: 129.015776329188 },
},
{
  title: "참누리아파트1단지 지하주차장 1층",
  latlng: { lat: 37.22019046830365, lng: 127.0517027420342 },
},
{
  title: "창원지방검찰청마산지청 (본관 뒤 지하주차장 1층)",
  latlng: { lat: 35.19648196444534, lng: 128.56945532049988 },
},
{
  title: "새뜸마을 2단지 지하주차장 1층",
  latlng: { lat: 36.48288639311358, lng: 127.24791779298114 },
},
{
  title: "산북면행정복지센터 지하1층",
  latlng: { lat: 37.40149160004774, lng: 127.44333865203195 },
},
{
  title: "가좌마을 부영2단지아파트(지하주차장)",
  latlng: { lat: 36.63562812110619, lng: 127.50894846664141 },
},
{
  title: "하이제주(지하 1층)",
  latlng: { lat: 33.51238133856093, lng: 126.56263346835107 },
},
{
  title: "진로아파트 지하주차장 1층",
  latlng: { lat: 37.373888, lng: 128.031975 },
},
{
  title: "북면 주민대피시설 지상 1층",
  latlng: { lat: 38.114549, lng: 128.199609 },
},
{
  title: "남면행정복지센터",
  latlng: { lat: 37.268952, lng: 128.740570 },
},
{
  title: "쌍용아파트 지하주차장 1층",
  latlng: { lat: 37.520195, lng: 129.120093 },
},
{
  title: "아주아파트 지하주차장 1층",
  latlng: { lat: 36.121856, lng: 128.090377 },
},
{
  title: "현대아파트 104동 지하주차장 1층",
  latlng: { lat: 35.413197, lng: 127.385242 },
},
{
  title: "문화누리관 1층",
  latlng: { lat: 35.723770, lng: 128.263213 },
},
{
  title: "동일현대아파트 지하주차장 1층",
  latlng: { lat: 37.136738, lng: 128.218606 },
},

  ];

  const positions =
    selectedTab2 === "outdoor" ? outdoorPositions : civilDefensePositions;

  return (
    <div className="max-w-[1250px] mx-auto mt-20 mb-20 py-[100px] px-[50px] pb-[150px] bg-white border border-gray-100 rounded-2xl shadow-xl">
      <h3 className="text-[32px] font-bold text-[#333333] mb-[70px]">재난 이슈</h3>

      {/* 그래프 섹션 */}
      <h4 className="text-[24px] font-bold text-[#333333] mb-[10px]">지역별 그래프</h4>
      <p className="text-[18px] text-[#333333] mb-[40px]">
        현재 이슈되는 재난은 <span className="font-bold">지진</span>입니다
      </p>

      <div className="mb-5">
        <button
          className={`inline-block text-[18px] font-bold w-[100px] h-[50px] border mr-4 ${
            selectedTab === "bar" ? "bg-[#333] text-white" : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab("bar")}
        >
          횟수
        </button>
        <button
          className={`inline-block text-[18px] font-bold w-[100px] h-[50px] border ${
            selectedTab === "scale" ? "bg-[#333] text-white" : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab("scale")}
        >
          규모
        </button>
      </div>

      {selectedTab === "bar" && <Count />}
      {selectedTab === "scale" && <Scale />}
      <p className="mt-[20px]">
        <span className="font-bold">Tip</span> 그래프 위에 마우스를 올리면 정확한 값을 확인할 수 있습니다.
      </p>

      {/* 대피소 지도 섹션 */}
      <h4 className="text-[24px] font-bold text-[#333333] mt-[70px] mb-[40px]">대피시설 분포</h4>
      <div className="mb-5">
        <button
          className={`inline-block text-[18px] font-bold w-[120px] h-[50px] border mr-4 ${
            selectedTab2 === "outdoor"
              ? "bg-[#333] text-white"
              : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab2("outdoor")}
        >
          옥외 대피소
        </button>
        <button
          className={`inline-block text-[18px] font-bold w-[120px] h-[50px] border ${
            selectedTab2 === "civil-defense"
              ? "bg-[#333] text-white"
              : "text-[#333] border-[#333]"
          }`}
          onClick={() => setSelectedTab2("civil-defense")}
        >
          민방위 대피소
        </button>
      </div>

      <IssueMap onMapReady={setMapInstance} />
      {mapInstance && <IssueMarkers map={mapInstance} positions={positions} type={selectedTab2} />}

      {/* 지도 밑 박스 */}
      {selectedTab2 === "outdoor" && (
        <div className="max-w-[1250px] mx-auto mt-10 border border-gray-100 p-5">
          <h5>옥외 대피소</h5>
          <p>서울 3개 인천 10개  경기 6개  강원 3개  전남 9개  전북 3개  경북 32개  경남 1개  충북 1개  충남 2개</p>
        </div>
      )}

      {selectedTab2 === "civil-defense" && (
        <div className="max-w-[1250px] mx-auto mt-10 border border-gray-100 p-5">
          <h5>민방위 대피소</h5>
          <p>서울 5개  인천 2개  경기 6개  강원 3개  전남 3개  전북 4개  경북 3개  경남 1개  부산 3개</p>
        </div>
      )}
    </div>
  );
}