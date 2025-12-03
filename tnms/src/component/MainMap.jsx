import { useEffect, useRef } from "react";

export default function MainMap() {
  const mapRef = useRef(null);

// var container = document.getElementById('map');
// 		var options = {
// 			center: new kakao.maps.LatLng(33.450701, 126.570667),
// 			level: 3
// 		};

// 		var map = new kakao.maps.Map(container, options);



  // useEffect(() => {
  //   // 1. Kakao SDK 동적 로드
  //   const kakaoKey = import.meta.env.VITE_KAKAO_API;
  //   const script = document.createElement("script");
  //   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
  //   script.async = true;

  //   // 2. SDK 로드 후 지도 생성
  //   script.onload = () => {
  //     window.kakao.maps.load(() => {
  //       new window.kakao.maps.Map(mapRef.current, {
  //         center: new window.kakao.maps.LatLng(36.5, 127.5), // 한반도 중심
  //         level: 7, // 줌 레벨
  //       });
  //     });
  //   };

  //   document.head.appendChild(script);
  // }, []);

  // 3. 지도 div
  return 
  <div id="map" style="width:500px;height:400px;"></div>;
}
