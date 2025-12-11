import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaFileAlt,
  FaStar,
  FaDollarSign,
  FaCalendarAlt,
  FaUniversity,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowUp,
  FaArrowDown,
  FaPercent,
  FaDownload,
  FaChartBar,
  FaChartPie,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart,
} from "recharts";

const AnalyticsDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();

  // Fetch basic analytics data
  const {
    data: analyticsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const response = await axiosSecure.get("/analytics");
      return response.data;
    },
  });

  // Fetch chart data
  const { data: chartData } = useQuery({
    queryKey: ["analyticsCharts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/analytics/charts");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  const data = analyticsData || {};
  const charts = chartData || {};

  // Enhanced chart data with gradients
  const applicationsByUniversity = (charts.applicationsByUniversity || []).slice(0, 7);
  const applicationsByCategory = charts.applicationsByCategory || [];

  // Enhanced colors for dark theme
  const CHART_COLORS = {
    primary: {
      blue: "#3B82F6",
      cyan: "#06B6D4",
      green: "#10B981",
      purple: "#8B5CF6",
      yellow: "#F59E0B",
      pink: "#EC4899",
      red: "#EF4444",
      indigo: "#6366F1",
    },
    gradients: {
      blue: ["#3B82F6", "#1D4ED8"],
      green: ["#10B981", "#047857"],
      purple: ["#8B5CF6", "#7C3AED"],
      yellow: ["#F59E0B", "#D97706"],
      cyan: ["#06B6D4", "#0891B2"],
    },
  };

  // Custom tooltip for dark theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-2xl">
          <p className="text-gray-300 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-300">{entry.name}: </span>
              <span className="font-bold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Statistics Cards with improved design
  const statCards = [
    {
      title: "Total Users",
      value: data.users || 0,
      icon: <FaUsers className="text-3xl" />,
      color: "from-blue-600/20 to-blue-800/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-700/30",
      trend: "+12%",
      trendColor: "text-green-400",
    },
    {
      title: "Total Fees Collected",
      value: `$${data.totalFees?.toLocaleString() || "0"}`,
      icon: <FaDollarSign className="text-3xl" />,
      color: "from-green-600/20 to-green-800/20",
      iconColor: "text-green-400",
      borderColor: "border-green-700/30",
      trend: "+18%",
      trendColor: "text-green-400",
    },
    {
      title: "Total Scholarships",
      value: data.scholarships || 0,
      icon: <FaGraduationCap className="text-3xl" />,
      color: "from-purple-600/20 to-purple-800/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-700/30",
      trend: "+5%",
      trendColor: "text-green-400",
    },
    {
      title: "Total Applications",
      value: data.application || 0,
      icon: <FaFileAlt className="text-3xl" />,
      color: "from-yellow-600/20 to-yellow-800/20",
      iconColor: "text-yellow-400",
      borderColor: "border-yellow-700/30",
      trend: "+15%",
      trendColor: "text-green-400",
    },
  ];

  // Radial chart data for completion rate
  const radialData = [
    {
      name: "Completion",
      value: 78,
      fill: CHART_COLORS.gradients.blue[0],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl">
                  <FaChartLine className="text-white text-2xl" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="text-gray-300">Visual insights and performance metrics</p>
              </div>
            </div>

            <button
              onClick={() => refetch()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-blue-300 border border-blue-700/30 hover:bg-blue-900/30 hover:border-blue-600/50 transition-all duration-300 flex items-center gap-2 group"
            >
              <FaDownload className="group-hover:rotate-12 transition-transform" />
              Refresh Data
            </button>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((stat, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-6 border ${stat.borderColor} hover:scale-[1.02] transition-all duration-300 group overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 bg-gray-900/50 rounded-xl ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                    <div className={`text-sm font-medium ${stat.trendColor} flex items-center gap-1`}>
                      <FaArrowUp />
                      {stat.trend}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 font-medium">{stat.title}</div>
                  <div className="text-gray-400 text-sm mt-2">Last 30 days • Updated daily</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Applications by University - Enhanced Bar Chart */}
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 overflow-hidden group">
            {/* Chart header with glow effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-xl border border-blue-700/30">
                    <FaUniversity className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Applications by University</h2>
                    <p className="text-gray-400 text-sm">Top universities by application volume</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-800/50 rounded-lg">
                  <FaChartBar className="text-blue-400" />
                </div>
              </div>

              <div className="h-80">
                {applicationsByUniversity.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={applicationsByUniversity} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={CHART_COLORS.gradients.blue[0]} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={CHART_COLORS.gradients.blue[1]} stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={70} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickLine={{ stroke: "#4B5563" }} />
                      <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} tickLine={{ stroke: "#4B5563" }} axisLine={{ stroke: "#4B5563" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="applications" name="Applications" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={40} animationDuration={1500} />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke={CHART_COLORS.primary.cyan}
                        strokeWidth={2}
                        dot={{ stroke: CHART_COLORS.primary.cyan, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        animationDuration={2000}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-6xl text-gray-700 mb-4">📊</div>
                    <p className="text-gray-400">No application data available</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <span>Total applications across universities</span>
                <span className="font-medium text-white">{applicationsByUniversity.reduce((sum, uni) => sum + uni.applications, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Applications by Category - Enhanced Pie Chart */}
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-xl border border-purple-700/30">
                    <FaChartPie className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Applications by Category</h2>
                    <p className="text-gray-400 text-sm">Distribution across scholarship types</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-800/50 rounded-lg">
                  <FaGraduationCap className="text-purple-400" />
                </div>
              </div>

              <div className="h-80">
                {applicationsByCategory.length > 0 ? (
                  <div className="flex h-full">
                    <div className="w-2/3">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            {applicationsByCategory.map((entry, index) => (
                              <linearGradient key={index} id={`gradient-${index}`}>
                                <stop offset="0%" stopColor={CHART_COLORS.primary[Object.keys(CHART_COLORS.primary)[index % 8]]} stopOpacity={0.8} />
                                <stop offset="100%" stopColor={CHART_COLORS.primary[Object.keys(CHART_COLORS.primary)[index % 8]]} stopOpacity={0.3} />
                              </linearGradient>
                            ))}
                          </defs>
                          <Pie data={applicationsByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" animationDuration={1500} animationBegin={500}>
                            {applicationsByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="#1F2937" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/3 pl-4">
                      <div className="space-y-4 pt-8">
                        {applicationsByCategory.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: CHART_COLORS.primary[Object.keys(CHART_COLORS.primary)[index % 8]],
                                }}
                              />
                              <span className="text-gray-300 text-sm">{category.name}</span>
                            </div>
                            <div className="text-white font-bold">{category.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="text-6xl text-gray-700 mb-4">📈</div>
                    <p className="text-gray-400">No category data available</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center text-sm text-gray-400">Click on legend items to filter • Hover for details</div>
            </div>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Monthly Trend - Area Chart */}
          <div className="lg:col-span-2 relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-600/20 to-emerald-500/20 rounded-xl border border-green-700/30">
                    <FaChartLine className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Monthly Application Trend</h2>
                    <p className="text-gray-400 text-sm">Growth over the last 6 months</p>
                  </div>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jan", applications: 45 },
                      { month: "Feb", applications: 52 },
                      { month: "Mar", applications: 68 },
                      { month: "Apr", applications: 79 },
                      { month: "May", applications: 85 },
                      { month: "Jun", applications: 92 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.gradients.green[0]} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={CHART_COLORS.gradients.green[1]} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={true} vertical={false} />
                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="applications" stroke={CHART_COLORS.gradients.green[0]} strokeWidth={3} fill="url(#areaGradient)" animationDuration={2000} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  <span className="text-green-400 font-bold">↑ 42% growth</span> in last 6 months
                </div>
                <div className="text-white font-bold">Average: 71 applications/month</div>
              </div>
            </div>
          </div>

          {/* Completion Rate - Radial Chart */}
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-gray-700/30 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-cyan-600/20 to-blue-500/20 rounded-xl border border-cyan-700/30">
                    <FaPercent className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Completion Rate</h2>
                    <p className="text-gray-400 text-sm">Application to approval ratio</p>
                  </div>
                </div>
              </div>

              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="20%" outerRadius="80%" data={radialData} startAngle={180} endAngle={-180}>
                    <RadialBar label={{ fill: "#fff", position: "center" }} background={{ fill: "#374151" }} dataKey="value" cornerRadius={10} animationDuration={2000} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-white">
                      78%
                    </text>
                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-400">
                      Completion
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-center">
                <div className="text-gray-400 text-sm mb-2">Target: 85%</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 rounded-xl p-5 border border-gray-700/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-900/30 rounded-lg">
                <FaCheckCircle className="text-green-400" />
              </div>
              <div>
                <div className="text-gray-300">Approval Rate</div>
                <div className="text-2xl font-bold text-white">42.5%</div>
              </div>
            </div>
            <div className="text-green-400 text-sm flex items-center gap-1">
              <FaArrowUp /> +2.3% from last month
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 rounded-xl p-5 border border-gray-700/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-900/30 rounded-lg">
                <FaClock className="text-yellow-400" />
              </div>
              <div>
                <div className="text-gray-300">Avg. Processing Time</div>
                <div className="text-2xl font-bold text-white">3.2 days</div>
              </div>
            </div>
            <div className="text-green-400 text-sm flex items-center gap-1">
              <FaArrowDown /> -0.8 days faster
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 rounded-xl p-5 border border-gray-700/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-900/30 rounded-lg">
                <FaStar className="text-purple-400" />
              </div>
              <div>
                <div className="text-gray-300">Avg. Review Score</div>
                <div className="text-2xl font-bold text-white">4.2/5.0</div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">Based on {data.reviews || 0} reviews</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800/30">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <span>Data updates automatically • Last refresh: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            <span className="hidden md:inline">•</span>
            <span>Dashboard v2.0 • Powered by Recharts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
