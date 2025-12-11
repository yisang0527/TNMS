//component/AdminGraph.jsx

import { useState } from "react";
import { useLegends } from "./LegendContext";

export default function AdminGraph() {
    const { legends, saveLegends, resetLegends } = useLegends();

    const [editingId, setEditingId] = useState(null);
    const [tempValues, setTempValues] = useState({});

    // 수정 시작
    const handleEdit = (legend) => {
        setEditingId(legend.id);
        setTempValues({
            name: legend.name,
            color: legend.color,
            unit: legend.unit,
        });
    };

    // 수정 저장
    const handleSave = (id) => {
        const normalized = {
            ...tempValues,
            color: tempValues.color.toUpperCase(),
        };

        const newLegends = legends.map(legend =>
            legend.id === id
                ? { ...legend, ...normalized }
                : legend
        );

        saveLegends(newLegends);

        setEditingId(null);
        setTempValues({});
    };

    // 수정 취소
    const handleCancel = () => {
        setEditingId(null);
        setTempValues({});
    };

    // 토글 활성화/비활성화
    const handleToggle = (id) => {
        const newLegends = legends.map(legend =>
            legend.id === id
                ? { ...legend, enabled: !legend.enabled }
                : legend
        );
        saveLegends(newLegends);
    };

    // 초기화
    const handleReset = () => {
        if (confirm("모든 설정을 초기값으로 되돌리시겠습니까?")) {
            resetLegends();
            alert("초기화되었습니다!");
        }
    };

    // 저장
    const handleSaveAll = () => {
        alert("설정이 저장되었습니다!");
    };

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">그래프 범례 관리</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            초기화
                        </button>
                        <button
                            onClick={handleSaveAll}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            저장 완료
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {legends.map((legend) => (
                        <div
                            key={legend.id}
                            className={`p-4 border rounded-lg transition-all ${legend.enabled ? "bg-white" : "bg-gray-100"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    {/* 활성화 토글 */}
                                    <button
                                        onClick={() => handleToggle(legend.id)}
                                        className={`w-12 h-6 rounded-full transition-colors ${legend.enabled ? "bg-blue-500" : "bg-gray-300"
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full transition-transform ${legend.enabled ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>

                                    {editingId === legend.id ? (
                                        // 수정 모드
                                        <div className="flex items-center gap-3 flex-1">
                                            <input
                                                type="text"
                                                value={tempValues.name}
                                                onChange={(e) => setTempValues({ ...tempValues, name: e.target.value })}
                                                className="px-3 py-2 border rounded w-28"
                                                placeholder="이름"
                                            />
                                            <input
                                                type="color"
                                                value={tempValues.color}
                                                onChange={(e) => {
                                                    const newColor = e.target.value.toUpperCase();
                                                    setTempValues({ ...tempValues, color: newColor });

                                                    const newLegends = legends.map(l =>
                                                        l.id === editingId ? { ...l, color: newColor } : l
                                                    );
                                                    saveLegends(newLegends); // 즉시 legends 상태 반영
                                                }}
                                            />
                                            <input
                                                type="text"
                                                value={tempValues.unit}
                                                onChange={(e) => setTempValues({ ...tempValues, unit: e.target.value })}
                                                className="px-3 py-2 border rounded w-20"
                                                placeholder="단위"
                                            />
                                        </div>
                                    ) : (
                                        // 보기 모드
                                        <div className="flex items-center gap-3 flex-1">
                                            <div
                                                className="w-10 h-10 rounded border-2"
                                                style={{ backgroundColor: legend.color }}
                                            />
                                            <div className="font-semibold text-lg">{legend.name}</div>
                                            <div className="text-sm text-gray-500">({legend.unit})</div>
                                            <div className="text-xs text-gray-400">{legend.color}</div>
                                        </div>
                                    )}
                                </div>

                                {/* 버튼 */}
                                <div className="flex gap-2">
                                    {editingId === legend.id ? (
                                        <>
                                            <button
                                                onClick={() => handleSave(legend.id)}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                저장
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            >
                                                취소
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(legend)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            disabled={!legend.enabled}
                                        >
                                            수정
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 미리보기 */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">범례 미리보기</h3>
                    <div className="flex flex-wrap gap-4">
                        {legends
                            .filter(l => l.enabled)
                            .map((legend) => (
                                <div key={legend.id} className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded border"
                                        style={{ backgroundColor: legend.color }}
                                    />
                                    <span className="font-medium">{legend.name}</span>
                                    <span className="text-sm text-gray-500">({legend.unit})</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}