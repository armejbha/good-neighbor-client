import React, { useEffect } from "react";
import { useLoaderData } from "react-router";
import VolunteerCard from "../Shared/VolunteerCard";

const AllVolunteerNeed = () => {
  const volunteers = useLoaderData();
  console.log(volunteers);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {volunteers.map((post) => (
          <VolunteerCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllVolunteerNeed;
