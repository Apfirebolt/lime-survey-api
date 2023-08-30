import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import {
  getUserResponses,
  deleteUserResponse,
} from "../features/userResponse/userResponseSlice";

const MyResponses = () => {
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState("");

  const { isLoading, isSuccess, isError, message, responses } = useSelector(
    (state) => state.response
  );

  useEffect(() => {
    dispatch(getUserResponses());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage);
    }
  }, [dispatch, isError, isSuccess, message, toastMessage]);

  const deleteResponseUtil = async (responseId) => {
    await dispatch(deleteUserResponse(responseId));
    setToastMessage("User response deleted successfully!");
    dispatch(getUserResponses());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              My Responses
            </h1>
          </div>
        </div>
        {responses &&
          responses.map((response) => (
            <div
              className="w-3/4 mx-auto my-1"
              key={response.id}
            >
              <h3 className="text-center my-3 text-xl font-semibold border-b-orange-400">{response.survey.title}</h3>
              <div className="shadow bottom-3 w-4/5 text-gray-700 px-3 py-4">
              {Object.keys(JSON.parse(response.response)).map((item) => (
                  <div className="my-3 px-3 py-4 bg-blue-100 text-gray-700" key={item}>
                    <p>
                      <span className="text-gray-900 font-semibold">Question : </span>{JSON.parse(response.response)[item].questionText}
                    </p>
                    <p>
                      <span className="text-gray-900 font-semibold">Answer :</span> {JSON.parse(response.response)[item].optionText}
                    </p>
                  </div>
                ))}
              </div>
              <button onClick={() => deleteResponseUtil(response.id)} className="bg-red-500 mx-auto my-3 rounded hover:bg-red-800 p-3 text-gray-100">
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyResponses;
