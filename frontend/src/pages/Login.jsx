import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, reset } from "../features/auth/authSlice";
// import image from assets
import SurveyLogo from "../assets/survey-goals.jpg";

const Login = () => {
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

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <form
      onSubmit={handleSubmit((data) => dispatch(login(data)))}
      className="sm:w-3/4 mx-auto my-3"
    >
      <p className="text-center font-bold text-2xl my-8 text-gray-700">LOGIN</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <img src={SurveyLogo} alt="logo" className="w-1/2" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && <p className="text-red-500">Email is required.</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required.</p>
            )}
          </div>

          <input
            className="shadow bg-green-500 hover:bg-green-700 hover:cursor-pointer focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value="Sign In"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
