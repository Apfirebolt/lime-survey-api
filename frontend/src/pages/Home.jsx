import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSurveys } from "../features/survey/surveySlice";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);
  const { surveys } = useSelector((state) => state.survey);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSurveys());
  }, [dispatch]);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            The Lime Survey
          </h1>

          {profile && (
            <h1 className="text-xl my-4 font-extrabold sm:text-2xl">
              Welcome to The Lime Survey,
              <strong className="font-extrabold text-blue-700 sm:block">
                {profile.username}
              </strong>
            </h1>
          )}

          <div className="grid md:grid-cols-4 gap-6 my-3">
            {surveys.length > 1 &&
              surveys.map((survey, index) => (
                <div
                  key={index}
                  className="bg-white shadow overflow-hidden sm:rounded-lg"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {survey.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {survey.description}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Created By
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {survey.createdBy}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Created At
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {survey.createdAt}
                        </dd>
                        <div className="my-1">
                          <Link
                            to={`/response/${survey.id}`}
                            className="inline-block bg-green-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            A survey portal to manage surveys and get public opinion which
            matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
