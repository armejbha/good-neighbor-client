import React from "react";
import { useLoaderData } from "react-router";

const AllVolunteerNeed = () => {
  const volunteers = useLoaderData();
  console.log(volunteers);
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sliceVol.map((post) => (
          <VolunteerCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllVolunteerNeed;
