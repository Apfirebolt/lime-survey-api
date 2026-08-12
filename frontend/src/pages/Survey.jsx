import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSurveys } from "../features/survey/surveySlice";
import Loader from "../components/Loader";
import SurveyItem from "../components/Survey";

const Survey = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { surveys, isLoading } = useSelector((state) => state.survey);

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  const categories = ["All", "General", "Technology", "Education", "Feedback", "Business"];

  const surveyList = surveys || [];

  // Filter surveys by search query and selected category
  const filteredSurveys = surveyList.filter((survey) => {
    const matchesSearch =
      survey.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || survey.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <span>📊 Survey Directory</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Explore All Surveys
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Discover active community polls, participate in discussions, and share your opinion on topics that matter.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-stretch md:self-auto justify-end">
            <Link
              to="/surveys/add"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-xs shadow-sm hover:shadow transition-all"
            >
              + Create New Survey
            </Link>
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
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

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
          <span>
            Showing <strong className="text-gray-900 dark:text-white font-bold">{filteredSurveys.length}</strong> {filteredSurveys.length === 1 ? "survey" : "surveys"}
          </span>
        </div>

        {/* Surveys Grid */}
        {filteredSurveys.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSurveys.map((survey, index) => (
              <SurveyItem key={survey.id || survey._id || index} survey={survey} />
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 shadow-xs">
            <span className="text-4xl block mb-2">🔎</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              No Surveys Found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 mb-6">
              We couldn&apos;t find any surveys matching your search filters. Try resetting your search query or create a new survey!
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Reset Filters
              </button>
              <Link
                to="/surveys/add"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                + Create Survey
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Survey;