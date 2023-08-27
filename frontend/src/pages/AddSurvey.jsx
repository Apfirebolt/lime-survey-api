import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register as registerFunc, reset } from "../features/auth/authSlice";
import SurveyLogo from "../assets/survey-goals.jpg";

const AddSurvey = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Add Survey
          </h1>

          <form
            onSubmit={handleSubmit((data) => dispatch(registerFunc(data)))}
            className="my-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex justify-center">
                <img src={SurveyLogo} alt="logo" />
              </div>

              <div className="flex flex-col">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Survey Title
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
                    htmlFor="username"
                  >
                    Survey Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    type="text"
                    rows={10}
                    placeholder="Survey Description"
                    {...register("description", { required: true })}
                  >
                  </textarea>
                  {errors.description && (
                    <p className="text-red-500">Description is required.</p>
                  )}
                </div>
      
                <input
                  className="shadow bg-green-500 hover:bg-green-700 hover:cursor-pointer focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  value="Add Survey"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSurvey;
