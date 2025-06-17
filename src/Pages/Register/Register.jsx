import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Password validation
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      return toast.error("Password must contain at least one uppercase letter");
    }
    if (!lowerCase.test(password)) {
      return toast.error("Password must contain at least one lowercase letter");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // ✅ Update user profile
        updateUserProfile({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            toast.success("Account created successfully!");
            navigate(location?.state?.from?.pathname || "/");
          })
          .catch((error) => {
            toast.error("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        toast.error("Sign Up failed: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("Signed in with Google!");

        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-lg shadow-secondary my-40">
      <h1 className="text-3xl font-bold text-center mt-5">Register Form</h1>
      <div className="card-body space-y-4">
        <form onSubmit={handleSignUp} className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Photo URL"
            />
          </div>

          <div className="relative w-full">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8/12 -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none z-10"
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary  mt-4 w-full">
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link to="/signIn" className="text-secondary font-bold">
              SignIn
            </Link>
          </p>
        </div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
