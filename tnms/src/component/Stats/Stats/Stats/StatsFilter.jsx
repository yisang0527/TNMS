import { useState, useEffect, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto"
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import { weatherDataByYear } from "../../../../../public/data/weatherData";
import { useLegends } from "../../../Admin/LegendContext"

// Zoom 플러그인 등록
Chart.register(zoomPlugin);

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
    const [viewMode, setViewMode] = useState("summary"); // "summary" or "detailed"
    const [displayMode, setDisplayMode] = useState("chart"); // "chart" or "table"
    const [chartRef, setChartRef] = useState(null);

    useEffect(() => {
        parseWeatherData();
    }, [selectedYear]);

    const parseWeatherData = () => {
        const rawData = weatherDataByYear[selectedYear] || weatherDataByYear["2020"];
        const lines = rawData.trim().split("\n");

        const parsed = lines.map(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length < 50) return null;

            const date = parts[0];
            const month = parseInt(date.substring(4, 6));
            const day = parseInt(date.substring(6, 8));

            const wsMax = parseFloat(parts[5]);
            const taAvg = parseFloat(parts[10]);
            const rnDay = parseFloat(parts[38]);
            const rnD99 = parseFloat(parts[39]);
            const rnDur = parseFloat(parts[40]);
            const sdMax = parseFloat(parts[49]);
            const ta10 = parseFloat(parts[parts.length - 1]);

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

    // 데이터 집계 함수 (요약 모드용)
    const aggregateData = (data, field) => {
        if (selectedMonth !== "all" || viewMode === "detailed") {
            return data;
        }

        // 주간 평균으로 집계
        const weeklyData = [];
        for (let i = 0; i < data.length; i += 7) {
            const weekData = data.slice(i, i + 7);
            const values = weekData.map(d => d[field]).filter(v => v !== null && v !== 0);
            
            if (values.length > 0) {
                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                weeklyData.push({
                    ...weekData[0],
                    [field]: avg,
                    isWeekly: true,
                    weekStart: weekData[0].day,
                    weekEnd: weekData[weekData.length - 1].day
                });
            }
        }
        return weeklyData;
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
                    backgroundColor: values.map(v => {
                        if (v > 1000) return 'rgba(220, 38, 38, 0.8)';
                        if (v > 300) return 'rgba(251, 146, 60, 0.8)';
                        if (v > 100) return 'rgba(250, 204, 21, 0.8)';
                        return 'rgba(34, 197, 94, 0.8)';
                    }),
                    borderColor: values.map(v => {
                        if (v > 1000) return 'rgb(220, 38, 38)';
                        if (v > 300) return 'rgb(251, 146, 60)';
                        if (v > 100) return 'rgb(250, 204, 21)';
                        return 'rgb(34, 197, 94)';
                    }),
                    borderWidth: 2,
                    borderRadius: 6,
                    hoverBackgroundColor: values.map(v => {
                        if (v > 1000) return 'rgba(220, 38, 38, 1)';
                        if (v > 300) return 'rgba(251, 146, 60, 1)';
                        if (v > 100) return 'rgba(250, 204, 21, 1)';
                        return 'rgba(34, 197, 94, 1)';
                    }),
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
        const maxValue = Math.max(...monthlyData);

        return {
            labels: months,
            datasets: [
                {
                    label: '산불 발생 건수',
                    data: monthlyData,
                    backgroundColor: monthlyData.map(v => {
                        const intensity = v / maxValue;
                        if (intensity > 0.7) return 'rgba(220, 38, 38, 0.85)';
                        if (intensity > 0.4) return 'rgba(251, 146, 60, 0.85)';
                        if (intensity > 0.2) return 'rgba(250, 204, 21, 0.85)';
                        return 'rgba(203, 213, 225, 0.85)';
                    }),
                    borderColor: monthlyData.map(v => {
                        const intensity = v / maxValue;
                        if (intensity > 0.7) return 'rgb(220, 38, 38)';
                        if (intensity > 0.4) return 'rgb(251, 146, 60)';
                        if (intensity > 0.2) return 'rgb(250, 204, 21)';
                        return 'rgb(148, 163, 184)';
                    }),
                    borderWidth: 2,
                    borderRadius: 6,
                    hoverBackgroundColor: monthlyData.map(v => {
                        const intensity = v / maxValue;
                        if (intensity > 0.7) return 'rgba(220, 38, 38, 1)';
                        if (intensity > 0.4) return 'rgba(251, 146, 60, 1)';
                        if (intensity > 0.2) return 'rgba(250, 204, 21, 1)';
                        return 'rgba(203, 213, 225, 1)';
                    }),
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

        let data, warningData, label, field;

        switch (selectedTab) {
            case "cold":
                field = "taAvg";
                data = aggregateData(filteredData, field).map(d => d.taAvg);
                warningData = filteredData.map(d => (d.taAvg !== null && d.taAvg <= -10) ? d.taAvg : null);
                label = "평균기온";
                break;
            case "heat":
                field = "taAvg";
                data = aggregateData(filteredData, field).map(d => d.taAvg);
                warningData = filteredData.map(d => (d.taAvg !== null && d.taAvg >= 30) ? d.taAvg : null);
                label = "평균기온";
                break;
            case "wind":
                field = "wsMax";
                data = aggregateData(filteredData, field).map(d => d.wsMax);
                warningData = filteredData.map(d => (d.wsMax !== null && d.wsMax >= 14) ? d.wsMax : null);
                label = "최대풍속";
                break;
            case "rain1":
                field = "rnDay";
                data = aggregateData(filteredData, field).map(d => d.rnDay);
                warningData = filteredData.map(d => (d.isRain1Season && d.rnDay >= 50) ? d.rnDay : null);
                label = "일 강수량";
                break;
            case "rain2":
                field = "rnDay";
                data = aggregateData(filteredData, field).map(d => d.rnDay);
                warningData = filteredData.map(d => (d.rnDay >= 80) ? d.rnDay : null);
                label = "일 강수량";
                break;
            case "snow":
                field = "sdMax";
                data = aggregateData(filteredData, field).map(d => d.sdMax);
                warningData = filteredData.map(d => (d.sdMax >= 5) ? d.sdMax : null);
                label = "적설량";
                break;
            case "dust":
                field = "ta10";
                data = aggregateData(filteredData, field).map(d => d.ta10);
                warningData = filteredData.map(d => (d.ta10 >= 200) ? d.ta10 : null);
                label = "미세먼지";
                break;
            default:
                field = "taAvg";
                data = aggregateData(filteredData, field).map(d => d.taAvg);
                warningData = filteredData.map(() => null)
                label = "평균기온";
        }

        const aggregatedData = aggregateData(filteredData, field);

        return {
            labels: aggregatedData.map(d => {
                if (d.isWeekly && selectedMonth === "all" && viewMode === "summary") {
                    return `${d.month}/${d.weekStart}-${d.weekEnd}`;
                }
                return `${d.month}/${d.day}`;
            }),
            datasets: [
                {
                    label: label,
                    data: data,
                    borderColor: currentTab.color,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        const baseColor = currentTab.color;
                        gradient.addColorStop(0, baseColor.replace('rgb', 'rgba').replace(')', ', 0.4)'));
                        gradient.addColorStop(1, baseColor.replace('rgb', 'rgba').replace(')', ', 0.05)'));
                        return gradient;
                    },
                    fill: true,
                    pointBackgroundColor: currentTab.color,
                    pointBorderColor: '#fff',
                    tension: 0.4,
                    pointRadius: viewMode === "summary" && selectedMonth === "all" ? 4 : 2,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: currentTab.color,
                    pointBorderWidth: 2,
                    pointHoverBorderWidth: 3,
                    pointHoverBorderColor: '#fff',
                    borderWidth: 2.5,
                    order: 2
                },
                {
                    label: '경보 발생',
                    data: viewMode === "detailed" || selectedMonth !== "all" ? warningData : [],
                    borderColor: 'transparent',
                    backgroundColor: 'rgb(239, 68, 68)',
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: 'rgb(220, 38, 38)',
                    pointBorderWidth: 3,
                    pointBorderColor: '#fff',
                    pointHoverBorderWidth: 4,
                    pointHoverBorderColor: '#fff',
                    pointStyle: 'triangle',
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
                warningCount = values.filter(v => v >= 200).length;
                warningThreshold = "200㎍/m3 이상";
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
            avg: avg.toFixed(0),
            warningCount,
            warningThreshold,
            totalDays: filteredData.length
        };
    };

    const chartData = useMemo(() => getChartData(), [weatherData, selectedTab, selectedMonth, selectedYear, viewMode]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 750,
            easing: 'easeInOutQuart'
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                        speed: 0.1,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            },
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 13,
                        weight: '500'
                    },
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
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    bottom: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toFixed(1);
                            const unit = getYAxisLabel();
                            if (unit) label += ' ' + unit;
                        }
                        return label;
                    }
                }
            }
        },
        scales: selectedTab === "mauntain" ? {
            y: {
                title: {
                    display: true,
                    text: getYAxisLabel(),
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            }
        } : selectedTab === "fire" ? {
            y: {
                title: {
                    display: true,
                    text: getYAxisLabel(),
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            }
        } : {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.03)',
                    drawBorder: false
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: viewMode === "summary" && selectedMonth === "all" ? 12 : 30,
                    maxRotation: 0,
                    font: {
                        size: 11
                    },
                    callback: function (value) {
                        const label = this.getLabelForValue(value);
                        if (selectedMonth === 'all') {
                            if (viewMode === "summary") {
                                // 요약 모드에서는 월 단위만 표시
                                if (label.includes('-')) {
                                    return label.split('/')[0] + '월';
                                }
                            } else {
                                // 상세 모드
                                if (label.endsWith('/1')) {
                                    return label.split('/')[0] + '월';
                                }
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
                    text: getYAxisLabel(),
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    }), [selectedTab, selectedMonth, selectedYear, viewMode]);

    const handleResetZoom = () => {
        if (chartRef) {
            chartRef.resetZoom();
        }
    };

    // 테이블 데이터 생성
    const getTableData = () => {
        if (selectedTab === "mauntain" || selectedTab === "fire") {
            return [];
        }

        const filteredData = selectedMonth === "all"
            ? weatherData
            : weatherData.filter(d => d.month === parseInt(selectedMonth));

        let field, threshold, checkCondition;

        switch (selectedTab) {
            case "cold":
                field = "taAvg";
                threshold = "-10℃ 이하";
                checkCondition = (v) => v <= -10;
                break;
            case "heat":
                field = "taAvg";
                threshold = "30℃ 이상";
                checkCondition = (v) => v >= 30;
                break;
            case "wind":
                field = "wsMax";
                threshold = "14m/s 이상";
                checkCondition = (v) => v >= 14;
                break;
            case "rain1":
                field = "rnDay";
                threshold = "50mm 이상 (6~7월)";
                checkCondition = (v, d) => d.isRain1Season && v >= 50;
                break;
            case "rain2":
                field = "rnDay";
                threshold = "80mm 이상";
                checkCondition = (v) => v >= 80;
                break;
            case "snow":
                field = "sdMax";
                threshold = "5cm 이상";
                checkCondition = (v) => v >= 5;
                break;
            case "dust":
                field = "ta10";
                threshold = "200㎍/m3 이상";
                checkCondition = (v) => v >= 200;
                break;
            default:
                field = "taAvg";
                threshold = "";
                checkCondition = () => false;
        }

        return filteredData.map(d => ({
            date: `${selectedYear}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`,
            value: d[field] !== null ? d[field].toFixed(1) : '-',
            isWarning: d[field] !== null && checkCondition(d[field], d),
            threshold
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <div className="text-xl text-gray-700">데이터 가져오는 중...</div>
                </div>
            </div>
        );
    }

    const stats = getStatistics();
    const currentTab = tabs.find(t => t.id === selectedTab);
    const unit = currentTab ? currentTab.unit : "";
    const tableData = getTableData();

    return (
        <div className="w-full max-w-[1600px] mx-auto h-screen p-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col border border-gray-100">
                <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="inline-block w-1 h-8 bg-blue-600 rounded-full"></span>
                        {selectedTab === "mauntain" ? "산사태 피해물량 통계" : selectedTab === "fire" ? `${selectedYear}년 산불 발생 통계` : `${selectedYear}년 데이터`}
                    </h2>

                    <div className="flex items-center gap-3 flex-wrap">
                        {/* 그래프/테이블 토글 */}
                        {selectedTab !== "mauntain" && selectedTab !== "fire" && (
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setDisplayMode("chart")}
                                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                                        displayMode === "chart"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    📊 그래프
                                </button>
                                <button
                                    onClick={() => setDisplayMode("table")}
                                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                                        displayMode === "table"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    📋 테이블
                                </button>
                            </div>
                        )}

                        {/* 요약/상세 토글 (차트 모드에서만) */}
                        {selectedTab !== "mauntain" && selectedTab !== "fire" && displayMode === "chart" && selectedMonth === "all" && (
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("summary")}
                                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                                        viewMode === "summary"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    ⚡ 요약
                                </button>
                                <button
                                    onClick={() => setViewMode("detailed")}
                                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                                        viewMode === "detailed"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    🔍 상세
                                </button>
                            </div>
                        )}

                        {selectedTab !== "mauntain" && (
                            <div className="flex items-center gap-2">
                                <label className="text-gray-700 font-medium">연도:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-400 transition-colors cursor-pointer"
                                >
                                    <option value="2020">2020년</option>
                                    <option value="2021">2021년</option>
                                    <option value="2022">2022년</option>
                                    <option value="2023">2023년</option>
                                    <option value="2024">2024년</option>
                                    <option value="2025">2025년</option>
                                </select>
                            </div>
                        )}

                        {selectedTab !== "fire" && selectedTab !== "mauntain" && (
                            <div className="flex items-center gap-2">
                                <label className="text-gray-700 font-medium">기간:</label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-400 transition-colors cursor-pointer"
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
                </div>

                <div className="flex gap-2 mb-6 border-b overflow-x-auto pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-6 py-3 font-medium transition-all whitespace-nowrap rounded-t-lg ${selectedTab === tab.id
                                ? "border-b-3 border-blue-500 text-blue-600 bg-blue-50"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {displayMode === "chart" ? (
                    <>
                        {/* 줌/팬 안내 및 리셋 버튼 */}
                        {selectedTab !== "mauntain" && selectedTab !== "fire" && (
                            <div className="mb-3 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                                <div className="flex items-center gap-4 text-sm text-blue-700">
                                    <span>💡 <strong>마우스 휠</strong>로 확대/축소</span>
                                    <span>👆 <strong>Ctrl + 드래그</strong>로 이동</span>
                                </div>
                                <button
                                    onClick={handleResetZoom}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    🔄 초기화
                                </button>
                            </div>
                        )}

                        <div className="flex-1 mb-4 bg-gradient-to-b from-white to-gray-50 rounded-lg p-4 border border-gray-100">
                            {selectedTab === "mauntain" || selectedTab === "fire" ? (
                                <Bar data={chartData} options={options} />
                            ) : (
                                <Line 
                                    ref={(ref) => setChartRef(ref)} 
                                    data={chartData} 
                                    options={options} 
                                />
                            )}
                        </div>
                    </>
                ) : (
                    /* 테이블 뷰 */
                    <div className="flex-1 mb-4 overflow-auto">
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                날짜
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                측정값
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                상태
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tableData.map((row, index) => (
                                            <tr 
                                                key={index} 
                                                className={`hover:bg-gray-50 transition-colors ${
                                                    row.isWarning ? 'bg-red-50' : ''
                                                }`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {row.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`font-medium ${row.isWarning ? 'text-red-600' : 'text-gray-900'}`}>
                                                        {row.value} {unit}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {row.isWarning ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            ⚠️ 경보 ({row.threshold})
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            ✓ 정상
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {tableData.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    표시할 데이터가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {selectedTab === "mauntain" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                        <div className="text-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">분석 기간</div>
                            <div className="text-xl font-bold text-gray-800">2020~2025년</div>
                            <div className="text-xs text-gray-500 mt-1">({stats.yearCount}년)</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-50 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">최대 피해</div>
                            <div className="text-xl font-bold text-red-600">{stats.max} ha</div>
                            <div className="text-xs text-red-500 mt-1">2020년</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-purple-50 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">평균 피해</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} ha</div>
                            <div className="text-xs text-purple-500 mt-1">연평균</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-50 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">총 피해물량</div>
                            <div className="text-xl font-bold text-orange-600">{stats.total} ha</div>
                            <div className="text-xs text-orange-500 mt-1">누적</div>
                        </div>
                    </div>
                ) : selectedTab === "fire" ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                        <div className="text-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">분석 연도</div>
                            <div className="text-xl font-bold text-gray-800">{selectedYear}년</div>
                            <div className="text-xs text-gray-500 mt-1">12개월</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-50 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">최다 발생 (월)</div>
                            <div className="text-xl font-bold text-red-600">{stats.max} 건</div>
                            <div className="text-xs text-red-500 mt-1">월간 최대</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-purple-50 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">월평균 발생</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} 건</div>
                            <div className="text-xs text-purple-500 mt-1">평균</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-orange-50 shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">연간 총 발생</div>
                            <div className="text-xl font-bold text-orange-600">{stats.total} 건</div>
                            <div className="text-xs text-orange-500 mt-1">누적</div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                        <div className="text-center p-3 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">분석 기간</div>
                            <div className="text-xl font-bold text-gray-800">{stats.totalDays}일</div>
                            <div className="text-xs text-gray-500 mt-1">{selectedMonth === "all" ? "연간" : `${selectedMonth}월`}</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-blue-50 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">최댓값</div>
                            <div className="text-xl font-bold text-blue-600">{stats.max} {unit}</div>
                            <div className="text-xs text-blue-500 mt-1">최고</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-green-50 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">최솟값</div>
                            <div className="text-xl font-bold text-green-600">{stats.min} {unit}</div>
                            <div className="text-xs text-green-500 mt-1">최저</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-purple-50 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">평균값</div>
                            <div className="text-xl font-bold text-purple-600">{stats.avg} {unit}</div>
                            <div className="text-xs text-purple-500 mt-1">평균</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-50 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <div className="text-sm text-gray-500 mb-1 font-medium">경보 발생</div>
                            <div className="text-xl font-bold text-red-600">{stats.warningCount}일</div>
                            <div className="text-xs text-red-500 mt-1">{stats.warningThreshold}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}