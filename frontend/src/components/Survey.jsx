import React from "react";
// Import link from react-router-dom
import { Link } from "react-router-dom";

const SurveyItem = (props) => {
  const { survey } = props;
  return (
    <div className="bg-gray-100 shadow-lg px-2 py-4">
      <p className="text-green-500 text-xl my-2">{survey.title}</p>
      <p className="text-gray-700 text-sm my-2">{survey.description}</p>
      <div className="my-1">
        <Link
          to={`/survey/${survey.id}`}
          className="inline-block bg-green-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default SurveyItem;
