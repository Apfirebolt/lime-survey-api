import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { createSurvey, resetVariables } from "../features/survey/surveySlice";
import SurveyLogo from "../assets/survey-goals.jpg";

const AddSurvey = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "General",
      questions: [{ questionText: "", type: "text" }],
    },
  });

  // Dynamic question fields using react-hook-form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.survey
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to create survey");
      dispatch(resetVariables());
    }

    if (isSuccess) {
      toast.success("Survey created successfully!");
      dispatch(resetVariables());
      navigate("/surveys");
    }
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (data) => {
    dispatch(createSurvey(data));
  };

  const categories = ["General", "Technology", "Education", "Feedback", "Business", "Lifestyle"];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
              <span>📊 Create Content</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Create New Survey</h1>
            <p className="text-emerald-100 text-sm mt-1">
              Design your survey questions and gather public feedback from the community.
            </p>
          </div>
          <Link
            to="/surveys"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Surveys</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Visual Banner & Metadata */}
            <div className="lg:col-span-1 flex flex-col justify-between p-6 bg-emerald-50/50 dark:bg-gray-800/80 rounded-2xl border border-emerald-100 dark:border-gray-700">
              <div>
                <img
                  src={SurveyLogo}
                  alt="Survey Goals"
                  className="w-full h-auto object-cover rounded-xl shadow-sm mb-4"
                />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Survey Guidelines
                </h3>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  <li>Keep titles concise and descriptive.</li>
                  <li>Explain why feedback is being gathered.</li>
                  <li>Add multiple questions to get complete results.</li>
                </ul>
              </div>

              {/* Category Picker */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                  Select Category
                </label>
                <select
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  {...register("category")}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column: Title, Description & Dynamic Questions */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Survey Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Community Library Feedback 2026"
                  className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.title
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                  }`}
                  {...register("title", {
                    required: "Survey Title is required",
                    minLength: { value: 5, message: "Title must be at least 5 characters" },
                  })}
                />
                {errors.title && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Survey Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Provide brief context regarding what this survey covers..."
                  className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.description
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                      : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                  }`}
                  {...register("description", {
                    required: "Survey Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                  })}
                />
                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Dynamic Questions Builder */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Survey Questions
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Add custom questions for respondents to answer.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => append({ questionText: "", type: "text" })}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                  >
                    <span>+ Add Question</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                        Q{index + 1}
                      </span>

                      <input
                        type="text"
                        placeholder="Enter question text..."
                        className="flex-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        {...register(`questions.${index}.questionText`)}
                      />

                      <select
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:outline-none"
                        {...register(`questions.${index}.type`)}
                      >
                        <option value="text">Text Response</option>
                        <option value="rating">Rating (1-5)</option>
                        <option value="multiple">Multiple Choice</option>
                      </select>

                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove Question"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end space-x-3">
            <Link
              to="/surveys"
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-semibold transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Publishing Survey...</span>
                </>
              ) : (
                <span>Publish Survey</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSurvey;