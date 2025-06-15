import React from "react";
import { Link } from "react-router";

const VolunteerCard = ({ post }) => {
  const { thumbnail, postTitle, category, deadline, _id } = post;

  return (
    <div className="rounded-xl shadow-md border bg-white dark:bg-gray-800 overflow-hidden">
      <img
        src={thumbnail}
        alt={postTitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {postTitle}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Category: {category}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Deadline:{" "}
          {new Date(deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <Link to={`/volunteer/${_id}`}>
          <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerCard;
