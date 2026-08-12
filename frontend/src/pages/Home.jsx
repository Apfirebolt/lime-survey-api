import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSurveys } from "../features/survey/surveySlice";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);
  const { surveys, isLoading } = useSelector((state) => state.survey);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  // Categories for filtering
  const categories = ["All", "General", "Technology", "Education", "Feedback"];

  // Filter surveys based on search input & category
  const filteredSurveys = (surveys || []).filter((survey) => {
    const matchesSearch =
      survey.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || survey.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6">
            <span>✨ Public Opinion & Feedback Portal</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            {profile ? (
              <>
                Welcome back,{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {profile.username || profile.firstName}
                </span>
              </>
            ) : (
              <>
                Opinions that shapes{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  the future.
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Create custom surveys, participate in active community polls, and discover authentic public insights that matter.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/surveys/add"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              + Create a Survey
            </Link>
            <a
              href="#explore-surveys"
              className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm border border-gray-200 dark:border-gray-700 shadow-xs transition-all"
            >
              Explore All Surveys
            </a>
          </div>

          {/* Platform Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs border border-gray-100 dark:border-gray-700/50 shadow-xs text-center">
            <div>
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                {surveys?.length || 0}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Surveys</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                100%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Anonymous Responses</span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                Real-Time
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Community Analytics</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Surveys Section */}
      <main id="explore-surveys" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Category Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Explore Active Surveys
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pick a topic and share your feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search surveys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Spinner State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              className="animate-spin h-8 w-8 text-emerald-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading surveys...</p>
          </div>
        ) : filteredSurveys.length > 0 ? (
          
          /* Survey Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map((survey, index) => (
              <div
                key={survey.id || survey._id || index}
                className="group flex flex-col justify-between bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 p-6 shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200"
              >
                <div>
                  {/* Card Header & Owner */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      {survey.category || "General"}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(survey.createdDate || survey.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {survey.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {survey.description || "No description provided for this survey."}
                  </p>
                </div>

                {/* Card Footer Details */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                  
                  {/* Creator Info */}
                  <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center uppercase">
                      {survey.owner?.username?.charAt(0) || "U"}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
                      {survey.owner?.username || "Anonymous"}
                    </span>
                  </div>

                  {/* Participate Link */}
                  <Link
                    to={`/response/${survey.id || survey._id}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Take Survey</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No surveys found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 mb-6">
              We couldn&apos;t find any surveys matching your search criteria. Be the first to create one!
            </p>
            <Link
              to="/surveys/add"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              + Create New Survey
            </Link>
          </div>
        )}

      </main>
    </div>
  );
};

export default Home;