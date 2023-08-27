import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import AddOption from "../components/AddOption";
import SurveyLogo from "../assets/survey-goals.jpg";

import {
  updateSurvey,
  getSurvey,
  deleteSurvey,
  resetVariables,
} from "../features/survey/surveySlice";

import { createQuestion } from "../features/question/questionSlice";
import { createOption } from "../features/option/optionSlice";

const SurveyDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpened] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpened] = useState(false);

  const closeQuestionModal = () => {
    setIsQuestionModalOpened(false);
  };

  const openQuestionModal = () => {
    setIsQuestionModalOpened(true);
  };

  const closeOptionModal = () => {
    setIsOptionModalOpened(false);
  };

  const openOptionModal = () => {
    setIsOptionModalOpened(true);
  };

  const optionAddUtil = (data) => {
    setSelectedQuestion(data)
    openOptionModal()
  }


  useEffect(() => {
    dispatch(getSurvey(params.id));
  }, [dispatch, params.id]);

  const { survey, isError, isSuccess, message } = useSelector(
    (state) => state.survey
  );

  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    if (isError) {
      toast.error(message, toastOptions);
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage, toastOptions);
      dispatch(resetVariables());
      navigate("/survey");
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
    reset({
      title: survey.title,
      description: survey.description,
    });
  }, [survey, reset]);

  const deleteSurveyUtil = (e) => {
    e.preventDefault();
    setToastMessage("Survey successfully deleted!");
    dispatch(deleteSurvey(params.id));
  };

  const updateSurveyUtil = (data) => {
    setToastMessage("Survey successfully updated!");
    data.id = survey.id;
    dispatch(updateSurvey(data));
  };

  const addQuestionUtil = (data) => {
    setToastMessage("Question successfully added!");
    dispatch(createQuestion({ ...data, survey_id: survey.id }));
  };

  const addOptionUtil = (data) => {
    setToastMessage("Option successfully added!");
    dispatch(createOption({ ...data, question_id: selectedQuestion.id }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => updateSurveyUtil(data))}
        className="sm:w-3/4 mx-auto my-3"
      >
        <p className="text-center font-bold text-2xl my-8 text-gray-700">
          SURVEY DETAIL
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <img src={SurveyLogo} alt="logo" className="w-1/2" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Survey Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Title is required.</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Survey Description"
                rows="10"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">Description is required.</p>
              )}
            </div>

            <div>
              <input
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Update Survey"
              />
              <button
                onClick={(e) => deleteSurveyUtil(e)}
                className="shadow mx-3 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Delete Survey
              </button>
              <button
                type="button"
                onClick={() => openQuestionModal()}
                className="shadow bg-gray-500 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
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
      </form>
      {survey.questions && survey.questions.length > 0 && (
        <div className="sm:w-3/4 mx-auto my-5">
          <p className="text-center font-bold text-xl my-8 text-gray-700">
            SURVEY QUESTIONS
          </p>
        </div>
      )}
      {survey.questions &&
        survey.questions.map((question) => (
          <div
            className="flex w-3/4 mx-auto justify-around items-center my-1"
            key={question.id}
          >
            <div className="shadow bottom-3 md:grid-cols-4 w-4/5 text-gray-700 px-3 py-4">
              <p>
              {question.questionText}
              </p>

              <p className="my-3 text-gray-500 font-medium text-lg">{question.options.length > 0 ? 'Options': ''}</p>
              {question.options && question.options.map((option) => (
              <p>
                {option.optionText}
              </p>
            ))}
            </div>

            <div className="flex justify-start">
              <svg
                onClick={() => optionAddUtil(question)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
        ))}
    </>
  );
};

export default SurveyDetail;
