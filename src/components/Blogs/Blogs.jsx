import React, { useEffect, useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaArrowRight, FaBookOpen, FaShareAlt, FaComment, FaEye, FaBookmark, FaRegBookmark, FaFire, FaGraduationCap } from "react-icons/fa";

const BlogsComponent = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState(new Set());

  const blogCategories = [
    { id: "all", name: "All Posts", count: 12, icon: <FaBookOpen /> },
    { id: "tips", name: "Application Tips", count: 4, icon: <FaGraduationCap /> },
    { id: "essay", name: "Essay Writing", count: 3, icon: <FaBookOpen /> },
    { id: "funding", name: "Funding Guide", count: 3, icon: <FaFire /> },
    { id: "success", name: "Success Stories", count: 2, icon: <FaUser /> },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Winning Scholarship Essay in 2024",
      excerpt: "Learn the secrets of crafting compelling scholarship essays that stand out from thousands of applications.",
      content: "Detailed guide on essay structure, storytelling techniques, and common mistakes to avoid...",
      author: "Dr. Sarah Johnson",
      date: "2024-02-15",
      readTime: "8 min read",
      category: "essay",
      tags: ["Essay", "Writing", "Tips"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
      views: 1250,
      comments: 42,
      featured: true,
    },
    {
      id: 2,
      title: "Top 10 Fully Funded Scholarships in Europe for International Students",
      excerpt: "Discover the best fully funded opportunities across European universities with complete financial coverage.",
      content: "Comprehensive list of European scholarships including DAAD, Erasmus, and country-specific programs...",
      author: "Michael Chen",
      date: "2024-02-10",
      readTime: "12 min read",
      category: "funding",
      tags: ["Europe", "Fully Funded", "International"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      views: 2100,
      comments: 68,
      featured: true,
    },
    {
      id: 3,
      title: "Avoid These 7 Common Scholarship Application Mistakes",
      excerpt: "Most applicants make these critical errors. Learn how to avoid them and increase your chances.",
      content: "Analysis of frequent application pitfalls and practical strategies to prevent them...",
      author: "Prof. Robert Williams",
      date: "2024-02-05",
      readTime: "6 min read",
      category: "tips",
      tags: ["Mistakes", "Application", "Advice"],
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
      views: 980,
      comments: 31,
      featured: false,
    },
    {
      id: 4,
      title: "From Rejection to Full Scholarship: A Student's Journey",
      excerpt: "Inspiring story of how perseverance and strategic planning led to securing a full-ride scholarship.",
      content: "Personal narrative of overcoming rejections and finally achieving scholarship success...",
      author: "Maria Gonzalez",
      date: "2024-01-28",
      readTime: "10 min read",
      category: "success",
      tags: ["Success Story", "Motivation"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
      views: 1500,
      comments: 89,
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Scholarship Tax Implications",
      excerpt: "A comprehensive guide to how scholarships are taxed in different countries.",
      content: "Tax laws and regulations affecting scholarship recipients in major study destinations...",
      author: "David Miller",
      date: "2024-01-20",
      readTime: "15 min read",
      category: "funding",
      tags: ["Tax", "Finance", "Legal"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
      views: 720,
      comments: 24,
      featured: false,
    },
    {
      id: 6,
      title: "Building a Strong Recommendation Letter Portfolio",
      excerpt: "How to select and prepare recommenders who can write compelling letters for your applications.",
      content: "Strategies for approaching professors and employers for effective recommendation letters...",
      author: "Dr. Lisa Wang",
      date: "2024-01-15",
      readTime: "7 min read",
      category: "tips",
      tags: ["Recommendation", "Letters", "Portfolio"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
      views: 1100,
      comments: 37,
      featured: false,
    },
  ];

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const toggleSavePost = (postId) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaBookOpen className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Scholarship <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">Expert advice, success stories, and insider tips to help you secure your dream scholarship</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/60 border border-gray-700 rounded-full py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                    : "bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700"
                }`}
              >
                <div className={`${selectedCategory === category.id ? "text-white" : "text-blue-400"}`}>{category.icon}</div>
                <span>{category.name}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${selectedCategory === category.id ? "bg-white/20" : "bg-gray-700 text-gray-400"}`}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && searchQuery === "" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                <FaFire className="text-white" />
              </div>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 group backdrop-blur-xl">
                  <div className="relative h-64 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-full">Featured</span>
                    </div>
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800 transition-colors border border-gray-700"
                    >
                      {savedPosts.has(post.id) ? <FaBookmark className="text-cyan-400" /> : <FaRegBookmark className="text-gray-400" />}
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <FaCalendarAlt className="text-xs" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{post.title}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">{post.author.charAt(0)}</div>
                        <div>
                          <div className="font-medium text-white">{post.author}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaEye /> {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 group/btn border border-blue-500/30">
                        Read More
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
                <FaBookOpen className="text-white" />
              </div>
              {searchQuery ? `Search Results (${filteredPosts.length})` : "Latest Articles"}
            </h2>
            <div className="text-sm text-gray-400">
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-gray-900/60 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group backdrop-blur-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className="absolute top-3 right-3 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800 transition-colors border border-gray-700"
                    >
                      {savedPosts.has(post.id) ? <FaBookmark className="text-cyan-400 text-sm" /> : <FaRegBookmark className="text-gray-400 text-sm" />}
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <FaCalendarAlt />
                        <span>{formatDate(post.date)}</span>
                        <span className="mx-1">•</span>
                        <FaUser />
                        <span>{post.author.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FaEye className="text-xs" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full flex items-center gap-1 border border-gray-700">
                          <FaTag className="text-xs" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                          <FaComment />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <FaShareAlt />
                          <span>Share</span>
                        </button>
                      </div>
                      <button className="text-cyan-400 font-medium text-sm flex items-center gap-2 group/readmore hover:text-cyan-300">
                        Read Article
                        <FaArrowRight className="group-hover/readmore:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-900/60 border border-gray-700 rounded-2xl backdrop-blur-xl">
              <div className="text-4xl mb-4 text-gray-500">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">We couldn't find any articles matching "{searchQuery}". Try different keywords or browse all categories.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/30 rounded-2xl p-8 md:p-12 text-center backdrop-blur-xl">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBookOpen className="text-white text-2xl" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Never Miss a Scholarship Tip</h3>
              <p className="text-gray-300 mb-8">Join 15,000+ students who receive our weekly newsletter with exclusive scholarship opportunities and application advice.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity border border-blue-500/30 shadow-lg">
                  Subscribe Now
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900/60 border border-gray-700 p-6 rounded-2xl backdrop-blur-xl text-center hover:border-blue-500/30 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">12K+</div>
            <div className="text-gray-400">Monthly Readers</div>
          </div>
          <div className="bg-gray-900/60 border border-gray-700 p-6 rounded-2xl backdrop-blur-xl text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-3xl font-bold text-cyan-400 mb-2">350+</div>
            <div className="text-gray-400">Published Articles</div>
          </div>
          <div className="bg-gray-900/60 border border-gray-700 p-6 rounded-2xl backdrop-blur-xl text-center hover:border-blue-500/30 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </div>
          <div className="bg-gray-900/60 border border-gray-700 p-6 rounded-2xl backdrop-blur-xl text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-gray-400">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsComponent;
