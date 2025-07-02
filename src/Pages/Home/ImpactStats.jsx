import React, { use } from "react";
import CountUp from "react-countup";

const ImpactStats = ({ volunteersPromises }) => {
  const volunteers = use(volunteersPromises);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 lg:px-0 bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Community Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-200 rounded-xl shadow text-center md:text-left">
          <div className="stat-title text-gray-500">Volunteers</div>
          <div className="stat-value text-primary">
            <CountUp end={1200} duration={4.5} separator="," />+
          </div>
          <div className="stat-desc">Across the country</div>
        </div>

        <div className="stat bg-base-200 rounded-xl shadow text-center md:text-left">
          <div className="stat-title text-gray-500">Projects Completed</div>
          <div className="stat-value text-secondary">
            <CountUp end={350} duration={4.5} separator="," />+
          </div>
          <div className="stat-desc">Since 2022</div>
        </div>

        <div className="stat bg-base-200 rounded-xl shadow text-center md:text-left">
          <div className="stat-title text-gray-500">People Helped</div>
          <div className="stat-value text-accent">
            <CountUp end={15000} duration={5.5} separator="," />+
          </div>
          <div className="stat-desc">And counting</div>
        </div>

        <div className="stat bg-base-200 rounded-xl shadow text-center md:text-left">
          <div className="stat-title text-gray-500">Ongoing Campaigns</div>
          <div className="stat-value">
            <CountUp end={volunteers.length} duration={3.5} />
          </div>
          <div className="stat-desc">Running now</div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
