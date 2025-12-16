import { useEffect, useRef } from "react";

export default function IssueMap({ onMapReady }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || mapRef.current) return;

    window.kakao.maps.load(() => {
      const kakao = window.kakao;

      const MIN_LEVEL = 13;

      const map = new kakao.maps.Map(mapContainerRef.current, {
        center: new kakao.maps.LatLng(36.3504, 127.3845),
        level: MIN_LEVEL,
        draggable: true,
        scrollwheel: true, // 확대는 허용
      });

    

      // 🔥 축소 제한 핵심
      kakao.maps.event.addListener(map, "zoom_changed", () => {
        const currentLevel = map.getLevel();

        if (currentLevel > MIN_LEVEL) {
          map.setLevel(MIN_LEVEL);
        }
      });

      mapRef.current = map;
      onMapReady?.(map);
    });
  }, []);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />;
}
