import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThLarge, FaTable } from "react-icons/fa";
import VolunteerCard from "../Shared/VolunteerCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const AllVolunteerNeed = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const navigate = useNavigate();

  // Load saved view type and fetch volunteers
  useEffect(() => {
    const savedView = localStorage.getItem("viewType") || "grid";
    setViewType(savedView);
    fetchVolunteers();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch volunteers from backend
  const fetchVolunteers = async (query = "") => {
    try {
      const res = await axios.get(
        `http://localhost:3000/volunteers${query ? `?search=${query}` : ""}`
      );
      setVolunteers(res.data);
    } catch (error) {
      console.error("Failed to fetch volunteers", error);
    }
  };

  // Search handler
  const handleSearch = () => {
    fetchVolunteers(searchQuery);
  };

  // Toggle view and persist to localStorage
  const handleViewChange = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleViewChange("grid")}
            className={`text-2xl ${
              viewType === "grid" ? "text-primary" : "text-gray-400"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => handleViewChange("table")}
            className={`text-2xl ${
              viewType === "table" ? "text-primary" : "text-gray-400"
            }`}
          >
            <FaTable />
          </button>
        </div>
      </div>

      {/* Render Volunteers */}
      {viewType === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {volunteers.map((post) => (
            <VolunteerCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-bordered w-full border border-gray-300">
            <thead>
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Location</th>
                <th>Volunteers Needed</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td>{post.postTitle}</td>
                  <td>{post.location}</td>
                  <td>{post.volunteersNeeded}</td>
                  <td>{post.deadline}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => navigate(`/volunteerDetails/${post._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllVolunteerNeed;
