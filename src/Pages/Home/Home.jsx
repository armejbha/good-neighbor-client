import React, { Suspense, useContext } from "react";
import Banner from "./Banner";
import Volunteers from "./Volunteers";
import Loading from "../Shared/Loading";
import { AuthContext } from "../../Context/AuthContext";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home = () => {
  const { user } = useContext(AuthContext);
  const volunteersPromises = fetch(
    "https://good-neighbor-server.vercel.app/volunteers"
  ).then((res) => res.json());
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div>
      <div>
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <Suspense fallback={<Loading></Loading>}>
          <Volunteers volunteersPromises={volunteersPromises}></Volunteers>
        </Suspense>
        <Testimonials></Testimonials>
      </div>
    </div>
  );
};

export default Home;
