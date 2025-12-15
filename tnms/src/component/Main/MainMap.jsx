import { useEffect, useRef } from "react";

export default function MainMap({ setSelectedRegion, setSideOpen, setMapObj }) {
  const KAKAO = useRef(null);
  const mapRef = useRef(null);
  const selectedPolygon = useRef(null);
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
        draggable: true,
        scrollwheel: true,
      });
      mapRef.current = map;
      setMapObj(map);

      const initialBounds = map.getBounds();

      // 줌 변경 시 레벨 고정 + 중심 유지
      kakao.maps.event.addListener(map, "zoom_changed", () => {
  const currentLevel = map.getLevel();
  if (currentLevel > initialLevel) {
    map.setLevel(initialLevel);        // 줌 제한
    map.setCenter(initialCenter);      // 축소 시 초기 중심으로 복원
  }
});

      // 드래그 제한: 화면 범위를 벗어나지 않도록 중심 조정
      kakao.maps.event.addListener(map, "drag", () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        let lat = map.getCenter().getLat();
        let lng = map.getCenter().getLng();
        const initSW = initialBounds.getSouthWest();
        const initNE = initialBounds.getNorthEast();

        if (sw.getLat() < initSW.getLat()) lat += initSW.getLat() - sw.getLat();
        if (sw.getLng() < initSW.getLng()) lng += initSW.getLng() - sw.getLng();
        if (ne.getLat() > initNE.getLat()) lat -= ne.getLat() - initNE.getLat();
        if (ne.getLng() > initNE.getLng()) lng -= ne.getLng() - initNE.getLng();

        map.setCenter(new kakao.maps.LatLng(lat, lng));
      });

      const regionCenters = {
        서울: new kakao.maps.LatLng(37.62808571674803, 127.25024225297835),
        경기도: new kakao.maps.LatLng(37.724067190773965, 128.03813624738643),
        강원도: new kakao.maps.LatLng(37.97324920193215, 129.36419005377905),
        충청남도: new kakao.maps.LatLng(36.63961, 127.69228709909288),
        충청북도: new kakao.maps.LatLng(36.85992962734329, 128.83145102188797),
        경상북도: new kakao.maps.LatLng(36.53286959438621, 129.71247564161587),
        경상남도: new kakao.maps.LatLng(35.37064104573429, 129.36922322157676),
        전라북도: new kakao.maps.LatLng(35.66819, 127.84584),
        전라남도: new kakao.maps.LatLng(34.836, 127.711),
        제주도: new kakao.maps.LatLng(33.4619, 127.5208405877571),
      };

      const regionFiles = [
        "Seoul.json", "Gyeonggi.json", "Gangwon.json", "Chungnam.json",
        "Chungbuk.json", "Gyeongnam.json", "Gyeongbuk.json", 
        "Jeonnam.json", "Jeonbuk.json", "Jeju.json"
      ];

      for (const file of regionFiles) {
        const data = await fetch(`/JSON/${file}`).then(r => r.json());
        let path = data.path.map(([lat, lng]) => new kakao.maps.LatLng(lat, lng));

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

        // 클릭
        kakao.maps.event.addListener(polygon, "click", () => {
          if (selectedPolygon.current && selectedPolygon.current !== polygon) {
            selectedPolygon.current.setOptions({ fillOpacity: 0.2 });
          }
          selectedPolygon.current = polygon;
          polygon.setOptions({ fillOpacity: 0.9 });

          setSelectedRegion(data.name);
          setSideOpen(true);

          const center = regionCenters[data.name];
        if (center) {
          const regionZoom = {
            서울:9,
            default: 11
          };

          const zoom = regionZoom[data.name] || regionZoom.default;

          map.setCenter(center);
          map.setLevel(zoom);  // ⭐ 핵심
        }
        });

        kakao.maps.event.addListener(polygon, "mouseover", () => {
          if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.9 });
        });
        kakao.maps.event.addListener(polygon, "mouseout", () => {
          if (selectedPolygon.current !== polygon) polygon.setOptions({ fillOpacity: 0.2 });
        });
        
        
      }
// 전역 참조
      window.polygonsRef = polygons;
      window.selectedPolygonRef = selectedPolygon;
    });
  }, [setSelectedRegion, setSideOpen]);

  return <div ref={KAKAO} className="w-full h-full" />;
}