// MainMap.jsx

import { useEffect, useRef } from "react";;
import "../../css/Main/MainMap.css";

export default function MainMap({ selectedRegion, setSelectedRegion, setSideOpen }) {
  const KAKAO = useRef(null);
  const mapRef = useRef(null);
  const selectedPolygon = useRef(null); // 클릭된 폴리곤 유지

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(async () => {
      const kakao = window.kakao;
      const map = new kakao.maps.Map(KAKAO.current, {
        center: new kakao.maps.LatLng(36.3504, 127.3845),
        level: 13,
      });
      mapRef.current = map;

      const regionCenters = {
        서울: new kakao.maps.LatLng(37.55538654535481, 126.9835765626031),
        경기도: new kakao.maps.LatLng(37.500232760498974, 127.22193537663605),
        강원도: new kakao.maps.LatLng(37.75973674009599, 128.22287567885292),
        충청남도: new kakao.maps.LatLng(36.49070077873013, 126.92030471357498),
        충청북도: new kakao.maps.LatLng(36.73190428099862, 127.70538441377482),
        경상북도: new kakao.maps.LatLng(36.37145412453759, 128.7384757276954),
        경상남도: new kakao.maps.LatLng(35.415746139700346, 128.38308398667152),
        전라북도: new kakao.maps.LatLng(35.76388057183283, 127.14057487033574),
        전라남도: new kakao.maps.LatLng(35.067221811111295, 127.0005766936257),
        제주도: new kakao.maps.LatLng(33.389806138956786, 126.51873917572715),
      };

      
      const regionFiles = [
        "Seoul.json",
        "Gyeonggi.json",
        "Gangwon.json",
        "Chungnam.json",
        "Chungbuk.json",
        "Gyeongnam.json",
        "Gyeongbuk.json",
        "Jeonnam.json",
        "Jeonbuk.json",
        "Jeju.json",
      ];
      
      for (const file of regionFiles) {
        const res = await fetch(`/JSON/${file}`);
        const data = await res.json();

        const path = data.path.map(([lat, lng]) => new kakao.maps.LatLng(lat, lng));

        const polygon = new kakao.maps.Polygon({
        path,
        strokeWeight: 4,
        strokeColor: data.stroke,
        strokeOpacity: 0.8,
        strokeStyle: "solid",
        fillColor: data.fill,
        fillOpacity: 0.2,
        zIndex: data.zIndex || 1,
      });

      polygon.setMap(map);

      // 이벤트는 kakao.maps.event.addListener로 붙이기
      kakao.maps.event.addListener(polygon, "click", () => {
        const map = mapRef.current;
        if (!map) return;

        // 이전 선택된 폴리곤 초기화
        if (selectedPolygon.current && selectedPolygon.current !== polygon) {
          selectedPolygon.current.setOptions({ fillOpacity: 0.2 });
        }

        selectedPolygon.current = polygon;
        polygon.setOptions({ fillOpacity: 0.9 });
        setSelectedRegion(data.name);
        setSideOpen(true);

        // 센터와 줌 이동
        const center = regionCenters[data.name];
        if (center) {
          map.setCenter(center);
          map.setLevel(data.zoomLevel || 11);
        } else {
          console.warn("regionCenters에 해당 지역 없음:", data.name);
        }
      });


// 마우스 이벤트
kakao.maps.event.addListener(polygon, "mouseover", () => {
  if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.9 });
});
kakao.maps.event.addListener(polygon, "mouseout", () => {
  if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.2 });
});
      }
    });
  }, [setSelectedRegion, setSideOpen]);

  return <div ref={KAKAO} style={{ width: "100%", height: "100%" }}></div>;
}