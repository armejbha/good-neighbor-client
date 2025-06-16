import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import Loading from "../Shared/Loading";
import { AuthContext } from "../../Context/AuthContext";

const VolunteerDetails = () => {
  const { theme } = useContext(AuthContext);
  const volunteer = useLoaderData();
  console.log(volunteer);
  const navigate = useNavigate();

  if (!volunteer) return <Loading></Loading>;

  const {
    postTitle,
    category,
    description,
    deadline,
    thumbnail,
    location,
    volunteersNeeded,
    organizerName,
    organizerEmail,
  } = volunteer;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleJoin = () => {
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (today > deadlineDate) {
      Swal.fire({
        icon: "error",
        title: "Deadline Passed",
        text: "You can't join, the deadline is over.",
      });
      return;
    }

  
    // Add any logic here for joining action (e.g. POST request)
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto my-20 px-4">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-1 text-xl my-8 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={32} />
        Go Back
      </button>

      <div className="grid md:grid-cols-2 gap-1 shadow-lg rounded-2xl overflow-hidden border border-primary p-2 md:p-6">
        {/* Thumbnail */}
        <div className="h-full">
          <img
            src={thumbnail}
            alt={postTitle}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Post Info */}
        <div className="space-y-4 md:p-4">
          <h1 className="text-4xl font-bold text-primary">{postTitle}</h1>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Category:</strong> {category}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Location:</strong> {location}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Deadline:</strong> {formatDate(deadline)}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Volunteers Needed:</strong> {volunteersNeeded}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Description:</strong> {description}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Organizer Name:</strong> {organizerName}
          </p>
          <p
            className={`${theme === "light" ? "text-gray-700" : "text-white"}`}
          >
            <strong>Contact Email:</strong> {organizerEmail}
          </p>

          <button
            onClick={handleJoin}
            className="mt-6 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition duration-300"
          >
            Be a Volunteer
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;
