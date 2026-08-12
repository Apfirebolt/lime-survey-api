import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

// Assuming these actions and selectors exist based on previous interactions
import { getSurvey, resetVariables as resetSurveyVariables } from "../features/survey/surveySlice";
import { createUserResponse, resetVariables as resetResponseVariables } from "../features/userResponse/userResponseSlice";

const SurveyResponse = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [jsonResponse, setJSONResponse] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  // Get current survey data
  const { survey, isLoading: isSurveyLoading, isError: isSurveyError, message: surveyErrorMessage } = useSelector((state) => state.survey);
  
  // Get response submission state
  const { isLoading: isSubmitLoading, isSuccess: isSubmitSuccess, isError: isSubmitError, message: submitErrorMessage } = useSelector((state) => state.response);

  // Fetch survey data on load
  useEffect(() => {
    dispatch(getSurvey(params.id));
    
    // Cleanup variables on unmount
    return () => {
      dispatch(resetSurveyVariables());
      dispatch(resetResponseVariables());
    };
  }, [dispatch, params.id]);

  // Handle errors and success
  useEffect(() => {
    // Handle survey fetch error
    if (isSurveyError) {
      toast.error(surveyErrorMessage || "Failed to load survey.");
    }

    // Handle response submission error
    if (isSubmitError) {
      toast.error(submitErrorMessage || "Failed to submit response.");
      dispatch(resetResponseVariables()); // Reset error state
    }

    // Handle response submission success
    if (isSubmitSuccess && toastMessage) {
      toast.success(toastMessage);
      dispatch(resetResponseVariables()); // Reset success state before navigating
      navigate("/my-responses");
    }
  }, [dispatch, isSurveyError, surveyErrorMessage, isSubmitError, submitErrorMessage, isSubmitSuccess, navigate, toastMessage]);

  const collectResponse = (questionId, questionText, optionId, optionText) => {
    setJSONResponse((prev) => ({
      ...prev,
      [questionId]: {
        questionText: questionText,
        optionId: optionId, // Useful for backend analytics
        optionText: optionText,
      },
    }));
  };

  const submitUserResponse = () => {
    // Basic validation: ensure all questions are answered
    if (!areAllQuestionsAnswered) {
      toast.warning("Please answer all questions before submitting.");
      return;
    }

    const data = {
      survey_id: survey.id,
      // Format response keys as required by backend (keys must be strings for JSON.stringify)
      response: JSON.stringify(jsonResponse), 
    };
    dispatch(createUserResponse(data));
    setToastMessage("Survey response submitted successfully!");
  };

  const questionsList = survey?.questions || [];

  // Memoized calculations for progress
  const totalQuestions = questionsList.length;
  const answeredCount = Object.keys(jsonResponse).length;
  const areAllQuestionsAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  if (isSurveyLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Modern Hero Header Banner */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700/60">
            <div>
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
                <span>📝 Community Feedback</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Take Survey: {survey?.title || "Loading Survey..."}
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {survey?.description || "Your opinion matters. Please answer the questions below."}
              </p>
            </div>
            <Link
              to="/surveys"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Cancel</span>
            </Link>
          </div>

          {/* Progress Tracker Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Your Progress</span>
              <span>
                {answeredCount} of {totalQuestions} Questions Answered ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 dark:bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Survey Questions List */}
        {questionsList.length > 0 ? (
          <div className="space-y-6">
            {questionsList.map((question, index) => {
              const isAnswered = jsonResponse.hasOwnProperty(question.id);
              
              return (
                <div
                  key={question.id || index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xs border transition-all duration-200 ${
                    isAnswered
                      ? "border-emerald-200 dark:border-emerald-800 ring-1 ring-emerald-100 dark:ring-emerald-900"
                      : "border-gray-100 dark:border-gray-700/80 hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  {/* Question Title */}
                  <div className="flex items-start space-x-4 mb-6 pb-5 border-b border-gray-100 dark:border-gray-700/60">
                    <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 font-extrabold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white pt-0.5">
                      {question.questionText}
                    </h2>
                  </div>

                  {/* Options List (Radio Buttons) */}
                  {question.options && question.options.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {question.options.map((option) => {
                        const optionId = option.id || option._id;
                        const isSelected = jsonResponse[question.id]?.optionId === optionId;

                        return (
                          <button
                            key={optionId}
                            type="button"
                            onClick={() => collectResponse(question.id, question.questionText, optionId, option.optionText)}
                            className={`group flex items-center justify-between px-5 py-4 rounded-xl border transition-all text-left ${
                              isSelected
                                ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-100"
                                : "bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500"
                            }`}
                          >
                            <span className={`text-sm font-medium ${isSelected ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-800 dark:text-gray-200'}`}>
                              {option.optionText}
                            </span>
                            
                            {/* Custom Radio Indicator */}
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ml-4 ${
                              isSelected 
                                ? "border-emerald-600 dark:border-emerald-500 bg-emerald-600 dark:bg-emerald-500" 
                                : "border-gray-300 dark:border-gray-600 group-hover:border-emerald-500 bg-white dark:bg-gray-900"
                            }`}>
                              {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-white dark:bg-gray-900"></div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">
                      No options available for this question.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 shadow-xs">
            <span className="text-4xl block mb-2">🤷‍♂️</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Survey has no questions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-1">
              It seems this survey was published without any questions. There is nothing to respond to!
            </p>
          </div>
        )}

        {/* Form Actions Footer */}
        <footer className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Ready to submit your opinions?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-0.5">
              Please ensure you have answered all {totalQuestions} questions before finalizing your response.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/surveys"
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-semibold transition-colors"
            >
              Cancel
            </Link>
            
            <button
              onClick={submitUserResponse}
              disabled={isSubmitLoading || !areAllQuestionsAnswered || questionsList.length === 0}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Final Response</span>
              )}
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default SurveyResponse;