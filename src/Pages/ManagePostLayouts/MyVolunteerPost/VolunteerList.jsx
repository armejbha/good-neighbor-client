import React, { use } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const VolunteerList = ({ volunteerPostByEmail }) => {
  const volunteers = use(volunteerPostByEmail);
  
  const hasPosts = Array.isArray(volunteers) && volunteers.length > 0;

  return (
    <div className="md:p-4 max-w-6xl md:ml-17">
      <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
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
                      <button
                        className="btn btn-sm btn-info text-white px-3 tooltip"
                        data-tip="Edit"
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button

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
