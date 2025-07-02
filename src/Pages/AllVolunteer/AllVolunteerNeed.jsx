import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThLarge, FaTable } from "react-icons/fa";
import VolunteerCard from "../Shared/VolunteerCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import Loading from "../Shared/Loading";

const AllVolunteerNeed = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [deadlineSort, setDeadlineSort] = useState("");
  const [titleSort, setTitleSort] = useState("");
  const navigate = useNavigate();

  // Load saved view and fetch data on filter change
  useEffect(() => {
    const savedView = localStorage.getItem("viewType") || "grid";
    setViewType(savedView);
  }, []);

  // Fetch volunteers whenever filters change
  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (deadlineSort) params.append("deadline", deadlineSort);
        if (titleSort) params.append("title", titleSort);

        const res = await axios.get(
          `https://good-neighbor-server.vercel.app/volunteers?${params}`
        );
        setVolunteers(res.data);
      } catch (error) {
        console.error("Failed to fetch volunteers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, [searchQuery, deadlineSort, titleSort]);

  // View toggle
  const handleViewChange = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 md:px-0">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearchQuery(e.target.value);
            }}
          />
          <button
            onClick={() => setSearchQuery(searchQuery)}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered"
            value={deadlineSort}
            onChange={(e) => setDeadlineSort(e.target.value)}
          >
            <option value="">Sort by Deadline</option>
            <option value="latest">New to Old</option>
            <option value="oldest">Old to New</option>
          </select>
          <select
            className="select select-bordered"
            value={titleSort}
            onChange={(e) => setTitleSort(e.target.value)}
          >
            <option value="">Sort by Title</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>

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
      </div>

      {/* Render Volunteers */}
      {viewType === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
