import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SurveyRadio from "../components/SurveyRadio";

import { getSurvey } from "../features/survey/surveySlice";

const SurveyResponse = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [jsonResponse, setJSONResponse] = useState({});

  useEffect(() => {
    dispatch(getSurvey(params.id));
  }, [dispatch, params.id]);

  const { survey } = useSelector((state) => state.survey);

  const collectResponse = (question, option) => {
    let currentResponse = {...jsonResponse};
    currentResponse[question.id] = option;
    setJSONResponse(currentResponse);
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
            onClick={() => console.log(jsonResponse)}
          >
            Submit Response
          </button>
        </div>
      </div>
    </>
  );
};

export default SurveyResponse;
