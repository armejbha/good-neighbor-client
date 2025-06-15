import React, { Suspense } from "react";
import Banner from "./Banner";
import Volunteers from "./Volunteers";
import Loading from "../Shared/Loading";

const Home = () => {
  const volunteersPromises = fetch("http://localhost:3000/volunteers").then(
    (res) => res.json()
  );
  return (
    <div>
      <div>
        <Banner></Banner>
        <Suspense fallback={<Loading></Loading>}>
          <Volunteers volunteersPromises={volunteersPromises}></Volunteers>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
