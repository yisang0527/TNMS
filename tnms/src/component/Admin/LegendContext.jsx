//component/Admin/LegendContext.jsx

import { createContext, useContext, useState, useEffect } from "react";

const LegendContext = createContext(null);

export function useLegends() {
    return useContext(LegendContext);
}

export function LegendProvider({ children }) {
    const [legends, setLegends] = useState([
        { id: "wind", name: "강풍", color: "#4BC0C0", unit: "m/s", enabled: true },
        { id: "dust", name: "황사", color: "#DECC96", unit: "㎍/㎥", enabled: true },
        { id: "rain1", name: "장마", color: "#9966FF", unit: "mm", enabled: true },
        { id: "mauntain", name: "산사태", color: "#8B7355", unit: "ha", enabled: true },
        { id: "rain2", name: "호우", color: "#FF9F40", unit: "mm", enabled: true },
        { id: "fire", name: "산불", color: "#DC3C1E", unit: "발생수", enabled: true },
        { id: "snow", name: "폭설", color: "#C9CBCF", unit: "cm", enabled: true },
        { id: "cold", name: "한파", color: "#36A2EB", unit: "℃", enabled: true },
        { id: "heat", name: "폭염", color: "#FF6384", unit: "℃", enabled: true },
    ]);

    // localStorage에서 불러오기
    useEffect(() => {
        const saved = localStorage.getItem('graphLegends');
        if (saved) {
            try {
                setLegends(JSON.parse(saved));
            } catch (error) {
                console.error("범례 데이터 로드 실패:", error);
            }
        }
    }, []);

    // 범례 저장
    const saveLegends = (newLegends) => {
        const normalized = newLegends.map(l => ({
            ...l,
            color: l.color.toUpperCase()
        }));

        setLegends(normalized);
        localStorage.setItem('graphLegends', JSON.stringify(normalized));
    };

    // 범례 초기화
    const resetLegends = () => {
        const defaultLegends = [
            { id: "wind", name: "강풍", color: "#4BC0C0", unit: "m/s", enabled: true },
            { id: "dust", name: "황사", color: "#DECC96", unit: "㎍/㎥", enabled: true },
            { id: "rain1", name: "장마", color: "#9966FF", unit: "mm", enabled: true },
            { id: "mauntain", name: "산사태", color: "#8B7355", unit: "ha", enabled: true },
            { id: "rain2", name: "호우", color: "#FF9F40", unit: "mm", enabled: true },
            { id: "fire", name: "산불", color: "#DC3C1E", unit: "발생수", enabled: true },
            { id: "snow", name: "폭설", color: "#C9CBCF", unit: "cm", enabled: true },
            { id: "cold", name: "한파", color: "#36A2EB", unit: "℃", enabled: true },
            { id: "heat", name: "폭염", color: "#FF6384", unit: "℃", enabled: true },
        ];
        setLegends(defaultLegends);
        localStorage.setItem('graphLegends', JSON.stringify(defaultLegends));
    };

    const value = {
        legends,
        saveLegends,
        resetLegends
    };

    return (
        <LegendContext.Provider value={value}>
            {children}
        </LegendContext.Provider>
    );
}