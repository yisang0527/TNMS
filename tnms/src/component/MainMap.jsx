import { useEffect, useRef } from "react";;

import "./MainMap.css";

export default function MainMap({ setSelectedRegion, setSideOpen, setMapObj }) {
  const KAKAO = useRef(null);
  const mapRef = useRef(null);
  const selectedPolygon = useRef(null); // 클릭된 폴리곤 유지
  const polygons = useRef([]);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(async () => {
      const kakao = window.kakao;

      const initialCenter = new kakao.maps.LatLng(36.3504, 127.3845);
      const initialLevel = 13;

      const map = new kakao.maps.Map(KAKAO.current, {
        center: initialCenter,
        level: initialLevel,
        draggable: true, // 드래그 허용 (범위 안 제한을 따로 구현)
        scrollwheel: true, // 마우스 휠 확대/축소 허용
      });
      
      mapRef.current = map;
      setMapObj(map); // ⭐ 추가

      // ⭐ 초기 화면 범위 저장
      const initialBounds = map.getBounds();

      // ===== 줌 변경 시 범위 제한 =====
      kakao.maps.event.addListener(map, "zoom_changed", () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const initSW = initialBounds.getSouthWest();
        const initNE = initialBounds.getNorthEast();

        if (
          sw.getLat() < initSW.getLat() ||
          sw.getLng() < initSW.getLng() ||
          ne.getLat() > initNE.getLat() ||
          ne.getLng() > initNE.getLng()
        ) {
          map.setBounds(initialBounds); // 범위를 벗어나면 초기 범위로 되돌림
        }
      });

      // ===== 드래그 후 범위 제한 =====
      kakao.maps.event.addListener(map, "dragend", () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const initSW = initialBounds.getSouthWest();
        const initNE = initialBounds.getNorthEast();

        let lat = map.getCenter().getLat();
        let lng = map.getCenter().getLng();

        // 남서 / 북동 체크
        if (sw.getLat() < initSW.getLat()) lat += initSW.getLat() - sw.getLat();
        if (sw.getLng() < initSW.getLng()) lng += initSW.getLng() - sw.getLng();
        if (ne.getLat() > initNE.getLat()) lat -= ne.getLat() - initNE.getLat();
        if (ne.getLng() > initNE.getLng()) lng -= ne.getLng() - initNE.getLng();

        map.setCenter(new kakao.maps.LatLng(lat, lng));
      });

      
      
      const regionCenters = {
        서울: new kakao.maps.LatLng( 37.568420201077174, 127.25074789394824),
        경기도: new kakao.maps.LatLng(37.711962550489204, 128.37067897898055),
        강원도: new kakao.maps.LatLng(37.77311716291588, 130.24379625910632),
        충청남도: new kakao.maps.LatLng(36.639614564196194, 128.12980334245134),
        충청북도: new kakao.maps.LatLng(36.6993804826957, 129.05466597294622),
        경상북도: new kakao.maps.LatLng(36.53988507198923, 130.20837433876534),
        경상남도: new kakao.maps.LatLng(35.541178401552486, 130.25804185225263),
        전라북도: new kakao.maps.LatLng(35.66819050392036, 127.84584135005389),
        전라남도: new kakao.maps.LatLng(34.83599944688994, 127.7109967077605),
        제주도: new kakao.maps.LatLng(33.461895955466204, 127.07398148043245),
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

       // 1️⃣ path 생성
      let path = data.path.map(([lat, lng]) => new kakao.maps.LatLng(lat, lng));

      // 2️⃣ 경기도만 서울 구멍 추가
      if (data.name === "경기도") {
        const seoulData = await fetch("/JSON/Seoul.json").then(r => r.json());
        const seoulPath = seoulData.path.map(([lat, lng]) => new kakao.maps.LatLng(lat, lng));
        path = [path, seoulPath];
      }

        
        
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

      polygons.current.push({ polygon, name: data.name });

      // 이벤트는 kakao.maps.event.addListener로 붙이기
      kakao.maps.event.addListener(polygon, "click", () => {
          if (selectedPolygon.current && selectedPolygon.current !== polygon) {
            selectedPolygon.current.setOptions({ fillOpacity: 0.2 });
          }
          selectedPolygon.current = polygon;
          polygon.setOptions({ fillOpacity: 0.9 });

          setSelectedRegion(data.name);
          setSideOpen(true);

          const center = regionCenters[data.name];
          if (center) map.setCenter(center);
        });


          // 마우스 이벤트
          kakao.maps.event.addListener(polygon, "mouseover", () => {
            if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.9 });
          });
          kakao.maps.event.addListener(polygon, "mouseout", () => {
            if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.2 });
          });
                }

                // ⭐ SideTab에서 참조 가능하도록 전역 저장
                window.polygonsRef = polygons;
                window.selectedPolygonRef = selectedPolygon;
              });
              
            }, [setSelectedRegion, setSideOpen]);

            return <div ref={KAKAO} style={{ width: "100%", height: "100%" }}></div>;
}
