import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import {
  getUserResponses,
  deleteUserResponse,
} from "../features/userResponse/userResponseSlice";

const MyResponses = () => {
  const dispatch = useDispatch();

  const [expandedResponseId, setExpandedResponseId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { isLoading, isError, message, responses } = useSelector(
    (state) => state.response
  );

  useEffect(() => {
    dispatch(getUserResponses());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
    }
  }, [isError, message]);

  // Safe JSON Parsing utility
  const parseResponseData = (jsonString) => {
    try {
      if (typeof jsonString === "object") return jsonString;
      return JSON.parse(jsonString || "{}");
    } catch {
      return {};
    }
  };

  const handleDelete = async (responseId) => {
    setDeletingId(responseId);
    try {
      await dispatch(deleteUserResponse(responseId)).unwrap();
      toast.success("User response deleted successfully!");
      dispatch(getUserResponses());
    } catch (err) {
      toast.error(err || "Failed to delete response");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleAccordion = (id) => {
    setExpandedResponseId(expandedResponseId === id ? null : id);
  };

  if (isLoading) {
    return <Loader />;
  }

  const responseList = responses || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header & Stats Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <span>📋 Feedback History</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              My Responses
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review and manage your submitted survey feedback across the platform.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-emerald-50 dark:bg-gray-900/50 p-4 rounded-xl border border-emerald-100 dark:border-gray-700/60 self-stretch sm:self-auto justify-center text-center">
            <div>
              <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {responseList.length}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Total Submitted
              </span>
            </div>
          </div>
        </div>

        {/* Responses List / Accordions */}
        {responseList.length > 0 ? (
          <div className="space-y-4">
            {responseList.map((response) => {
              const responseObj = parseResponseData(response.response);
              const responseKeys = Object.keys(responseObj);
              const isExpanded = expandedResponseId === (response.id || response._id);
              const responseId = response.id || response._id;

              return (
                <div
                  key={responseId}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/80 shadow-xs hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Accordion Card Header */}
                  <div
                    onClick={() => toggleAccordion(responseId)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4 pr-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center text-lg flex-shrink-0">
                        📊
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {response.survey?.title || "Untitled Survey"}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {responseKeys.length} Question{responseKeys.length === 1 ? "" : "s"} Answered
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this survey response?")) {
                            handleDelete(responseId);
                          }
                        }}
                        disabled={deletingId === responseId}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 text-xs font-semibold transition-colors disabled:opacity-50"
                      >
                        {deletingId === responseId ? "Deleting..." : "Delete"}
                      </button>

                      <span className="text-gray-400 transform transition-transform duration-200">
                        <svg
                          className={`w-5 h-5 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Accordion Card Content Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700/60 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                        Submitted Answers
                      </h4>

                      {responseKeys.map((key, idx) => {
                        const item = responseObj[key];
                        return (
                          <div
                            key={key || idx}
                            className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-2xs space-y-1.5"
                          >
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              Question {idx + 1}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.questionText || item.question || `Question ${idx + 1}`}
                            </p>
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-700/40 flex items-start space-x-2 text-xs">
                              <span className="font-semibold text-gray-500 dark:text-gray-400">Answer:</span>
                              <span className="text-gray-800 dark:text-gray-200 font-medium">
                                {item.optionText || item.answer || item.response || JSON.stringify(item)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 shadow-xs">
            <span className="text-4xl block mb-2">📝</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              No Survey Responses Yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1 mb-6">
              You haven&apos;t participated in any surveys yet. Explore active community surveys to share your feedback!
            </p>
            <Link
              to="/surveys"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Explore Surveys
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyResponses;