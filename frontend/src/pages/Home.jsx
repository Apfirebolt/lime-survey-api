import React from "react";
import { useSelector } from "react-redux";


const Home = () => {
  const { profile } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Public opinion matters.
            <strong className="font-extrabold text-green-500 sm:block">
              Lime Survey.
            </strong>
          </h1>

          {profile && (
            <h1 className="text-xl my-4 font-extrabold sm:text-2xl">
              Welcome to The Lime Survey,
              <strong className="font-extrabold text-blue-700 sm:block">
                {profile.username}
              </strong>
            </h1>
          )}

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            A survey portal to manage surveys and get public opinion which matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;