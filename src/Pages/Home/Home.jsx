import React, { Suspense, useContext } from "react";
import Banner from "./Banner";
import Volunteers from "./Volunteers";
import Loading from "../Shared/Loading";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const volunteersPromises = fetch("http://localhost:3000/volunteers").then((res) => res.json());
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
