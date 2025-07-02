import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">About Good Neighbor</h2>
          <p className=" leading-relaxed mb-6">
            Good Neighbor is a community-driven organization committed to making
            a positive impact through volunteer work, outreach programs, and
            social initiatives. We believe that even small acts of kindness can
            create lasting change.
          </p>
          <p className="leading-relaxed mb-6">
            Our dedicated volunteers and team members work tirelessly to support
            the underprivileged, bring communities together, and create
            opportunities for a better tomorrow.
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://i.postimg.cc/vHBz3g5w/ray-sangga-kusuma-7u-Sr-Oy-Y1-U0-I-unsplash.jpg"
            alt="About Us"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
