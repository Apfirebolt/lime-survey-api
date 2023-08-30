import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

import { getUserResponses, deleteUserResponse } from "../features/userResponse/userResponseSlice";

const MyResponses = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    dispatch(getUserResponses());
  }, [dispatch]);

  const { isLoading, isSuccess, isError, message, responses } = useSelector((state) => state.response);

  useEffect(() => {

    if (isError) {
      toast.error(message)
      
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage)
    }
  }, [dispatch, isError, isSuccess, message, toastMessage])

//   const deleteResponseUtil = () => {
//     deleteUserResponse(params.id)
//     setToastMessage('Survey response deleted successfully!')
//   }

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
                <p>{response.survey_id}</p>
                <p>
                    {response.response}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyResponses;