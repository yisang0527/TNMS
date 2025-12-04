import { useEffect, useRef, useState } from 'react';

export default function MainMap() {
  const KAKAO = useRef(null);
  const [clickCount, setClickCount] = useState(0);

  // const [
  //   {
  //     id: seoul, wd: 6.1, ta: 2.3
  //   }
  // ]

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const kakao = window.kakao;
      const container = KAKAO.current;

      const options = {
        center: new kakao.maps.LatLng(36.3504, 127.3845), // 대전 중심
        level: 12, // 지도 레벨
      };

      const map = new kakao.maps.Map(container, options);

      // -------------------- 서울 전체 폴리곤 --------------------
      const polygonPath = [
        new kakao.maps.LatLng(37.65816987992781, 126.94784561524153),
        new kakao.maps.LatLng(37.64117784630861, 126.9121456608064),
        new kakao.maps.LatLng(37.627986874821005, 126.90874809332314),
        new kakao.maps.LatLng(37.591515525705574, 126.90079612948279),
        new kakao.maps.LatLng(37.578935011616466, 126.87544948509725),
        new kakao.maps.LatLng(37.57294374302461, 126.85387356734975),
        new kakao.maps.LatLng(37.60442091168271, 126.8024236315768),
        new kakao.maps.LatLng(37.585777589085694, 126.79573485218651),
        new kakao.maps.LatLng(37.56994702364358, 126.78009653513936),
        new kakao.maps.LatLng(37.555832707458606, 126.76570363810958),
        new kakao.maps.LatLng(37.550429352489445, 126.77024418193747),
        new kakao.maps.LatLng(37.54592508964062, 126.78615278987371),
        new kakao.maps.LatLng(37.53600648925149, 126.79563733776666),
        new kakao.maps.LatLng(37.53991011031263, 126.80056401993363),
        new kakao.maps.LatLng(37.54048080440447, 126.82031500691778),
        new kakao.maps.LatLng(37.52213877305759, 126.82529754395),
        new kakao.maps.LatLng(37.49542678137345, 126.81580406062676),
        new kakao.maps.LatLng(37.487317161737494, 126.82072618709685),
        new kakao.maps.LatLng(37.47379794817188, 126.81168156023739),
        new kakao.maps.LatLng(37.47710787627548, 126.83922707566762),
        new kakao.maps.LatLng(37.493341715342794, 126.86912223336714),
        new kakao.maps.LatLng(37.48071596759968, 126.87519267943247),
        new kakao.maps.LatLng(37.46358177146989, 126.88390087291248),
        new kakao.maps.LatLng(37.438048774545834, 126.8990959179394),
        new kakao.maps.LatLng(37.44596911277203, 126.93135483453409),
        new kakao.maps.LatLng(37.437361926006574, 126.94868223077299),
        new kakao.maps.LatLng(37.45790028098972, 126.989082319734),
        new kakao.maps.LatLng(37.45577412284388, 127.01717661958054),
        new kakao.maps.LatLng(37.44292767579449, 127.03849235431926),
        new kakao.maps.LatLng(37.42916459894373, 127.06371608923251),
        new kakao.maps.LatLng(37.439912552134516, 127.07857987968356),
        new kakao.maps.LatLng(37.457878203427654, 127.10269875941555),
        new kakao.maps.LatLng(37.471396469508065, 127.13492828421482),
        new kakao.maps.LatLng(37.499492275405075, 127.16038772341886),
        new kakao.maps.LatLng(37.50567565859647, 127.14358294725525),
        new kakao.maps.LatLng(37.52888544838139, 127.15371294413671),
        new kakao.maps.LatLng(37.54389482361195, 127.16554433264344),
        new kakao.maps.LatLng(37.55440368608873, 127.18192719866272),
        new kakao.maps.LatLng(37.576952592232956, 127.17287687458088),
        new kakao.maps.LatLng(37.569137230201065, 127.15045586917773),
        new kakao.maps.LatLng(37.55735471005603, 127.11023126123928),
        new kakao.maps.LatLng(37.568504839336924, 127.10487527507934),
        new kakao.maps.LatLng(37.59198691593372, 127.11534427888),
        new kakao.maps.LatLng(37.618764575273715, 127.11364517953479),
        new kakao.maps.LatLng(37.63200673506692, 127.11214081225478),
        new kakao.maps.LatLng(37.64966808830653, 127.09598028082144),
        new kakao.maps.LatLng(37.68441988510736, 127.09322304188657),
        new kakao.maps.LatLng(37.694614962772505, 127.07048455785241),
        new kakao.maps.LatLng(37.694373206369264, 127.03206647746947),
        new kakao.maps.LatLng(37.69936718370799, 127.01414761412985),
        new kakao.maps.LatLng(37.684372416729815, 127.00706881784322),
        new kakao.maps.LatLng(37.67593133720665, 126.99300656515607),
        new kakao.maps.LatLng(37.64383148584969, 126.98507404819054),
        new kakao.maps.LatLng(37.63132166995166, 126.9715766881194),
        new kakao.maps.LatLng(37.65816987992781, 126.94784561524153) 
      ];

      const polygon = new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 3,
        strokeColor: '#39DE2A',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#A2FF99',
        fillOpacity: 0.7
      });

      polygon.setMap(map);

      const mouseoverOption = {
        fillColor: '#EFFFED',
        fillOpacity: 0.8
      };

      const mouseoutOption = {
        fillColor: '#A2FF99',
        fillOpacity: 0.7
      };

      kakao.maps.event.addListener(polygon, 'mouseover', () => {
        polygon.setOptions(mouseoverOption);
      });

      kakao.maps.event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions(mouseoutOption);
      });

      kakao.maps.event.addListener(polygon, 'mousedown', () => {
        setClickCount(prev => prev + 1);
      });
    });
  }, []);

  return (
    <>
      <div ref={KAKAO} style={{ width: '100%', height: '100%' }}></div>
      
    </>
  );
}