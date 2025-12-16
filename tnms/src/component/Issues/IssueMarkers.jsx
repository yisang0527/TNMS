import { useEffect } from "react";

export default function IssueMarkers({ map, positions, type }) {
  useEffect(() => {
    if (!map || !window.kakao) return;

    const kakao = window.kakao;

    // type에 따라 다른 마커 이미지 선택
    const imageSrc =
      type === "outdoor"
        ? "/shelter.png" // 옥외 대피소용 이미지
        : "/shield.png"; // 민방위 대피소용 이미지
    const imageSize = new kakao.maps.Size(32, 32);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const markers = positions.map((pos) => {
      return new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(pos.latlng.lat, pos.latlng.lng),
        title: pos.title,
        image: markerImage,
      });
    });

    // 언마운트 시 마커 제거
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, positions, type]); // type 추가

  return null;
}