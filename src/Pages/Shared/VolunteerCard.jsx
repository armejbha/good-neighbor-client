import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
const VolunteerCard = ({ post }) => {
  const { thumbnail, postTitle, category, deadline, _id } = post;
  console.log(_id);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl shadow-md border overflow-hidden bg-white dark:bg-gray-800"
    >
      <img
        src={thumbnail}
        alt={postTitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {postTitle}
        </h2>
        <p className="text-sm mb-1 text-gray-600 dark:text-gray-300">
          Category: {category}
        </p>
        <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">
          Deadline:{" "}
          {new Date(deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <Link to={`/volunteerDetails/${_id}`}>
          <button className="hover:cursor-pointer bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default VolunteerCard;
