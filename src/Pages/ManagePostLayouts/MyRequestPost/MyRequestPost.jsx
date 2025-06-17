import React, { Suspense, useContext } from "react";
import RequestList from "./RequestList";
import { AuthContext } from "../../../Context/AuthContext";
import { volunteerRequestByEmail } from "../../../Api/volunteerRequestByEmail";
import Loading from "../../Shared/Loading";

const MyRequestPost = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div>
        <Suspense fallback={<Loading></Loading>}>
          <RequestList
            volunteerRequestByEmail={volunteerRequestByEmail(
              user?.email,
              user?.accessToken
            )}
          ></RequestList>
        </Suspense>
      </div>
    </div>
  );
};

export default MyRequestPost;
