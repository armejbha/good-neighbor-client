import React, { use } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const VolunteerList = ({ volunteerPostByEmail }) => {
  const volunteers = use(volunteerPostByEmail);

  return (
    <div className="md:p-4 max-w-6xl md:ml-18">
      <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
        My Created Volunteer Need Posts
      </h3>
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
                <td className="space-x-2 text-center flex items-center justify-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerList;
