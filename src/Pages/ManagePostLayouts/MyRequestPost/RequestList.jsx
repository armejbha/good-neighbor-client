import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

const RequestList = ({ volunteerRequestByEmail }) => {
  const initialRequests = use(volunteerRequestByEmail);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this volunteer request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/volunteers/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "The request has been cancelled.", "success");

          // ✅ Immediately remove from frontend state
          setRequests((prev) => prev.filter((r) => r._id !== id));
        } else {
          Swal.fire("Error", "Failed to cancel the request.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const hasRequests = Array.isArray(requests) && requests.length > 0;

  return (
    <div className="md:p-4 max-w-6xl md:ml-17">
      <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
        My Volunteer Requests Post
      </h3>

      {hasRequests ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-bordered w-full border border-gray-300">
            {/* Table Head */}
            <thead className="bg-base-200 text-base-content text-lg">
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Organizer Name</th>
                <th>Organizer Email</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="hover">
                  <td className="font-bold">{index + 1}</td>
                  <td>{request.postTitle}</td>
                  <td>{request.organizerName}</td>
                  <td>{request.organizerEmail}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-sm btn-warning text-white"
                      aria-label="Cancel Request"
                    >
                      Cancel Confirmation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-500">
            🚫 You haven’t received any volunteer requests yet.
          </p>
          <p className="text-md text-gray-400 mt-1">
            Requests from volunteers who want to help you will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestList;
