import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";

const VolunteerList = ({ volunteerPostByEmail }) => {
  const { user } = useContext(AuthContext);
  const volunteerData = use(volunteerPostByEmail);
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setVolunteers(volunteerData);
  }, [volunteerData]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://good-neighbor-server.vercel.app/volunteers/${id}`,
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The post has been removed.", "success");
          setVolunteers((prev) => prev.filter((post) => post._id !== id));
        } else {
          Swal.fire("Error", "Failed to delete the post.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };
  const hasPosts = Array.isArray(volunteers) && volunteers.length > 0;

  return (
    <div className="md:p-4 max-w-6xl md:ml-17">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>
      <h3 className="text-3xl font-semibold mb-10 text-center text-primary">
        My Created Volunteer Need Posts
      </h3>

      {hasPosts ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-bordered w-full border border-gray-300">
            {/* Table Head */}
            <thead className="bg-base-200 text-base-content text-lg">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer, index) => (
                <tr key={volunteer._id} className="hover">
                  <td className="font-bold">{index + 1}</td>
                  <td>{volunteer.postTitle}</td>
                  <td>{volunteer.category}</td>
                  <td>{volunteer.location}</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        to={`/manageMyPost/updateVolunteer/${volunteer._id}`}
                      >
                        <button
                          className="btn btn-sm btn-info text-white px-3 tooltip"
                          data-tip="Edit"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(volunteer._id)}
                        className="btn btn-sm btn-error text-white px-3 tooltip"
                        data-tip="Delete"
                        aria-label="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500">
            🚫 You haven't added any volunteer need posts yet.
          </p>
          <p className="text-md text-gray-400 mt-1">
            {" "}
            <Link to="/addVolunteer">
              <span className="font-bold text-2xl">
                Add Volunteer Need Post
              </span>
            </Link>{" "}
            <br />
            page to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
