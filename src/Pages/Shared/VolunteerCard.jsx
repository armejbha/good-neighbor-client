import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const VolunteerCard = ({ post }) => {
  const { thumbnail, postTitle, category, deadline, _id, description } = post;

  return (
    <motion.div
      whileHover={{ scale: 1.0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl shadow-md border-0 overflow-hidden bg-gray-800 flex flex-col"
    >
      <img
        src={thumbnail}
        alt={postTitle}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 flex flex-col flex-1 justify-between">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-100 mb-3 line-clamp-2">
          {postTitle}
        </h2>

        {/* Info + Button */}
        <div className="mt-auto">
          {/* <p className="text-sm text-gray-300 mb-1">Category: {category}</p>
          <p className="text-sm text-gray-300 mb-3">
            Deadline:{" "}
            {new Date(deadline).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p> */}
          <p className="text-gray-300 mb-3">
            {description.length > 60
              ? `${description.slice(0, 60)}...`
              : description}
          </p>

          <Link to={`/volunteerDetails/${_id}`}>
            <button className="w-full bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VolunteerCard;
