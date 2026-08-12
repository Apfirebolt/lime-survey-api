import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import AddOption from "../components/AddOption";
import ConfirmModal from "../components/ConfirmModal";
import SurveyLogo from "../assets/survey-goals.jpg";

import {
  updateSurvey,
  getSurvey,
  deleteSurvey,
  resetVariables,
} from "../features/survey/surveySlice";

import { createQuestion, deleteQuestion } from "../features/question/questionSlice";
import { createOption } from "../features/option/optionSlice";

const SurveyDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpened] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpened] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const closeModal = () => setIsConfirmModalOpen(false);
  const openModal = () => setIsConfirmModalOpen(true);

  const closeQuestionModal = () => setIsQuestionModalOpened(false);
  const openQuestionModal = () => setIsQuestionModalOpened(true);

  const closeOptionModal = () => setIsOptionModalOpened(false);
  const openOptionModal = () => setIsOptionModalOpened(true);

  const optionAddUtil = (data) => {
    setSelectedQuestion(data);
    openOptionModal();
  };

  useEffect(() => {
    dispatch(getSurvey(params.id));
  }, [dispatch, params.id]);

  const { survey, isError, isSuccess, message } = useSelector(
    (state) => state.survey
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage);
      dispatch(resetVariables());
    }
  }, [dispatch, isError, isSuccess, navigate, message, toastMessage]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (survey) {
      reset({
        title: survey.title || "",
        description: survey.description || "",
      });
    }
  }, [survey, reset]);

  const deleteSurveyUtil = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this entire survey?")) {
      setToastMessage("Survey successfully deleted!");
      dispatch(deleteSurvey(params.id));
      navigate("/surveys");
    }
  };

  const deleteQuestionUtil = async () => {
    setToastMessage("Question successfully deleted!");
    await dispatch(deleteQuestion(selectedQuestion.id));
    dispatch(getSurvey(params.id));
    closeModal();
  };

  const updateSurveyUtil = (data) => {
    setToastMessage("Survey successfully updated!");
    dispatch(updateSurvey({ ...data, id: survey.id || params.id }));
  };

  const addQuestionUtil = async (data) => {
    setToastMessage("Question successfully added!");
    await dispatch(createQuestion({ ...data, survey_id: survey.id || params.id }));
    dispatch(getSurvey(params.id));
    closeQuestionModal();
  };

  const addOptionUtil = async (data) => {
    setToastMessage("Option successfully added!");
    await dispatch(createOption({ ...data, question_id: selectedQuestion.id }));
    dispatch(getSurvey(params.id));
    closeOptionModal();
  };

  const confirmQuestionDeleteUtil = (data) => {
    setSelectedQuestion(data);
    setConfirmMessage(`Are you sure you want to delete question: "${data.questionText}"?`);
    openModal();
  };

  const questionsList = survey?.questions || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <span>⚙️ Manage Survey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Survey Details & Questions
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update metadata, configure survey questions, and manage response options.
            </p>
          </div>

          <Link
            to="/surveys"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Survey Metadata Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/80 p-6 sm:p-8">
          <form onSubmit={handleSubmit(updateSurveyUtil)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Visual Card */}
              <div className="lg:col-span-1 flex flex-col justify-between p-6 bg-emerald-50/50 dark:bg-gray-800/80 rounded-2xl border border-emerald-100 dark:border-gray-700/60">
                <div>
                  <img
                    src={SurveyLogo}
                    alt="Survey Goals"
                    className="w-full h-auto object-cover rounded-xl shadow-xs mb-4"
                  />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Survey Configuration
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Changes made here will be visible to all respondents taking this survey.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>Questions Configured: <strong className="text-gray-900 dark:text-white">{questionsList.length}</strong></p>
                </div>
              </div>

              {/* Right Column: Title & Description Fields */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Survey Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter survey title..."
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                    }`}
                    {...register("title", { required: true })}
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">Title is required.</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Survey Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    placeholder="Enter survey description..."
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.description
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-200 dark:focus:ring-emerald-900/50"
                    }`}
                    {...register("description", { required: true })}
                  />
                  {errors.description && <p className="mt-1 text-xs text-red-500 font-medium">Description is required.</p>}
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    Save & Update Survey
                  </button>
                  <button
                    type="button"
                    onClick={openQuestionModal}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-xs transition-colors"
                  >
                    + Add Question
                  </button>
                  <button
                    type="button"
                    onClick={deleteSurveyUtil}
                    className="px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-xs transition-colors ml-auto"
                  >
                    Delete Survey
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Questions & Options List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Configured Questions ({questionsList.length})
            </h2>
            <button
              type="button"
              onClick={openQuestionModal}
              className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
            >
              <span>+ Add Question</span>
            </button>
          </div>

          {questionsList.length > 0 ? (
            <div className="space-y-4">
              {questionsList.map((question, index) => (
                <div
                  key={question.id || index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xs border border-gray-100 dark:border-gray-700/80 space-y-4"
                >
                  {/* Question Title & Actions Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                        Q{index + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {question.questionText}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {question.options?.length || 0} option{(question.options?.length || 0) === 1 ? "" : "s"} defined
                        </p>
                      </div>
                    </div>

                    {/* Question Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => optionAddUtil(question)}
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        title="Add Option"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Add Option</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => confirmQuestionDeleteUtil(question)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        title="Delete Question"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Options List */}
                  {question.options && question.options.length > 0 ? (
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Options
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((option, optIdx) => (
                          <div
                            key={option.id || optIdx}
                            className="px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 text-xs font-medium text-gray-800 dark:text-gray-200 flex items-center space-x-2"
                          >
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>{option.optionText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 text-xs text-gray-400 italic">
                      No options added yet. Click &quot;Add Option&quot; above to append choice selections.
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No questions have been created for this survey yet.
              </p>
              <button
                type="button"
                onClick={openQuestionModal}
                className="mt-3 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                + Add First Question
              </button>
            </div>
          )}
        </div>

        {/* Modal Declarations */}
        <AddQuestion
          isOpen={isQuestionModalOpen}
          openModal={openQuestionModal}
          closeModal={closeQuestionModal}
          addQuestionUtil={addQuestionUtil}
        />

        <AddOption
          isOpen={isOptionModalOpen}
          openModal={openOptionModal}
          closeModal={closeOptionModal}
          addOptionUtil={addOptionUtil}
          selectedQuestion={selectedQuestion}
        />

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          confirmAction={deleteQuestionUtil}
          message={confirmMessage}
        />

      </div>
    </div>
  );
};

export default SurveyDetail;