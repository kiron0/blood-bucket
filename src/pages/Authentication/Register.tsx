import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";
import auth from "../../auth/Firebase/Firebase.config";
import Loading from "../../components/Loading/Loading";
import { BASE_API } from "../../config";
import axios from "axios";
import { InitializeContext } from "../../App";

const Fade = require("react-reveal/Fade");

export default function Register() {
  useScrollToTop();
  useTitle("Register");
  const { appName } = useContext(InitializeContext);
  const [userRole, setUserRole] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user as any);
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const registerForm = handleSubmit(async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        await createUserWithEmailAndPassword(data.email, data.password).then(
          (res) => {
            const user = res?.user;
            if (userRole === false) {
              const donorData = {
                role: "donor",
                displayName: data.name,
                uid: user?.uid,
                email: data.email,
                bloodGroup: data.bloodGroup,
                photoURL: "https://i.ibb.co/xY0rfV4/avatar.jpg",
              };
              axios.put(`${BASE_API}/login`, donorData);
              toast.success(
                `Welcome ${donorData.displayName}! You are now registered as a Donor.`,
                {
                  position: "top-center",
                }
              );
            } else {
              const receiverData = {
                role: "receiver",
                uid: user?.uid,
                displayName: data.name,
                email: data.email,
                photoURL: "https://i.ibb.co/xY0rfV4/avatar.jpg",
              };
              axios.put(`${BASE_API}/login`, receiverData);
              toast.success(
                `Welcome ${receiverData.displayName}! You are now registered as a Receiver.`,
                {
                  position: "top-center",
                }
              );
            }
          }
        );
        await updateProfile({
          displayName: data.name,
        });
        reset();
        navigate("/");
        if (user) {
          toast.success("Login Successful!");
          navigate("/");
        }
      } catch (err) {
        toast.error(err as any);
        console.log(err);
      }
    } else {
      toast.error("Password does not match");
    }
  });

  useEffect(() => {
    if (token || from === "/register" || auth?.currentUser?.email) {
      navigate(from, { replace: true });
      toast.success(`Welcome to ${appName}, ${auth?.currentUser?.displayName}`);
    }
  }, [token, navigate, from, appName]);

  useEffect(() => {
    if (error || updateError) {
      toast.error((error as any)?.data?.message || "something went wrong");
    }
  }, [error, navigate, updateError]);

  if (loading || updating) {
    return <Loading />
  }

  return (
    <div
      className="flex justify-center sm:p-20 bg-cover"
      style={{
        backgroundImage: `url(${require("../../assets/bg.png")})`,
      }}
    >
      <div>
        <div className="hero-content p-0 overflow-hidden w-full flex-col lg:flex-row items-stretch shadow-lg border ">
          <div className="font-poppins bg-[#3fa7674f] sm:w-[30rem] grid place-items-center py-20 sm:py-0">
            <div className="text-center px-8 py-5 lg:py-0">
              <Fade top distance="20px" cascade>
                <h3 className="text-3xl font-bold">Welcome Back</h3>
                <p className="my-4">
                  Welcome back to the {appName} app. here you will get your life through blood for yourself.
                </p>
                <button
                  onClick={() => {
                    setUserRole((state) => !state);
                    reset();
                  }}
                  className="btn btn-error rounded-full text-white"
                >
                  {userRole ? "Donor" : "Receiver"} Account
                </button>
                <br />
                <button
                  onClick={() => {
                    navigate("/");
                  }
                  }
                  className="btn btn-success rounded-full text-white mt-5"
                >
                  Go to Home
                </button>
              </Fade>
            </div>
          </div>
          <Fade top distance="10px">
            <form
              onSubmit={registerForm}
              className="card flex-shrink-0 w-full sm:w-[30rem] p-5 sm:p-10"
            >
              <div className="card-body p-3">
                <div className="card-header mb-3">
                  <h3 className="text-3xl font-semibold">
                    {userRole ? "Receiver account" : "Donor account"}
                  </h3>
                </div>

                <div className="form-control">
                  <div className="input-group my-0 flex items-start gap-3 flex-col rounded-none">
                    <label htmlFor="Name">
                      Name <small className="text-error">*</small>
                    </label>
                    <input
                      id="Name"
                      type="text"
                      placeholder="Name"
                      className="w-full p-4 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("name", { required: true })}
                    />
                  </div>
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-sm text-error">
                      First name is required
                    </p>
                  )}
                </div>
                {!userRole && (
                  <div className="form-control">
                    <div className="input-group my-0 flex items-start gap-3 flex-col rounded-none">
                      <label htmlFor="bloodGroup">
                        Blood Group <small className="text-error">*</small>
                      </label>
                      <select className="w-full p-4 border focus:outline-gray-200 focus:outline-none rounded-none"
                        {...register("bloodGroup", { required: true })} placeholder="Select blood group">
                        <option disabled selected>Select blood group</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </select>
                    </div>
                    {errors.bloodGroup?.type === "required" && (
                      <p role="alert" className="text-sm text-error">
                        Blood group is required
                      </p>
                    )}
                  </div>
                )}
                <div className="form-control">
                  <div className="input-group my-0 flex items-start gap-3 flex-col rounded-none">
                    <label htmlFor="email">
                      Email <small className="text-error">*</small>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-4 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                  </div>

                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-sm text-error">
                      Email is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <div className="input-group my-0 flex items-start gap-3 flex-col rounded-none relative">
                    <label htmlFor="password">
                      Password <small className="text-error">*</small>
                    </label>
                    <input
                      id="password"
                      type={isShow ? "text" : "password"}
                      placeholder="password"
                      className="w-full p-4 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                      })}
                    />
                    <div
                      className="eye absolute right-6 top-14 cursor-pointer z-10 select-none"
                      onClick={() => setIsShow((state) => !state)}
                    >
                      {isShow ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>

                  {errors.password?.type === "required" && (
                    <p role="alert" className="text-sm text-error">
                      Password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p role="alert" className="text-sm text-error">
                      Password is must be more then 6 chars.
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <div className="input-group my-0 flex items-start gap-3 flex-col rounded-none">
                    <label htmlFor="confirmPassword">
                      Confirm Password <small className="text-error">*</small>
                    </label>
                    <input
                      id="confirmPassword"
                      type={isShow ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full p-4 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                      })}
                    />
                  </div>
                  {errors.confirmPassword?.type === "required" && (
                    <p role="alert" className="text-sm text-error">
                      Confirm Password is required
                    </p>
                  )}
                  {errors.confirmPassword?.type === "minLength" && (
                    <p role="alert" className="text-sm text-error">
                      Confirm Password is must be more then 6 chars.
                    </p>
                  )}
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="w-full btn btn-success rounded-none btn-lg z-10 cursor-pointer"
                  >
                    {loading ? (
                      <PulseLoader color="#000" size={8} />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                <p className="my-2">
                  Already have an Account?{" "}
                  <Link to="/login" className="text-success">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Fade>
        </div>
      </div>
    </div>
  );
};
