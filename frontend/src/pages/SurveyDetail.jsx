import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import SurveyLogo from "../assets/survey-goals.jpg";

import {
  updateSurvey,
  getSurvey,
  deleteSurvey,
  resetVariables,
} from "../features/survey/surveySlice";

const SurveyDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [isQuestionModalOpen, setIsQuestionModalOpened] = useState(false);

  const closeQuestionModal = () => {
    setIsQuestionModalOpened(false);
  };

  const openQuestionModal = () => {
    setIsQuestionModalOpened(true);
  };

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

  return (
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
            {errors.title && <p className="text-red-500">Title is required.</p>}
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
              className="shadow mx-3 bg-gray-500 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
      />
    </form>
  );
};

export default SurveyDetail;
