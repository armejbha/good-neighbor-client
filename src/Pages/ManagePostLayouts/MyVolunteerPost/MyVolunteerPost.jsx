import React, { Suspense, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { volunteerPostByEmail } from "../../../Api/volunteerPostByEmail";
import Loading from "../../Shared/Loading";
import VolunteerList from "./VolunteerLIst";

const MyVolunteerPost = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h3></h3>
      <div>
        <Suspense fallback={<Loading></Loading>}>
          <VolunteerList
            volunteerPostByEmail={volunteerPostByEmail(user?.email)}
          ></VolunteerList>
        </Suspense>
      </div>
    </div>
  );
};

export default MyVolunteerPost;
