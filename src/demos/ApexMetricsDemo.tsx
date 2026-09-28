import React, { useState } from 'react';
import { AreaChart, BarChart2, TrendingUp, Users, DollarSign, Percent, Calendar, RefreshCw, Layers, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

type Period = '7d' | '30d' | 'today';

interface ChartPoint {
  label: string;
  value: number;
  users: number;
}

export default function ApexMetricsDemo() {
  const [period, setPeriod] = useState<Period>('7d');
  const [activeMetricTab, setActiveMetricTab] = useState<'sales' | 'users'>('sales');

  // Hardcoded rich dynamic datasets to swap on periods
  const dataset7d: ChartPoint[] = [
    { label: 'Thứ 2', value: 34000000, users: 420 },
    { label: 'Thứ 3', value: 45000000, users: 512 },
    { label: 'Thứ 4', value: 28000000, users: 380 },
    { label: 'Thứ 5', value: 51000000, users: 602 },
    { label: 'Thứ 6', value: 64000000, users: 710 },
    { label: 'Thứ Bảy', value: 72000000, users: 840 },
    { label: 'Chủ Nhật', value: 58000000, users: 650 }
  ];

  const dataset30d: ChartPoint[] = [
    { label: 'Tuần 1', value: 124000000, users: 1800 },
    { label: 'Tuần 2', value: 168000000, users: 2420 },
    { label: 'Tuần 3', value: 145000000, users: 2100 },
    { label: 'Tuần 4', value: 198000000, users: 3100 }
  ];

  const datasetToday: ChartPoint[] = [
    { label: '06:00', value: 4500000, users: 82 },
    { label: '09:00', value: 12000000, users: 215 },
    { label: '12:00', value: 18400000, users: 340 },
    { label: '15:00', value: 22100000, users: 412 },
    { label: '18:00', value: 15300000, users: 302 },
    { label: '21:00', value: 9800000, users: 190 }
  ];

  const getDataset = () => {
    switch (period) {
      case '7d': return dataset7d;
      case '30d': return dataset30d;
      case 'today': return datasetToday;
    }
  };

  const getStats = () => {
    switch (period) {
      case '7d':
        return {
          revenue: '352,000,000đ',
          revenueGrowth: '+12.4%',
          users: '4,104',
          userGrowth: '+8.2%',
          conversions: '3.18%',
          conversionGrowth: '+2.1%',
          isGrowth: true
        };
      case '30d':
        return {
          revenue: '635,000,000đ',
          revenueGrowth: '+22.8%',
          users: '9,420',
          userGrowth: '+15.4%',
          conversions: '3.42%',
          conversionGrowth: '+4.5%',
          isGrowth: true
        };
      case 'today':
        return {
          revenue: '82,100,000đ',
          revenueGrowth: '-4.2%',
          users: '1,541',
          userGrowth: '+1.8%',
          conversions: '2.95%',
          conversionGrowth: '-0.3%',
          isGrowth: false
        };
    }
  };

  const stats = getStats();
  const currentData = getDataset();

  // Custom SVG render helpers for Area lines
  const renderSVGGraph = () => {
    const width = 600;
    const height = 240;
    const padding = 40;

    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const values = currentData.map(d => activeMetricTab === 'sales' ? d.value : d.users);
    const maxVal = Math.max(...values) * 1.15 || 100;
    const minVal = 0;

    // Build SVG path strings
    const points = currentData.map((d, i) => {
      const x = padding + (i / (currentData.length - 1)) * graphWidth;
      const val = activeMetricTab === 'sales' ? d.value : d.users;
      const y = height - padding - ((val - minVal) / (maxVal - minVal)) * graphHeight;
      return { x, y, label: d.label, raw: val };
    });

    if (points.length === 0) return null;

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }

    // Build Close Path string to fill with gradient area
    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
          const y = padding + p * graphHeight;
          return (
            <line
              key={idx}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#1e293b"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Filled Area */}
        <path d={areaD} fill="url(#areaGrad)" />

        {/* Main Spline Line */}
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

        {/* Nodes */}
        {points.map((p, idx) => (
          <g key={idx} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#6366f1"
              stroke="#0f172a"
              strokeWidth="2"
              className="hover:r-7 transition-all duration-150"
            />
            {/* Value display overlay on node hover */}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              className="text-[10px] font-mono font-bold fill-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-1 py-0.5 rounded"
            >
              {activeMetricTab === 'sales' ? `${Math.round(p.raw / 1000000)}Tr` : `${p.raw}U`}
            </text>
          </g>
        ))}

        {/* Label names */}
        {points.map((p, idx) => (
          <text
            key={idx}
            x={p.x}
            y={height - 12}
            textAnchor="middle"
            className="text-[10px] font-mono fill-slate-400"
          >
            {p.label}
          </text>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f1f5f9] flex flex-col font-sans">
      
      {/* SaaS inner nav */}
      <nav className="bg-[#0f1423] border-b border-slate-800 py-3.5 px-4 sticky top-0 z-10 text-left">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
              AM
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider block">APEX METRICS</span>
              <span className="text-[9px] font-mono text-[#6366f1] leading-none block">BI SaaS CONTROL PANEL</span>
            </div>
          </div>

          {/* Quick period selectors */}
          <div className="flex bg-[#161c31] border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setPeriod('today')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${period === 'today' ? 'bg-[#2b355e] text-white' : 'text-slate-400'}`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setPeriod('7d')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${period === '7d' ? 'bg-[#2b355e] text-white' : 'text-slate-400'}`}
            >
              7 Ngày
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${period === '30d' ? 'bg-[#2b355e] text-white' : 'text-slate-400'}`}
            >
              30 Ngày
            </button>
          </div>
        </div>
      </nav>

      {/* Main Core */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-6 text-left">
        
        {/* Welcome message */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold font-display text-white">Xin chào, Trình Đánh Giá! 📊</h1>
            <p className="text-xs text-slate-400">Dữ liệu phân tích hiệu suất kinh doanh cập nhật cách đây 3 phút.</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-slate-400">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>MÚI GIỜ: UTC+7 (HỒ CHÍ MINH)</span>
          </div>
        </div>

        {/* Quick core metrics indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Revenue */}
          <div className="bg-[#0f1423] border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">DOANH THU ĐĂNG KÝ (SaaS)</span>
              <DollarSign className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-1.5">{stats.revenue}</div>
            <div className="flex items-center gap-1.5 text-xs mt-3.5">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {stats.revenueGrowth}
              </span>
              <span className="text-slate-500">so với kỳ trước</span>
            </div>
          </div>

          {/* Users */}
          <div className="bg-[#0f1423] border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">NGƯỜI DÙNG KÍCH HOẠT DUY NHẤT</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-1.5">{stats.users}</div>
            <div className="flex items-center gap-1.5 text-xs mt-3.5">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {stats.userGrowth}
              </span>
              <span className="text-slate-500">tỷ lệ tương tác mượt</span>
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-[#0f1423] border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">TỶ LỆ CHUYỂN ĐỔI CHỐT LẬP TỨC</span>
              <Percent className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-1.5">{stats.conversions}</div>
            <div className="flex items-center gap-1.5 text-xs mt-3.5">
              <span className={`font-bold flex items-center gap-0.5 ${stats.isGrowth ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stats.isGrowth ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stats.conversionGrowth}
              </span>
              <span className="text-slate-500">hành động mua/đăng ký</span>
            </div>
          </div>
        </div>

        {/* Chart row & Sidebar details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main SVG Chart container */}
          <div className="lg:col-span-8 bg-[#0f1423] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-white font-mono uppercase tracking-wide">
                  Đồ thị xu hướng biến động dữ liệu
                </h3>
                <p className="text-xs text-slate-400">Nhấp chọn các thẻ dưới để đổi chiều đồ thị phân tích</p>
              </div>

              {/* Toggle metric tabs sales vs users */}
              <div className="flex bg-[#161c31] border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
                <button
                  onClick={() => setActiveMetricTab('sales')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${activeMetricTab === 'sales' ? 'bg-[#5f51fc] text-white' : 'text-slate-400'}`}
                >
                  Doanh Số
                </button>
                <button
                  onClick={() => setActiveMetricTab('users')}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${activeMetricTab === 'users' ? 'bg-[#5f51fc] text-white' : 'text-slate-400'}`}
                >
                  Người Dùng
                </button>
              </div>
            </div>

            {/* Render direct SVG */}
            <div className="w-full bg-[#080b13] p-2.5 rounded-xl border border-slate-900 flex items-center justify-center">
              {renderSVGGraph()}
            </div>
          </div>

          {/* Traffic breakdown & Server diagnostics panels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Traffic sources */}
            <div className="bg-[#0f1423] border border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2.5">
                Nguồn Truy Cập (Traffic)
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Source 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Tìm kiếm tự nhiên (SEO)</span>
                    <span className="font-bold text-white">48%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                {/* Source 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Truy cập trực tiếp (Direct)</span>
                    <span className="font-bold text-white">28%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                {/* Source 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Mạng xã hội (Social Media)</span>
                    <span className="font-bold text-white">16%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>

                {/* Source 4 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-300">Quảng cáo liên kết (Referral)</span>
                    <span className="font-bold text-white">8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud host server speeds */}
            <div className="bg-[#0f1423] border border-slate-800 p-5 rounded-2xl text-xs space-y-3">
              <h3 className="text-xs font-bold font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800 pb-2.5">
                Hiệu Năng Máy Chủ Điện Toán
              </h3>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-2.5 bg-[#12162a] rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-455 font-mono">SERVER LATENCY</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1 font-mono">15ms (Asia)</div>
                </div>
                <div className="p-2.5 bg-[#12162a] rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-455 font-mono">BUILD CACHE TIME</div>
                  <div className="text-sm font-bold text-sky-400 mt-1 font-mono">0.05s (Vite)</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
