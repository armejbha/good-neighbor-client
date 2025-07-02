import React, { use } from "react";
import VolunteerCard from "../Shared/VolunteerCard";
import { Link } from "react-router";

const Volunteers = ({ volunteersPromises }) => {
  const volunteers = use(volunteersPromises);
  console.log(volunteers);
  const sliceVol = volunteers.slice(0, 8);
  return (
    <div className="max-w-7xl mx-auto py-12 px-2 md:px-0">
      <h1 className="text-3xl font-bold text-center mb-12">
        Volunteer Opportunities
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sliceVol.map((post) => (
          <VolunteerCard key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
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
