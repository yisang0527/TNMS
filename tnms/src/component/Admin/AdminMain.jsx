import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Edit2, Info } from 'lucide-react';

// 관리자 페이지 컴포넌트
function AdminChartManager() {
  const [chartConfig, setChartConfig] = useState({});
  const [editingRegion, setEditingRegion] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 기본 설정값
  const defaultConfig = {
    서울: { title: '서울 데이터 차트', subtitle: '수도권 중심지' },
    경기도: { title: '경기도 데이터 차트', subtitle: '수도권 광역시' },
    강원도: { title: '강원도 데이터 차트', subtitle: '산악 지역' },
    충청남도: { title: '충청남도 데이터 차트', subtitle: '중부 서해안' },
    충청북도: { title: '충청북도 데이터 차트', subtitle: '중부 내륙' },
    경상남도: { title: '경상남도 데이터 차트', subtitle: '남부 해안' },
    경상북도: { title: '경상북도 데이터 차트', subtitle: '동남부 내륙' },
    전라남도: { title: '전라남도 데이터 차트', subtitle: '남서부 해안' },
    전라북도: { title: '전라북도 데이터 차트', subtitle: '서남부 내륙' },
    제주도: { title: '제주도 데이터 차트', subtitle: '남부 섬 지역' }
  };

  // 초기 설정 로드
  useEffect(() => {
    loadChartConfig();
  }, []);

  const loadChartConfig = () => {
    setIsLoading(true);
    try {
      const saved = localStorage.getItem('chart-config');
      
      if (saved) {
        setChartConfig(JSON.parse(saved));
        console.log('✅ 설정 로드 완료:', JSON.parse(saved));
      } else {
        // 저장된 설정이 없으면 기본값 사용 및 저장
        setChartConfig(defaultConfig);
        localStorage.setItem('chart-config', JSON.stringify(defaultConfig));
        console.log('✅ 기본 설정 저장 완료');
      }
    } catch (error) {
      console.error('❌ 설정 로드 중 오류:', error);
      setChartConfig(defaultConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (region) => {
    setEditingRegion(region);
    setTempValue(chartConfig[region]?.title || '');
  };

  const handleSave = (region) => {
    if (!tempValue.trim()) {
      alert('⚠️ 차트 제목을 입력해주세요.');
      return;
    }

    const newConfig = {
      ...chartConfig,
      [region]: {
        ...chartConfig[region],
        title: tempValue.trim()
      }
    };
    
    setIsSaving(true);
    try {
      localStorage.setItem('chart-config', JSON.stringify(newConfig));
      setChartConfig(newConfig);
      setEditingRegion(null);
      console.log('✅ 저장 완료:', newConfig);
      alert('✅ 저장되었습니다!\n메인 페이지에서 확인해보세요.');
    } catch (error) {
      console.error('❌ 저장 실패:', error);
      alert('❌ 저장에 실패했습니다: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('⚠️ 모든 설정을 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) return;
    
    setIsLoading(true);
    try {
      localStorage.removeItem('chart-config');
      localStorage.setItem('chart-config', JSON.stringify(defaultConfig));
      setChartConfig(defaultConfig);
      console.log('✅ 초기화 완료');
      alert('✅ 초기화되었습니다!');
    } catch (error) {
      console.error('❌ 초기화 실패:', error);
      alert('⚠️ 초기화 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingRegion(null);
    setTempValue('');
  };

  const regions = Object.keys(chartConfig);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              📊 차트 제목 관리
            </h2>
            <p className="text-gray-600 text-sm">
              각 지역별 사이드탭에 표시될 차트 제목을 수정할 수 있습니다
            </p>
          </div>
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 transition-colors"
          >
            <RefreshCw size={18} />
            초기화
          </button>
        </div>
      </div>

      {/* 지역별 설정 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {regions.map((region) => (
          <div
            key={region}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{region}</h3>
                <span className="text-xs text-gray-500">
                  {chartConfig[region]?.subtitle}
                </span>
              </div>
            </div>
            {editingRegion === region ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(region);
                    if (e.key === 'Escape') handleCancel();
                  }}
                  className="w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="차트 제목을 입력하세요"
                  autoFocus
                  maxLength={50}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(region)}
                    disabled={isSaving || !tempValue.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save size={16} />
                    저장
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-700 font-medium truncate">
                    {chartConfig[region]?.title}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(region)}
                  className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors flex-shrink-0"
                >
                  <Edit2 size={16} />
                  수정
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 통계 정보 */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>총 {regions.length}개 지역 관리 중 · localStorage 사용</p>
      </div>
    </div>
  );
}

export default AdminChartManager;