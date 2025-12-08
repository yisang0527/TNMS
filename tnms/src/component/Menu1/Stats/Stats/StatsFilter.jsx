// component/Stats/StatsFilter.jsx

import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto"
import { weatherDataByYear } from "../../../../../public/data/weatherData";
import { useLegends } from "../../../Admin/LegendContext"

export default function StatsChart() {
    const { legends } = useLegends();

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
            : hex;
    };

    const tabs = legends
        .filter(l => l.enabled)
        .map(l => ({
            id: l.id,
            name: l.name,
            color: hexToRgb(l.color),
            unit: l.unit
        }));

    const [weatherData, setWeatherData] = useState([]);
    const [selectedTab, setSelectedTab] = useState("wind");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedYear, setSelectedYear] = useState("2020");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        parseWeatherData();
    }, [selectedYear]);

    const parseWeatherData = () => {
        // weatherData.js에서 import한 데이터 사용
        const rawData = weatherDataByYear[selectedYear] || weatherDataByYear["2020"];

        // 줄바꿈으로 분리
        const lines = rawData.trim().split("\n");

        // 객체 변환
        const parsed = lines.map(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length < 50) return null;

            const date = parts[0];
            const month = parseInt(date.substring(4, 6));
            const day = parseInt(date.substring(6, 8));

            const wsMax = parseFloat(parts[5]); // 최대풍속
            const taAvg = parseFloat(parts[10]); // 평균기온
            const rnDay = parseFloat(parts[38]); // 일 강수량
            const rnD99 = parseFloat(parts[39]); // 9-9 강수량
            const rnDur = parseFloat(parts[40]); // 강수계속시간
            const sdMax = parseFloat(parts[49]); // 최심 적설
            const ta10 = parseFloat(parts[parts.length - 1]); // 미세먼지

            const isRain1Season = (month >= 6 && month <= 7);

            return {
                date,
                month,
                day,
                wsMax: wsMax >= 0 ? wsMax : null,
                taAvg: taAvg !== -9.0 ? taAvg : null,
                rnDay: rnDay >= 0 ? rnDay : 0,
                rnD99: rnD99 >= 0 ? rnD99 : 0,
                rnDur: rnDur >= 0 ? rnDur : 0,
                sdMax: sdMax >= 0 ? sdMax : 0,
                ta10: ta10 >= 0 ? ta10 : 0,
                isRain1Season: isRain1Season
            };
        }).filter(item => item !== null);

        setWeatherData(parsed);
        setLoading(false);
    };

    const getLandslideChartData = () => {
        const landslideData = {
            '2020': 1343,
            '2021': 27,
            '2022': 327,
            '2023': 459,
            '2024': 179,
            '2025': 0
        };

        const years = Object.keys(landslideData);
        const values = Object.values(landslideData);

        return {
            labels: years.map(y => y + '년'),
            datasets: [
                {
                    label: '피해물량 (ha)',
                    data: values,
                    backgroundColor: 'rgba(139, 115, 85, 0.8)',
                    borderColor: 'rgb(139, 115, 85)',
                    borderWidth: 2
                }
            ]
        };
    };

    const getFireChartData = () => {
        const fireDataByYear = {
            '2020': [29, 42, 171, 184, 26, 38, 0, 1, 2, 35, 46, 46],
            '2021': [44, 82, 44, 94, 20, 3, 7, 6, 1, 0, 24, 24],
            '2022': [88, 143, 82, 180, 115, 26, 3, 0, 11, 24, 47, 37],
            '2023': [38, 114, 229, 108, 33, 11, 0, 1, 2, 13, 25, 22],
            '2024': [18, 11, 74, 67, 17, 28, 0, 7, 6, 2, 18, 31],
            '2025': [44, 74, 144, 82, 6, 27, 11, 8, 1, 0, 26, 0]
        };

        const monthlyData = fireDataByYear[selectedYear] || fireDataByYear['2020'];
        const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        return {
            labels: months,
            datasets: [
                {
                    label: '산불 발생 건수',
                    data: monthlyData,
                    backgroundColor: 'rgba(220, 60, 30, 0.8)',
                    borderColor: 'rgb(220, 60, 30)',
                    borderWidth: 2
                }
            ]
        };
    };

    const getChartData = () => {
        const currentTab = tabs.find(t => t.id === selectedTab);

        if (selectedTab === "mauntain") {
            return getLandslideChartData();
        }

        if (selectedTab === "fire") {
            return getFireChartData();
        }

        const filteredData = selectedMonth === "all"
            ? weatherData
            : weatherData.filter(d => d.month === parseInt(selectedMonth));

        let data, warningData, label;

        switch (selectedTab) {
            case "cold":
                data = filteredData.map(d => d.taAvg);
                warningData = filteredData.map(d => (d.taAvg !== null && d.taAvg <= -10) ? d.taAvg : null);
                label = "평균기온";
                break;
            case "heat":
                data = filteredData.map(d => d.taAvg);
                warningData = filteredData.map(d => (d.taAvg !== null && d.taAvg >= 30) ? d.taAvg : null);
                label = "평균기온";
                break;
            case "wind":
                data = filteredData.map(d => d.wsMax);
                warningData = filteredData.map(d => (d.wsMax !== null && d.wsMax >= 14) ? d.wsMax : null);
                label = "최대풍속";
                break;
            case "rain1":
                data = filteredData.map(d => d.rnDay);
                warningData = filteredData.map(d => (d.isRain1Season && d.rnDay >= 50) ? d.rnDay : null);
                label = "일 강수량";
                break;
            case "rain2":
                data = filteredData.map(d => d.rnDay);
                warningData = filteredData.map(d => (d.rnDay >= 80) ? d.rnDay : null);
                label = "일 강수량";
                break;
            case "snow":
                data = filteredData.map(d => d.sdMax);
                warningData = filteredData.map(d => (d.sdMax >= 5) ? d.sdMax : null);
                label = "적설량";
                break;
            case "dust":
                data = filteredData.map(d => d.ta10);
                warningData = filteredData.map(d => (d.ta10 >= 500) ? d.ta10 : null);
                label = "미세먼지";
                break;
            default:
                data = filteredData.map(d => d.taAvg);
                warningData = filteredData.map(d => null)
                label = "평균기온";
        }

        return {
            labels: filteredData.map(d => `${d.month}/${d.day}`),
            datasets: [
                {
                    label: label,
                    data: data,
                    borderColor: currentTab.color,
                    backgroundColor: currentTab.color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
                    pointBackgroundColor: currentTab.color,
                    pointBorderColor: currentTab.color,
                    tension: 0.1,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: currentTab.color,
                    pointBorderWidth: 1,
                    pointHoverBorderWidth: 2,
                    pointHoverBorderColor: '#fff',
                    order: 2
                },
                {
                    label: '경보 발생',
                    data: warningData,
                    borderColor: 'transparent',
                    backgroundColor: 'rgb(255, 0, 0)',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: 'rgb(255, 0, 0)',
                    pointBorderWidth: 2,
                    pointBorderColor: '#fff',
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: '#fff',
                    showLine: false,
                    order: 1
                }
            ]
        };
    };

    const getYAxisLabel = () => {
        const currentTab = tabs.find(t => t.id === selectedTab);
        return currentTab ? currentTab.unit : "";
    };

    const getFireStatistics = () => {
        const fireDataByYear = {
            '2020': [29, 42, 171, 184, 26, 38, 0, 1, 2, 35, 46, 46],
            '2021': [44, 82, 44, 94, 20, 3, 7, 6, 1, 0, 24, 24],
            '2022': [88, 143, 82, 180, 115, 26, 3, 0, 11, 24, 47, 37],
            '2023': [38, 114, 229, 108, 33, 11, 0, 1, 2, 13, 25, 22],
            '2024': [18, 11, 74, 67, 17, 28, 0, 7, 6, 2, 18, 31],
            '2025': [44, 74, 144, 82, 6, 27, 11, 8, 1, 0, 26, 0]
        };

        const monthlyData = fireDataByYear[selectedYear] || fireDataByYear['2020'];
        const values = monthlyData.filter(v => v > 0);
        const max = Math.max(...monthlyData);
        const min = Math.min(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const total = monthlyData.reduce((a, b) => a + b, 0);

        return {
            max: max.toFixed(0),
            min: min.toFixed(0),
            avg: avg.toFixed(1),
            total: total.toFixed(0),
            monthCount: 12
        };
    };

    const getLandslideStatistics = () => {
        const landslideData = {
            '2020': 1343,
            '2021': 27,
            '2022': 327,
            '2023': 459,
            '2024': 179,
            '2025': 0
        };

        const values = Object.values(landslideData).filter(v => v > 0);
        const max = Math.max(...Object.values(landslideData));
        const min = Math.min(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const total = Object.values(landslideData).reduce((a, b) => a + b, 0);

        return {
            max: max.toFixed(0),
            min: min.toFixed(0),
            avg: avg.toFixed(0),
            total: total.toFixed(0),
            yearCount: 6
        };
    };

    const getStatistics = () => {
        if (selectedTab === "mauntain") {
            return getLandslideStatistics();
        }

        if (selectedTab === "fire") {
            return getFireStatistics();
        }

        const filteredData = selectedMonth === "all"
            ? weatherData
            : weatherData.filter(d => d.month === parseInt(selectedMonth));

        let values = [];
        let warningCount = 0;
        let warningThreshold = "";

        switch (selectedTab) {
            case "cold":
                values = filteredData.map(d => d.taAvg).filter(v => v !== null);
                warningCount = values.filter(v => v <= -10).length;
                warningThreshold = "-10℃ 이하";
                break;
            case "heat":
                values = filteredData.map(d => d.taAvg).filter(v => v !== null);
                warningCount = values.filter(v => v >= 30).length;
                warningThreshold = "30℃ 이상";
                break;
            case "wind":
                values = filteredData.map(d => d.wsMax).filter(v => v !== null);
                warningCount = values.filter(v => v >= 14).length;
                warningThreshold = "14m/s 이상";
                break;
            case "rain1":
                values = filteredData.map(d => d.rnDay).filter(v => v > 0);
                warningCount = filteredData.filter(d => d.isRain1Season && d.rnDay >= 50).length;
                warningThreshold = "50mm 이상 (6~7월)";
                break;
            case "rain2":
                values = filteredData.map(d => d.rnDay).filter(v => v > 0);
                warningCount = values.filter(v => v >= 80).length;
                warningThreshold = "80mm 이상";
                break;
            case "snow":
                values = filteredData.map(d => d.sdMax).filter(v => v > 0);
                warningCount = values.filter(v => v >= 5).length;
                warningThreshold = "5cm 이상";
                break;
            case "dust":
                values = filteredData.map(d => d.ta10).filter(v => v > 0);
                warningCount = values.filter(v => v >= 500).length;
                warningThreshold = "500㎍/m3 이상";
                break;
        }

        if (values.length === 0) {
            return { max: 0, min: 0, avg: 0, warningCount: 0, warningThreshold, totalDays: 0 };
        }

        const max = Math.max(...values);
        const min = Math.min(...values);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        return {
            max: max.toFixed(1),
            min: min.toFixed(1),
            avg: avg.toFixed(1),
            warningCount,
            warningThreshold,
            totalDays: filteredData.length
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    filter: function (legendItem, chartData) {
                        if (legendItem.text === "경보 발생") {
                            const warningDataset = chartData.datasets[1];
                            const hasWarningData = warningDataset.data.some(val => val !== null);
                            return hasWarningData;
                        }
                        return true;
                    }
                }
            },
            title: {
                display: true,
                text: selectedTab === "mauntain"
                    ? `2020~2025년 산사태 피해물량 (연도별)`
                    : selectedTab === "fire"
                        ? `${selectedYear}년 산불 발생 건수 (월별)`
                        : `${selectedYear}년 ${tabs.find(t => t.id === selectedTab)?.name} 데이터${selectedMonth !== "all" ? ` (${selectedMonth}월)` : ""}`,
                font: {
                    size: 18
                }
            }
        },
        scales: selectedTab === "mauntain" ? {
            y: {
                title: {
                    display: true,
                    text: getYAxisLabel()
                },
                beginAtZero: true
            }
        } : selectedTab === "fire" ? {
            y: {
                title: {
                    display: true,
                    text: getYAxisLabel()
                },
                beginAtZero: true
            }
        } : {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    callback: function (value, index) {
                        const label = this.getLabelForValue(value);
                        if (selectedMonth === 'all') {
                            if (label.endsWith('/1')) {
                                return label.split('/')[0] + '월';
                            }
                        } else {
                            const day = parseInt(label.split("/")[1]);
                            if (day === 1 || day % 5 === 0) {
                                return day + "일"
                            }
                        }
                        return "";
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: getYAxisLabel()
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">데이터 가져오는 중...</div>
            </div>
        );
    }

    const stats = getStatistics();
    const currentTab = tabs.find(t => t.id === selectedTab);
    const unit = currentTab ? currentTab.unit : "";

    return (
        <div className="w-full h-screen p-8 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {selectedTab === "mauntain" ? "산사태 피해물량 통계" : selectedTab === "fire" ? `${selectedYear}년 산불 발생 통계` : `${selectedYear}년 데이터`}
                    </h2>

                    {selectedTab !== "mauntain" && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-gray-700 font-medium">연도:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="2020">2020년</option>
                                    <option value="2021">2021년</option>
                                    <option value="2022">2022년</option>
                                    <option value="2023">2023년</option>
                                    <option value="2024">2024년</option>
                                    <option value="2025">2025년</option>
                                </select>
                            </div>

                            {selectedTab !== "fire" && (
                                <div className="flex items-center gap-2">
                                    <label className="text-gray-700 font-medium">기간:</label>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">전체</option>
                                        <option value="1">1월</option>
                                        <option value="2">2월</option>
                                        <option value="3">3월</option>
                                        <option value="4">4월</option>
                                        <option value="5">5월</option>
                                        <option value="6">6월</option>
                                        <option value="7">7월</option>
                                        <option value="8">8월</option>
                                        <option value="9">9월</option>
                                        <option value="10">10월</option>
                                        <option value="11">11월</option>
                                        <option value="12">12월</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-2 mb-6 border-b overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${selectedTab === tab.id
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                <div className="flex-1 mb-4">
                    {selectedTab === "mauntain" || selectedTab === "fire" ? (
                        <Bar data={getChartData()} options={options} />
                    ) : (
                        <Line data={getChartData()} options={options} />
                    )}
                </div>

                {selectedTab === "mauntain" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">분석 기간</div>
                            <div className="text-xl font-bold text-gray-800">2020~2025년 ({stats.yearCount}년)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">최대 피해</div>
                            <div className="text-xl font-bold text-red-600">{stats.max} ha</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">평균 피해</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} ha</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">총 피해물량</div>
                            <div className="text-xl font-bold text-orange-600">{stats.total} ha</div>
                        </div>
                    </div>
                ) : selectedTab === "fire" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">분석 연도</div>
                            <div className="text-xl font-bold text-gray-800">{selectedYear}년</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">최다 발생 (월)</div>
                            <div className="text-xl font-bold text-red-600">{stats.max} 건</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">월평균 발생</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} 건</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">연간 총 발생</div>
                            <div className="text-xl font-bold text-orange-600">{stats.total} 건</div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                            <div className="text-sm text-gray-600">분석 기간</div>
                            <div className="text-xl font-bold text-gray-800">{stats.totalDays}일</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">최댓값</div>
                            <div className="text-xl font-bold text-blue-600">{stats.max} {unit}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">최솟값</div>
                            <div className="text-xl font-bold text-green-600">{stats.min} {unit}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">평균값</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} {unit}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">경보 발생 ({stats.warningThreshold})</div>
                            <div className="text-xl font-bold text-red-600">{stats.warningCount}일</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}