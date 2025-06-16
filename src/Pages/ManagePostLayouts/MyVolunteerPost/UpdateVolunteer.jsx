import React, { useContext, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosArrowRoundBack } from "react-icons/io";

const UpdateVolunteer = () => {
  const volunteer = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const datepickerRef = useRef(null);

  const [deadline, setDeadline] = useState(new Date(volunteer?.deadline));
  const [category, setCategory] = useState(volunteer?.category || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formatDate = (date) => {
      const d = new Date(date);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    };

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category,
      location: form.location.value,
      volunteersNeeded: Number(form.volunteersNeeded.value),
      deadline: formatDate(deadline),
      organizerName: form.organizerName.value,
      organizerEmail: form.organizerEmail.value,
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/volunteers/${volunteer._id}`,
        updatedPost
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Volunteer post updated successfully!");
        navigate("/manageMyPost/myVolunteerPost");
      } else {
        toast.info("No changes were made.");
      }
    } catch (err) {
      toast.error("Failed to update post");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto  px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Update Volunteer Post
        </h1>
        <p className="mt-2 text-gray-500">
          Make changes to your volunteer opportunity details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-lg border space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              defaultValue={volunteer.thumbnail}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Post Title</label>
            <input
              type="text"
              name="postTitle"
              required
              defaultValue={volunteer.postTitle}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="social service">Social Service</option>
              <option value="animal welfare">Animal Welfare</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <div
              className="relative cursor-pointer input input-bordered w-full pr-10"
              onClick={() => datepickerRef.current?.setFocus()}
            >
              <DatePicker
                ref={datepickerRef}
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                minDate={new Date()}
                dateFormat="dd MMM yyyy"
              />
              <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              defaultValue={volunteer.location}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Volunteers Needed</label>
            <input
              type="number"
              name="volunteersNeeded"
              required
              min={1}
              defaultValue={volunteer.volunteersNeeded}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            defaultValue={volunteer.description}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              defaultValue={volunteer.organizerName}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Organizer Email</label>
            <input
              type="email"
              name="organizerEmail"
              defaultValue={volunteer.organizerEmail}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <input
            type="submit"
            value="Update Post"
            className="hover:cursor-pointer bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateVolunteer;
