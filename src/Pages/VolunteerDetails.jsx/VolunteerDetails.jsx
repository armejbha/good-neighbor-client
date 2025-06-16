import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Loading from "../Shared/Loading";
import axios from "axios";

Modal.setAppElement("#root");

const VolunteerDetails = () => {
  const { theme, user } = useContext(AuthContext);
  const { id } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [neededCount, setNeededCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:3000/volunteersDetails/${id}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((response) => {
        setVolunteer(response.data);
        setNeededCount(response.data.volunteersNeeded);
      })
      .catch((err) => {
        setError("Failed to fetch volunteer details");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (requestSuccess) {
      Swal.fire("Requested!", "Your request has been submitted", "success");
      setRequestSuccess(false);
    }
  }, [requestSuccess]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!volunteer)
    return <p className="text-center mt-10">No volunteer found</p>;

  const {
    _id,
    postTitle,
    category,
    description,
    deadline,
    thumbnail,
    location,
    organizerName,
    organizerEmail,
  } = volunteer;

  const formattedDate = new Date(deadline).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const openModal = () => {
    const today = new Date();
    const postDeadline = new Date(deadline);
    if (today > postDeadline) {
      Swal.fire("Deadline Passed", "You can't apply anymore", "error");
      return;
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      postId: _id,
      postTitle,
      description,
      category,
      location,
      deadline,
      organizerName,
      organizerEmail,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested",
      thumbnail,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/volunteerRequests",
        requestData
      );

      if (res.data.insertedId) {
        const patchRes = await axios.patch(
          `http://localhost:3000/volunteers/${_id}/decrement`
        );
        if (patchRes.data) {
          setNeededCount((prev) => prev - 1);
          setRequestSuccess(true);
        }

        closeModal();
      }
    } catch (error) {
      console.error("Request failed:", error);
      Swal.fire("Error", "Failed to send request", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-20 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      <div className="grid md:grid-cols-2 gap-6 shadow-lg rounded-xl border border-primary p-4 md:p-8">
        <img
          src={thumbnail}
          alt={postTitle}
          className="rounded-xl w-full h-full object-cover"
        />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">{postTitle}</h1>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Deadline:</strong> {formattedDate}
          </p>
          <p>
            <strong>Volunteers Needed:</strong> {neededCount}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Organizer Name:</strong> {organizerName}
          </p>
          <p>
            <strong>Organizer Email:</strong> {organizerEmail}
          </p>

          <button
            onClick={openModal}
            className="mt-4 bg-primary text-white py-2 px-5 rounded-lg hover:bg-secondary transition"
          >
            Be a Volunteer
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Volunteer Request"
        className={` max-w-2xl w-full p-6 rounded-xl shadow-2xl mx-auto mt-10 relative overflow-y-auto max-h-[90vh] border ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        } `}
        overlayClassName="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          Volunteer Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* All inputs as you already wrote */}
          <div>
            <label
              className={`label ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Thumbnail
            </label>
            <input
              type="text"
              value={thumbnail}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          {/* ... repeat for other readOnly fields */}
          <div>
            <label
              className={`label ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Suggestion
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Any suggestions?"
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Request
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default VolunteerDetails;
