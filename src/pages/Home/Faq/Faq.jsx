import React, { useState } from "react";
import { FaChevronDown, FaQuestionCircle, FaSearch, FaGraduationCap, FaMoneyBillWave, FaFileAlt, FaClock, FaGlobe, FaUserCheck } from "react-icons/fa";

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    { id: "general", name: "General", icon: <FaQuestionCircle />, count: 4 },
    { id: "application", name: "Application", icon: <FaFileAlt />, count: 4 },
    { id: "eligibility", name: "Eligibility", icon: <FaUserCheck />, count: 4 },
    { id: "funding", name: "Funding", icon: <FaMoneyBillWave />, count: 4 },
    { id: "deadlines", name: "Deadlines", icon: <FaClock />, count: 4 },
    { id: "international", name: "International", icon: <FaGlobe />, count: 4 },
  ];

  const faqData = {
    general: [
      {
        question: "What types of scholarships are available on your platform?",
        answer:
          "We feature a wide range of scholarships including fully-funded, partially-funded, merit-based, need-based, sports, arts, research fellowships, government scholarships, university-specific awards, and private foundation grants. Our database covers undergraduate, graduate, PhD, and postdoctoral opportunities worldwide.",
      },
      {
        question: "Is your scholarship database completely free to use?",
        answer:
          "Yes, our scholarship search and database access are completely free. We provide detailed information about each scholarship including eligibility criteria, application deadlines, required documents, and contact information. Some premium features like personalized application review and one-on-one counseling are available through our paid plans.",
      },
      {
        question: "How often is the scholarship information updated?",
        answer:
          "Our scholarship database is updated daily. We have automated systems that monitor scholarship portals, university websites, and government announcements. Additionally, our team manually verifies all scholarship details, especially deadlines and application requirements, to ensure accuracy. We send email alerts for deadline changes.",
      },
      {
        question: "Can international students use your platform?",
        answer:
          "Absolutely! Our platform is designed for students worldwide. We have scholarships from over 100 countries and specifically highlight opportunities for international students. You can filter by 'International Students Allowed' to find scholarships open to non-citizens. Many of our success stories are from international students.",
      },
    ],
    application: [
      {
        question: "What documents do I typically need for scholarship applications?",
        answer:
          "Common requirements include: academic transcripts, letters of recommendation (usually 2-3), statement of purpose/personal essay, CV/resume, proof of English proficiency (IELTS/TOEFL), standardized test scores (SAT/GRE/GMAT), portfolio (for arts/design), research proposal (for PhD), and financial statements. We provide detailed checklists for each scholarship.",
      },
      {
        question: "How can I write a winning scholarship essay?",
        answer:
          "Key elements include: 1) Start with a compelling story 2) Clearly state your goals 3) Explain why you deserve the scholarship 4) Show how it aligns with your future plans 5) Demonstrate impact beyond academics 6) Be authentic and personal 7) Proofread meticulously. Our platform offers essay templates, editing tools, and expert review services.",
      },
      {
        question: "How many scholarships should I apply for?",
        answer:
          "We recommend applying to 8-12 well-matched scholarships. Quality over quantity is crucial. Focus on scholarships where you meet 80%+ of the requirements. Divide them into: 2-3 reach (competitive), 4-6 match (good fit), and 2-3 safety (high chance). Our matching algorithm helps identify your best-fit scholarships.",
      },
      {
        question: "Do I need to pay application fees for scholarships?",
        answer:
          "Most scholarships don't charge application fees. Be cautious of any scholarship asking for payment. Some universities charge small application fees (usually $50-100), but these are separate from scholarship applications. We clearly indicate if there are any fees associated with each scholarship listing.",
      },
    ],
    eligibility: [
      {
        question: "What are the common eligibility criteria for scholarships?",
        answer:
          "Common criteria include: academic performance (minimum GPA), nationality/residency, age restrictions, field of study, degree level, language proficiency, financial need, extracurricular achievements, leadership experience, and specific demographic factors. Use our advanced filters to find scholarships matching your profile.",
      },
      {
        question: "Can I apply if my GPA is below the requirement?",
        answer:
          "While minimum GPAs are often strict requirements, exceptions exist. If your GPA is slightly below but you have exceptional achievements in other areas (research, leadership, community service), you may still apply. Some scholarships consider holistic profiles. We recommend contacting the scholarship provider directly for clarification.",
      },
      {
        question: "Are there age limits for scholarship applications?",
        answer:
          "Some scholarships have age restrictions, particularly for undergraduate programs (usually 17-25) and certain government scholarships. However, many graduate and research scholarships don't have age limits. We clearly display age requirements in each scholarship's eligibility section.",
      },
      {
        question: "Do I need work experience for scholarship applications?",
        answer:
          "It depends on the scholarship. For undergraduate scholarships, work experience is rarely required. For graduate programs (especially MBA), 2-3 years of relevant experience is common. Research scholarships often prioritize academic achievements over work experience. We indicate experience requirements clearly.",
      },
    ],
    funding: [
      {
        question: "What does 'fully funded scholarship' mean?",
        answer:
          "A fully funded scholarship covers: full tuition fees, accommodation/housing, health insurance, monthly living stipend, travel allowance (often round-trip airfare), books and research materials, conference/training funding, and sometimes family allowances. These are highly competitive but eliminate financial barriers to education.",
      },
      {
        question: "Are scholarships taxable income?",
        answer:
          "This varies by country. In many countries, scholarship funds used for tuition and required educational expenses are tax-free. However, stipends for living expenses may be taxable. In the USA, most scholarships for degree-seeking students are tax-free. We recommend consulting a tax professional in your country.",
      },
      {
        question: "Can I hold multiple scholarships simultaneously?",
        answer:
          "Sometimes, but usually with restrictions. Many scholarships don't allow stacking with other full scholarships. Partial scholarships are more combinable. You must disclose all funding sources in your application. Some universities automatically adjust aid if you receive external scholarships. Check each scholarship's terms carefully.",
      },
      {
        question: "What expenses do scholarships typically not cover?",
        answer:
          "Common exclusions include: personal expenses beyond basic living costs, luxury items, family expenses (unless specified), travel for non-academic purposes, visa application fees (sometimes covered), entertainment expenses, and debts. Full breakdowns are provided in each scholarship's funding details.",
      },
    ],
    deadlines: [
      {
        question: "When should I start preparing my scholarship applications?",
        answer:
          "Start 6-12 months before deadlines. Timeline: 6-12 months: Research scholarships; 4-6 months: Prepare documents; 3 months: Write essays; 2 months: Get recommendations; 1 month: Finalize applications; 2 weeks: Submit early. Our platform sends deadline reminders at 90, 60, 30, and 7 days before each deadline.",
      },
      {
        question: "What happens if I miss a scholarship deadline?",
        answer:
          "Most scholarships strictly enforce deadlines and don't accept late applications. However, some may have rolling admissions or multiple application cycles per year. We recommend: 1) Check if they accept late applications 2) Note it for next cycle 3) Find similar opportunities with later deadlines using our deadline calendar.",
      },
      {
        question: "Are scholarship deadlines flexible for international students?",
        answer:
          "Deadlines are usually fixed for all applicants. However, some scholarships consider time zone differences and may specify 'by end of day in your local time zone.' Always convert to the scholarship provider's time zone to be safe. We display deadlines in both local and UTC time.",
      },
      {
        question: "How can I track multiple scholarship deadlines?",
        answer:
          "Our platform offers: 1) Personalized deadline calendar 2) Email/SMS reminders 3) Dashboard with upcoming deadlines 4) Priority sorting by urgency 5) Progress tracking for each application. You can export deadlines to Google Calendar or iCal for easy tracking.",
      },
    ],
    international: [
      {
        question: "What are the best countries for fully funded scholarships?",
        answer:
          "Top countries include: Germany (DAAD scholarships), USA (Fulbright, university-specific), UK (Chevening, Commonwealth), Canada (Vanier, university awards), Australia (Australia Awards), Netherlands (Orange Knowledge), Sweden (SI Scholarships), Switzerland (ETH Zurich), Japan (MEXT), and South Korea (KGSP).",
      },
      {
        question: "Do I need to know the local language to study abroad?",
        answer:
          "For English-speaking countries: usually not. For non-English speaking countries: many universities offer English-taught programs, especially at graduate level. However, learning basic local language is helpful for daily life. Some scholarships include language courses. We filter by 'Language of Instruction' to help you find suitable programs.",
      },
      {
        question: "What visa documents do I need after getting a scholarship?",
        answer:
          "Typically: scholarship award letter, admission letter, passport, financial proof, health insurance, medical certificate, police clearance, passport photos, and visa application forms. Start visa process immediately after acceptance as it can take 2-6 months. Many embassies offer expedited processing for scholarship recipients.",
      },
      {
        question: "Can I work while studying on a scholarship abroad?",
        answer:
          "Most student visas allow limited part-time work (usually 20 hours/week during term, full-time during breaks). However, some scholarships prohibit or restrict employment. Check your scholarship terms and host country regulations. On-campus jobs are usually easiest to obtain and manage with studies.",
      },
    ],
  };

  const filteredFAQs = faqData[activeCategory].filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaQuestionCircle className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">Find answers to common questions about scholarships, applications, eligibility, and more</p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/60 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 backdrop-blur-xl sticky top-6">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-blue-400" />
                Categories
              </h3>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenIndex(0);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      activeCategory === category.id ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30" : "bg-gray-800/30 border border-transparent hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${activeCategory === category.id ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "bg-gray-700 text-gray-400"}`}>{category.icon}</div>
                      <span className={`font-medium ${activeCategory === category.id ? "text-white" : "text-gray-300"}`}>{category.name}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${activeCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"}`}>{category.count}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-white font-bold text-sm mb-3">FAQ Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-blue-400 font-bold text-lg">24</div>
                    <div className="text-gray-400 text-xs">Total FAQs</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                    <div className="text-cyan-400 font-bold text-lg">6</div>
                    <div className="text-gray-400 text-xs">Categories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{faqCategories.find((c) => c.id === activeCategory)?.name} Questions</h3>
                  <p className="text-gray-400">
                    {filteredFAQs.length} questions found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-blue-400">{faqCategories.find((c) => c.id === activeCategory)?.icon}</div>
              </div>

              <div className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl transition-all duration-300 ${
                        openIndex === index ? "border-blue-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50" : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <button onClick={() => toggleFAQ(index)} className="w-full text-left p-6 flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${openIndex === index ? "bg-gradient-to-r from-blue-600 to-cyan-500" : "bg-gray-700"}`}>
                            <FaQuestionCircle className="text-white" />
                          </div>
                          <div>
                            <h4 className={`text-lg font-medium mb-1 ${openIndex === index ? "text-white" : "text-gray-300"}`}>{faq.question}</h4>
                            <p className={`text-sm ${openIndex === index ? "text-blue-300" : "text-gray-500"}`}>Click to {openIndex === index ? "collapse" : "expand"} answer</p>
                          </div>
                        </div>
                        <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                      </button>

                      {openIndex === index && (
                        <div className="px-6 pb-6">
                          <div className="pl-14">
                            <div className="border-l-2 border-blue-500 pl-4">
                              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                              <div className="mt-4 pt-4 border-t border-gray-700/50">
                                <p className="text-gray-400 text-sm">
                                  💡 <span className="text-blue-300">Tip:</span> This information was last updated on January 15, 2024
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-4">🔍</div>
                    <h4 className="text-white text-xl font-bold mb-2">No results found</h4>
                    <p className="text-gray-400">No questions match your search for "{searchQuery}". Try different keywords or browse categories.</p>
                    <button onClick={() => setSearchQuery("")} className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                      Clear Search
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaQuestionCircle className="text-white text-2xl" />
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2">Still have questions?</h4>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">Can't find what you're looking for? Our scholarship advisors are here to help.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">Contact Support</button>
                    <button className="px-6 py-3 bg-gray-800 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors">Schedule Consultation</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <div className="text-blue-400 text-2xl mb-3">📝</div>
            <h4 className="text-white font-bold mb-2">Application Tips</h4>
            <p className="text-gray-400 text-sm">Start preparing 6 months before deadlines. Customize each application and proofread thoroughly.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <div className="text-cyan-400 text-2xl mb-3">💎</div>
            <h4 className="text-white font-bold mb-2">Stand Out</h4>
            <p className="text-gray-400 text-sm">Highlight unique experiences and show how you'll contribute to the university community.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700 rounded-2xl p-6">
            <div className="text-green-400 text-2xl mb-3">⏰</div>
            <h4 className="text-white font-bold mb-2">Deadline Alerts</h4>
            <p className="text-gray-400 text-sm">Set reminders for 30, 15, and 7 days before deadlines to avoid last-minute rush.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
