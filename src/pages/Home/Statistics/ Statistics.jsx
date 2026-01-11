import React, { useState, useEffect } from "react";
import { FaChartLine, FaUserGraduate, FaMoneyCheckAlt, FaGlobeAmericas, FaUniversity, FaCalendarCheck, FaArrowUp, FaArrowDown, FaTrophy, FaGraduationCap, FaUsers, FaAward } from "react-icons/fa";
import { MdSchool, MdTrendingUp } from "react-icons/md";

const StatisticsSection = () => {
  const [activeView, setActiveView] = useState("overview");
  const [counters, setCounters] = useState({
    students: 0,
    scholarships: 0,
    funding: 0,
    successRate: 0,
    countries: 0,
    universities: 0,
  });

  const targetCounters = {
    students: 12500,
    scholarships: 8500,
    funding: 15500000,
    successRate: 95,
    countries: 85,
    universities: 1200,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        students: Math.min(prev.students + 250, targetCounters.students),
        scholarships: Math.min(prev.scholarships + 170, targetCounters.scholarships),
        funding: Math.min(prev.funding + 310000, targetCounters.funding),
        successRate: Math.min(prev.successRate + 2, targetCounters.successRate),
        countries: Math.min(prev.countries + 3, targetCounters.countries),
        universities: Math.min(prev.universities + 40, targetCounters.universities),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return num.toString();
  };

  const mainStats = [
    {
      id: 1,
      title: "Students Supported",
      value: formatNumber(counters.students),
      icon: <FaUserGraduate />,
      change: "+24%",
      trend: "up",
      description: "Active scholarship seekers",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
    },
    {
      id: 2,
      title: "Scholarships Listed",
      value: formatNumber(counters.scholarships),
      icon: <FaTrophy />,
      change: "+18%",
      trend: "up",
      description: "Active opportunities",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
    },
    {
      id: 3,
      title: "Total Funding Secured",
      value: formatNumber(counters.funding),
      icon: <FaMoneyCheckAlt />,
      change: "+32%",
      trend: "up",
      description: "For our students",
      gradient: "from-blue-600 to-cyan-500",
      color: "blue",
    },
    {
      id: 4,
      title: "Success Rate",
      value: `${counters.successRate}%`,
      icon: <FaChartLine />,
      change: "+5%",
      trend: "up",
      description: "Scholarship acceptance",
      gradient: "from-blue-500 to-cyan-400",
      color: "cyan",
    },
  ];

  const detailedStats = [
    {
      category: "Demographics",
      data: [
        { label: "Undergraduate", value: "45%", color: "from-blue-500 to-blue-600" },
        { label: "Graduate", value: "35%", color: "from-cyan-400 to-cyan-500" },
        { label: "PhD & Postdoc", value: "15%", color: "from-blue-600 to-blue-700" },
        { label: "Professional", value: "5%", color: "from-cyan-500 to-cyan-600" },
      ],
    },
    {
      category: "Scholarship Types",
      data: [
        { label: "Merit-Based", value: "40%", color: "from-blue-500 to-blue-600" },
        { label: "Need-Based", value: "25%", color: "from-cyan-400 to-cyan-500" },
        { label: "Research", value: "20%", color: "from-blue-600 to-blue-700" },
        { label: "Sports/Arts", value: "15%", color: "from-cyan-500 to-cyan-600" },
      ],
    },
  ];

  const trendData = [
    { month: "Jan", applications: 1200, acceptances: 850 },
    { month: "Feb", applications: 1350, acceptances: 920 },
    { month: "Mar", applications: 1500, acceptances: 1050 },
    { month: "Apr", applications: 1450, acceptances: 980 },
    { month: "May", applications: 1650, acceptances: 1250 },
    { month: "Jun", applications: 1800, acceptances: 1350 },
    { month: "Jul", applications: 1750, acceptances: 1300 },
    { month: "Aug", applications: 1900, acceptances: 1450 },
    { month: "Sep", applications: 2100, acceptances: 1600 },
    { month: "Oct", applications: 2250, acceptances: 1700 },
    { month: "Nov", applications: 2400, acceptances: 1850 },
    { month: "Dec", applications: 2600, acceptances: 2000 },
  ];

  const quickStats = [
    {
      icon: <FaGlobeAmericas />,
      title: "Countries Covered",
      value: `${counters.counts}+`,
      subtitle: "Global reach",
    },
    {
      icon: <FaUniversity />,
      title: "Partner Universities",
      value: `${counters.universities}+`,
      subtitle: "Worldwide institutions",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Monthly Applications",
      value: "2.4K+",
      subtitle: "Average processed",
    },
    {
      icon: <MdSchool />,
      title: "Fields of Study",
      value: "120+",
      subtitle: "Academic disciplines",
    },
  ];

  return (
    <section className="bg-gradient-to-b   py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaChartLine className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Impact <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Statistics</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">Real-time data and insights showcasing our platform's success in connecting students with scholarship opportunities</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900/60 border border-gray-700 rounded-xl p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveView("overview")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeView === "overview" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView("detailed")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeView === "detailed" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Detailed Analytics
            </button>
            <button
              onClick={() => setActiveView("trends")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeView === "trends" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Trends
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat) => (
            <div key={stat.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white text-xl">{stat.icon}</div>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    stat.trend === "up" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.change}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <h3 className="text-lg font-bold text-white">{stat.title}</h3>
              </div>

              <p className="text-gray-400 text-sm">{stat.description}</p>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className={`h-2 rounded-full overflow-hidden bg-gray-800`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000`}
                    style={{
                      width: `${stat.id === 1 ? 85 : stat.id === 2 ? 75 : stat.id === 3 ? 90 : 95}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Last month</span>
                  <span>Current</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-gray-900/40 border border-gray-700 rounded-xl p-4 text-center hover:border-blue-500/20 transition-all duration-300">
              <div className="text-blue-400 text-2xl mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm font-medium mb-1">{stat.title}</div>
              <div className="text-gray-500 text-xs">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Detailed Analytics */}
        {activeView === "detailed" && (
          <div className="mb-12">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                  <MdTrendingUp className="text-white" />
                </div>
                Detailed Analytics
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {detailedStats.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="text-lg font-bold text-white mb-4">{category.category}</h4>
                    {category.data.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-white font-bold">{item.value}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-gray-800">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                            style={{
                              width: item.value,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Comparison Stats */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-bold text-white mb-6">Platform Growth (2024 vs 2023)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: "New Users", current: "+42%", previous: "+28%", change: "+14%" },
                    { metric: "Applications", current: "+38%", previous: "+22%", change: "+16%" },
                    { metric: "Success Rate", current: "+5%", previous: "+3%", change: "+2%" },
                    { metric: "Funding", current: "+32%", previous: "+18%", change: "+14%" },
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-2">{item.metric}</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white mb-1">{item.current}</div>
                          <div className="text-gray-500 text-xs">2024</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 text-sm mb-1">{item.previous}</div>
                          <div
                            className={`text-xs font-medium ${
                              item.change.startsWith("+") ? "text-green-400 bg-green-500/20 border border-green-500/30" : "text-red-400 bg-red-500/20 border border-red-500/30"
                            } px-2 py-1 rounded-full`}
                          >
                            {item.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends View */}
        {activeView === "trends" && (
          <div className="mb-12">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                  <FaChartLine className="text-white" />
                </div>
                Monthly Trends 2024
              </h3>

              <div className="h-64 flex items-end gap-2 mb-8">
                {trendData.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full flex justify-center" style={{ height: "180px" }}>
                      {/* Applications Bar */}
                      <div
                        className="absolute w-3/4 bg-gradient-to-t from-blue-600 to-blue-500/80 rounded-t-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
                        style={{ height: `${(month.applications / 2600) * 160}px`, bottom: "0px" }}
                        title={`${month.applications} applications`}
                      ></div>

                      {/* Acceptances Bar */}
                      <div
                        className="absolute w-3/4 bg-gradient-to-t from-cyan-500 to-cyan-400/80 rounded-t-lg hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300"
                        style={{
                          height: `${(month.acceptances / 2000) * 160}px`,
                          bottom: "0px",
                          left: "25%",
                        }}
                        title={`${month.acceptances} acceptances`}
                      ></div>
                    </div>
                    <div className="text-gray-400 text-sm mt-2">{month.month}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-600 to-blue-500"></div>
                  <span className="text-gray-300">Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-cyan-500 to-cyan-400"></div>
                  <span className="text-gray-300">Acceptances</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Counter */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Live Platform Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Students Helped Today", value: "48", icon: <FaUsers />, color: "text-blue-400" },
                { label: "Applications Submitted", value: "156", icon: <FaGraduationCap />, color: "text-cyan-400" },
                { label: "Scholarships Awarded", value: "23", icon: <FaAward />, color: "text-blue-400" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl mb-3 ${item.color}`}>{item.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                  <div className="text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual Report */}
        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">2024 Annual Report Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Geographic Expansion",
                description: "Extended our services to 15 new countries, reaching 85 total countries worldwide.",
                stats: "85 countries",
                icon: <FaGlobeAmericas />,
              },
              {
                title: "University Partnerships",
                description: "Established new partnerships with 200+ top universities globally.",
                stats: "1,200+ partners",
                icon: <FaUniversity />,
              },
              {
                title: "Student Success",
                description: "Increased average scholarship value per student by 25% compared to 2023.",
                stats: "25% increase",
                icon: <FaTrophy />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-400 text-3xl mb-4 flex justify-center">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="text-cyan-400 font-bold text-lg">{item.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
