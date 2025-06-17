import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignIn = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        toast.success("Logged in successfully!");
        e.target.reset();
        navigate(location?.state?.from?.pathname || "/");
      })
      .catch((error) => {
        toast.error(error.message);
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
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-lg shadow-secondary my-20">
      <h1 className="text-3xl font-bold text-center mt-5">SignIn Form</h1>
      <div className="card-body">
        <form onSubmit={handleLogin} className="space-y-3">
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

          <div className="mt-1">
            <a className="link link-hover text-sm text-gray-500">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          New to this website?{" "}
          <Link to="/register" className="text-primary font-bold">
            Register
          </Link>
        </p>

        <div className="mt-4">
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

export default SignIn;
