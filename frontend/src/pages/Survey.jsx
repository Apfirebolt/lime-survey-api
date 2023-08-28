import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSurveys } from "../features/survey/surveySlice";
import Loader from "../components/Loader";
import SurveyItem from "../components/Survey";

const Survey = () => {
  const dispatch = useDispatch();

  const { surveys, isLoading } = useSelector((state) => state.survey);

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 px-3 py-4">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Surveys</h1>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {surveys.length > 1 && surveys.map((survey, index) => (
          <SurveyItem key={index} survey={survey} />
        ))}
      </div>
    </div>
  );
};

export default Survey;
