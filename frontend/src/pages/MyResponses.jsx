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

  const { isLoading, isSuccess, isError, message, responses, resetVariables } = useSelector(
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
              className="flex w-3/4 mx-auto justify-around items-center my-1"
              key={response.id}
            >
              <div className="shadow bottom-3 md:grid-cols-4 w-4/5 text-gray-700 px-3 py-4">
              {Object.keys(JSON.parse(response.response)).map((item) => (
                  <div className="my-3 px-3 py-4 bg-blue-700 text-gray-100" key={item}>
                    <p>
                      Question {JSON.parse(response.response)[item].questionText}
                    </p>
                    <p>
                      Answer: {JSON.parse(response.response)[item].optionText}
                    </p>
                  </div>
                ))}
              </div>
              <button onClick={() => deleteResponseUtil(response.id)} className="bg-red-500 rounded hover:bg-red-800 p-3 text-gray-100">
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyResponses;
