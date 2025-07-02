import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    console.log("Submitted:", data);
    form.reset();
  };

  return (
    <section className="py-16 px-4 lg:px-20 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-2">Get in Touch</h2>
          <p className="">
            We'd love to hear from you. Whether you have a question or want to
            get involved, just send us a message.
          </p>

          <div className="space-y-4 ">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <span>Nikunjo-2, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-primary mt-1" />
              <span>goodneighbor@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-primary mt-1" />
              <span>+8801878605156</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 p-8 rounded-xl shadow-md w-full space-y-4"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
