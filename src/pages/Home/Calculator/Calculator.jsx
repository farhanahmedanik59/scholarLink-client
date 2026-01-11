import React, { useState, useEffect } from "react";
import {
  FaCalculator,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaLightbulb,
  FaSync,
  FaDownload,
  FaShareAlt,
  FaSave,
  FaGlobeAmericas,
  FaBook,
  FaHome,
  FaPlane,
  FaUtensils,
  FaCreditCard,
  FaPercentage,
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";
import { MdSchool, MdTrendingUp, MdAttachMoney } from "react-icons/md";

const ScholarshipCalculatorSection = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [formData, setFormData] = useState({
    country: "USA",
    degreeLevel: "undergraduate",
    universityType: "public",
    duration: 4,
    tuition: 25000,
    livingExpenses: 12000,
    booksSupplies: 1000,
    insurance: 2000,
    travel: 1500,
    otherExpenses: 2000,
    currentSavings: 5000,
    familyContribution: 5000,
    partTimeIncome: 3000,
    scholarshipsApplied: 3,
    expectedScholarships: 8000,
  });

  const [results, setResults] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);

  const countries = [
    { code: "USA", name: "United States", icon: "🇺🇸" },
    { code: "UK", name: "United Kingdom", icon: "🇬🇧" },
    { code: "Canada", name: "Canada", icon: "🇨🇦" },
    { code: "Australia", name: "Australia", icon: "🇦🇺" },
    { code: "Germany", name: "Germany", icon: "🇩🇪" },
    { code: "Japan", name: "Japan", icon: "🇯🇵" },
  ];

  const degreeLevels = [
    { id: "undergraduate", label: "Undergraduate", avgCost: 25000 },
    { id: "masters", label: "Master's", avgCost: 30000 },
    { id: "phd", label: "PhD", avgCost: 20000 },
    { id: "professional", label: "Professional", avgCost: 40000 },
  ];

  const calculateTotals = () => {
    const totalCost = (formData.tuition + formData.livingExpenses + formData.booksSupplies + formData.insurance + formData.travel + formData.otherExpenses) * formData.duration;

    const totalFunding = formData.currentSavings + formData.familyContribution + formData.partTimeIncome + formData.expectedScholarships;

    const fundingGap = totalCost - totalFunding;
    const fundingPercentage = totalFunding > 0 ? (totalFunding / totalCost) * 100 : 0;

    return {
      totalCost,
      totalFunding,
      fundingGap: Math.max(0, fundingGap),
      fundingPercentage: Math.min(100, fundingPercentage),
      monthlyCost: totalCost / (formData.duration * 12),
      scholarshipsNeeded: Math.ceil(fundingGap / 5000), // Assuming average scholarship of $5000
    };
  };

  useEffect(() => {
    const totals = calculateTotals();
    setResults(totals);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const handleCountrySelect = (countryCode) => {
    // Update costs based on country selection
    const countryCosts = {
      USA: { tuition: 25000, living: 12000 },
      UK: { tuition: 20000, living: 10000 },
      Canada: { tuition: 18000, living: 9000 },
      Australia: { tuition: 22000, living: 11000 },
      Germany: { tuition: 1000, living: 8000 },
      Japan: { tuition: 8000, living: 7000 },
    };

    const costs = countryCosts[countryCode] || countryCosts.USA;
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      tuition: costs.tuition,
      livingExpenses: costs.living,
    }));
  };

  const handleDegreeSelect = (degreeId) => {
    const degree = degreeLevels.find((d) => d.id === degreeId);
    if (degree) {
      setFormData((prev) => ({
        ...prev,
        degreeLevel: degreeId,
        tuition: degree.avgCost,
      }));
    }
  };

  const savePlan = () => {
    const newPlan = {
      id: Date.now(),
      name: `Plan ${savedPlans.length + 1}`,
      date: new Date().toLocaleDateString(),
      data: { ...formData },
      results: calculateTotals(),
    };
    setSavedPlans([...savedPlans, newPlan]);
    alert("Plan saved successfully!");
  };

  const fundingStrategies = [
    {
      title: "Scholarship Strategy",
      description: "Based on your gap, here are recommended scholarships to apply for",
      actions: ["Apply to 8-10 merit-based scholarships", "Look for department-specific funding", "Consider local community scholarships"],
      icon: <FaGraduationCap />,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Cost Reduction",
      description: "Ways to reduce your education costs",
      actions: ["Consider community college for first 2 years", "Look for work-study programs", "Apply for in-state tuition"],
      icon: <FaMoneyBillWave />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Income Generation",
      description: "Opportunities to increase your funding",
      actions: ["Part-time campus jobs ($8-15/hr)", "Summer internships ($3,000-8,000)", "Freelance work in your field"],
      icon: <FaChartLine />,
      color: "from-blue-600 to-cyan-500",
    },
  ];

  const expenseCategories = [
    { name: "Tuition & Fees", value: formData.tuition, icon: <FaUniversity />, color: "text-blue-400" },
    { name: "Living Expenses", value: formData.livingExpenses, icon: <FaHome />, color: "text-cyan-400" },
    { name: "Books & Supplies", value: formData.booksSupplies, icon: <FaBook />, color: "text-blue-400" },
    { name: "Insurance", value: formData.insurance, icon: <FaCreditCard />, color: "text-cyan-400" },
    { name: "Travel", value: formData.travel, icon: <FaPlane />, color: "text-blue-400" },
    { name: "Other Expenses", value: formData.otherExpenses, icon: <FaUtensils />, color: "text-cyan-400" },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C]  py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaCalculator className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Scholarship <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Calculator</span> & Planning
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">Estimate your education costs, calculate funding gaps, and create a personalized scholarship strategy</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900/60 border border-gray-700 rounded-xl p-1 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "calculator" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <FaCalculator />
              Cost Calculator
            </button>
            <button
              onClick={() => setActiveTab("planning")}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "planning" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <FaChartLine />
              Funding Strategy
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === "saved" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <FaSave />
              Saved Plans ({savedPlans.length})
            </button>
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === "calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Calculate Your Education Costs</h3>
                  <button onClick={savePlan} className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-blue-500 transition-colors flex items-center gap-2">
                    <FaSave />
                    Save Plan
                  </button>
                </div>

                {/* Country Selection */}
                <div className="mb-8">
                  <label className="block text-gray-300 mb-4 font-medium">
                    <FaGlobeAmericas className="inline-block mr-2" />
                    Study Destination
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          formData.country === country.code ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-blue-500/50" : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="text-2xl mb-2">{country.icon}</div>
                        <div className="text-white text-sm font-medium">{country.code}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Degree Level */}
                <div className="mb-8">
                  <label className="block text-gray-300 mb-4 font-medium">
                    <MdSchool className="inline-block mr-2" />
                    Degree Level
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {degreeLevels.map((degree) => (
                      <button
                        key={degree.id}
                        onClick={() => handleDegreeSelect(degree.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          formData.degreeLevel === degree.id ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-blue-500/50" : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className="text-white font-medium mb-1">{degree.label}</div>
                        <div className="text-gray-400 text-sm">Avg: ${degree.avgCost.toLocaleString()}/yr</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-8">
                  <label className="block text-gray-300 mb-4 font-medium">
                    <FaCalendarAlt className="inline-block mr-2" />
                    Program Duration: <span className="text-white">{formData.duration} years</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-600 [&::-webkit-slider-thumb]:to-cyan-500"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>1 year</span>
                    <span>4 years</span>
                    <span>8 years</span>
                  </div>
                </div>

                {/* Expenses Grid */}
                <div className="mb-8">
                  <label className="block text-gray-300 mb-4 font-medium">
                    <FaMoneyBillWave className="inline-block mr-2" />
                    Annual Expenses (USD)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expenseCategories.map((category, index) => (
                      <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={category.color}>{category.icon}</div>
                            <span className="text-gray-300">{category.name}</span>
                          </div>
                          <div className="text-white font-bold">${category.value.toLocaleString()}</div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={category.name === "Tuition & Fees" ? 100000 : 30000}
                          step="100"
                          value={category.value}
                          onChange={(e) => {
                            const fieldMap = {
                              "Tuition & Fees": "tuition",
                              "Living Expenses": "livingExpenses",
                              "Books & Supplies": "booksSupplies",
                              Insurance: "insurance",
                              Travel: "travel",
                              "Other Expenses": "otherExpenses",
                            };
                            handleInputChange(fieldMap[category.name], e.target.value);
                          }}
                          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-600 [&::-webkit-slider-thumb]:to-cyan-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Funding Sources */}
                <div>
                  <label className="block text-gray-300 mb-4 font-medium">
                    <MdAttachMoney className="inline-block mr-2" />
                    Funding Sources
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-2">Current Savings</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">$</span>
                        <input
                          type="number"
                          value={formData.currentSavings}
                          onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                          className="w-full bg-transparent text-2xl font-bold text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-2">Family Contribution</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">$</span>
                        <input
                          type="number"
                          value={formData.familyContribution}
                          onChange={(e) => handleInputChange("familyContribution", e.target.value)}
                          className="w-full bg-transparent text-2xl font-bold text-white outline-none"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                      <div className="text-gray-400 text-sm mb-2">Expected Scholarships</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">$</span>
                        <input
                          type="number"
                          value={formData.expectedScholarships}
                          onChange={(e) => handleInputChange("expectedScholarships", e.target.value)}
                          className="w-full bg-transparent text-2xl font-bold text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl sticky top-8">
                <h3 className="text-2xl font-bold text-white mb-8">Your Results</h3>

                {results && (
                  <div className="space-y-6">
                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Funding Progress</span>
                        <span className="text-white font-bold">{results.fundingPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-1000" style={{ width: `${results.fundingPercentage}%` }}></div>
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-xl p-4">
                        <div className="text-gray-400 text-sm mb-1">Total Cost ({formData.duration} years)</div>
                        <div className="text-3xl font-bold text-white">${results.totalCost.toLocaleString()}</div>
                      </div>

                      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-xl p-4">
                        <div className="text-gray-400 text-sm mb-1">Total Funding</div>
                        <div className="text-3xl font-bold text-white">${results.totalFunding.toLocaleString()}</div>
                      </div>

                      {results.fundingGap > 0 ? (
                        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800/30 rounded-xl p-4">
                          <div className="text-gray-400 text-sm mb-1">Funding Gap</div>
                          <div className="text-3xl font-bold text-white">${results.fundingGap.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm mt-2">You need {results.scholarshipsNeeded} more scholarships (avg $5,000 each)</div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-xl p-4">
                          <div className="text-gray-400 text-sm mb-1">Congratulations!</div>
                          <div className="text-2xl font-bold text-white">Fully Funded!</div>
                          <div className="text-gray-400 text-sm mt-2">Your funding covers all expenses</div>
                        </div>
                      )}
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                      <div className="text-gray-300 mb-3">Monthly Breakdown</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Cost</span>
                          <span className="text-white font-medium">${results.monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Part-time Income</span>
                          <span className="text-white font-medium">${(formData.partTimeIncome / 12).toLocaleString(undefined, { maximumFractionDigits: 2 })}/mo</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveTab("planning")}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30"
                      >
                        View Funding Strategy
                      </button>
                      <button className="w-full py-3 bg-gray-800 border border-gray-700 text-white rounded-xl hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                        <FaDownload />
                        Export Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Planning Tab */}
        {activeTab === "planning" && (
          <div className="mb-16">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                Personalized Funding Strategy
                <span className="block text-gray-400 text-lg font-normal mt-2">Based on your ${results?.fundingGap.toLocaleString()} funding gap</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {fundingStrategies.map((strategy, index) => (
                  <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${strategy.color} inline-flex mb-4`}>
                      <div className="text-white text-xl">{strategy.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{strategy.title}</h4>
                    <p className="text-gray-400 mb-6">{strategy.description}</p>
                    <div className="space-y-3">
                      {strategy.actions.map((action, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarship Recommendations */}
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-8">Recommended Scholarships</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Scholarship Name</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Amount</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Deadline</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Match Score</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "STEM Excellence Award", amount: "$10,000", deadline: "Mar 15, 2024", match: "95%" },
                      { name: "International Student Grant", amount: "$8,000", deadline: "Apr 30, 2024", match: "88%" },
                      { name: "Merit-Based Scholarship", amount: "$5,000", deadline: "May 20, 2024", match: "82%" },
                      { name: "Community Leadership Award", amount: "$3,000", deadline: "Jun 10, 2024", match: "78%" },
                      { name: "First Generation Scholarship", amount: "$7,500", deadline: "Jul 1, 2024", match: "75%" },
                    ].map((scholarship, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="text-white font-medium">{scholarship.name}</div>
                          <div className="text-gray-400 text-sm">
                            For {formData.degreeLevel} students in {formData.country}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-green-400 font-bold">{scholarship.amount}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-300">{scholarship.deadline}</div>
                          <div className="text-gray-400 text-sm">30 days left</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: scholarship.match }}></div>
                            </div>
                            <span className="text-white font-medium">{scholarship.match}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity text-sm">Apply Now</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Saved Plans Tab */}
        {activeTab === "saved" && (
          <div className="mb-16">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Your Saved Plans</h3>
                <button
                  onClick={savePlan}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 flex items-center gap-2"
                >
                  <FaSave />
                  Save Current Plan
                </button>
              </div>

              {savedPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPlans.map((plan) => (
                    <div key={plan.id} className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                        <span className="text-gray-400 text-sm">{plan.date}</span>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Cost</span>
                          <span className="text-white font-bold">${plan.results.totalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Funding Gap</span>
                          <span className="text-red-400 font-bold">${plan.results.fundingGap.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Country</span>
                          <span className="text-white">{plan.data.country}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl hover:border-blue-500 transition-colors text-sm">Load</button>
                        <button className="flex-1 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl hover:border-blue-500 transition-colors text-sm">Export</button>
                        <button className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:border-red-500 transition-colors">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 text-gray-500">📊</div>
                  <h4 className="text-xl font-bold text-white mb-2">No saved plans yet</h4>
                  <p className="text-gray-400 mb-6">Use the calculator to create and save your first funding plan</p>
                  <button onClick={() => setActiveTab("calculator")} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity">
                    Go to Calculator
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-12 text-center backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLightbulb className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Funding?</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Our calculator shows you exactly what you need. Now let us help you get there.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg flex items-center justify-center gap-3">
                <FaGraduationCap />
                Find Matching Scholarships
                <FaArrowRight />
              </button>
              <button className="px-8 py-4 bg-gray-900/60 border border-gray-700 text-white font-bold rounded-xl hover:border-blue-500 transition-colors">Book Strategy Session</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipCalculatorSection;
