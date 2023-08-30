import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SurveyRadio from "../components/SurveyRadio";
import Loader from "../components/Loader";

import { getSurvey } from "../features/survey/surveySlice";
import { createUserResponse } from "../features/userResponse/userResponseSlice";

const SurveyResponse = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [jsonResponse, setJSONResponse] = useState({});
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    dispatch(getSurvey(params.id));
  }, [dispatch, params.id]);

  const { survey } = useSelector((state) => state.survey);
  const { isLoading, isSuccess, isError, message, resetVariables } = useSelector((state) => state.response);

  useEffect(() => {

    if (isError) {
      toast.error(message)
      dispatch(resetVariables())
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage)
      navigate('/my-responses')
    }
  }, [dispatch, isError, isSuccess, message, navigate, resetVariables, toastMessage])

  const collectResponse = (question, option) => {
    let currentResponse = {...jsonResponse};
  
    currentResponse[question.id] = {
      questionText: question.questionText,
      optionText: option
    };
    setJSONResponse(currentResponse);
  }

  const submitUserResponse = () => {
    const data = {
      survey_id: survey.id,
      response: JSON.stringify(jsonResponse)
    }
    dispatch(createUserResponse(data));
    setToastMessage('Survey response submitted successfully!')
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Survey Response - {survey && survey.title}
            </h1>
          </div>
        </div>
        {survey.questions &&
          survey.questions.map((question) => (
            <div
              className="flex w-3/4 mx-auto justify-around items-center my-1"
              key={question.id}
            >
              <div className="shadow bottom-3 md:grid-cols-4 w-4/5 text-gray-700 px-3 py-4">
                <p>{question.questionText}</p>
                {question.options && <SurveyRadio options={question.options} question={question} collectResponse={collectResponse} />}
              </div>
            </div>
          ))}

        <div className="flex justify-center my-3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={() => submitUserResponse()}
          >
            Submit Response
          </button>
        </div>
      </div>
    </>
  );
};

export default SurveyResponse;
