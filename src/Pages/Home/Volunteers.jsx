import React, { use } from "react";
import VolunteerCard from "../Shared/VolunteerCard";
import { Link } from "react-router";

const Volunteers = ({ volunteersPromises }) => {
  const volunteers = use(volunteersPromises);
  console.log(volunteers);
  const sliceVol = volunteers.slice(0, 6);
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Volunteer Opportunities
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sliceVol.map((post) => (
          <VolunteerCard key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/allVolunteer">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            See All Volunteers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Volunteers;
