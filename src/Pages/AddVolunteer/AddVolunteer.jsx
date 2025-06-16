import React, { useState, useContext, useRef } from "react";
import DatePicker from "react-datepicker";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

const VolunteerPostForm = () => {
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date());
  const datepickerRef = useRef(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

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
    const postData = {
      thumbnail: form.thumbnail.value,
      postTitle: form.postTitle.value,
      description: form.description.value,
      category,
      location: form.location.value,
      volunteersNeeded: Number(form.volunteersNeeded.value),
      deadline: formatDate(deadline),
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/volunteers",
        postData
      );

      if (res.data.insertedId) {
        toast.success("Volunteer post added!");
        form.reset();
        setDeadline(new Date());
        setCategory("");
        navigate("/allVolunteer");
      }
    } catch (err) {
      toast.error("Failed to submit post");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Create a Volunteer Post
        </h1>
        <p className="mt-2">
          Let others join your cause by posting a new opportunity.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-lg border space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thumbnail */}
          <div>
            <label className="block mb-1 font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Post Title */}
          <div>
            <label className="block mb-1 font-medium ">Post Title</label>
            <input
              type="text"
              name="postTitle"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Category + Deadline inline */}
          <div>
            <label className="block mb-1 font-medium ">Category</label>
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

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium ">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* No. of volunteers */}
          <div>
            <label className="block mb-1 font-medium ">Volunteers Needed</label>
            <input
              type="number"
              name="volunteersNeeded"
              min={1}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium ">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Organizer Info (readonly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium ">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Organizer Email</label>
            <input
              type="email"
              name="organizerEmail"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <input
            type="submit"
            value="Add Post"
            className="hover:cursor-pointer bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium"
          />
        </div>
      </form>
    </div>
  );
};

export default VolunteerPostForm;
