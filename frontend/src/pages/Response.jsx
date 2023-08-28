import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getSurvey } from "../features/survey/surveySlice";

const SurveyResponse = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getSurvey(params.id));
  }, [dispatch, params.id]);

  const { survey } = useSelector((state) => state.survey);

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

                  <p className="my-3 text-gray-500 font-medium text-lg">
                    {question.options.length > 0 ? "Options" : ""}
                  </p>
                  {question.options &&
                    question.options.map((option) => (
                      <p key={option.id}>{option.optionText}</p>
                    ))}
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default SurveyResponse;



