import React from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    toast.success(`Subscribed successfully: ${email}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });

    e.target.reset();
  };

  return (
    <section className="py-16 px-4 lg:px-20 bg-base-200 text-base-content">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Connected with Us</h2>
        <p className="mb-8 text-gray-500">
          Subscribe to our newsletter for the latest updates, community stories,
          and volunteer opportunities.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-80"
          />
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
