import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";
import auth from "../../auth/Firebase/Firebase.config";
import Loading from "../../components/Loading/Loading";

type Props = {};

const Fade = require("react-reveal/Fade");

export default function Register(props: Props) {
  useScrollToTop();
  useTitle("Register");
  const [userRole, setUserRole] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigate = useNavigate();

  type registerFormType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    bloodGroup?: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registerFormType>();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(user as any);

  const registerForm = handleSubmit(async (formData) => {
    let role: string = userRole ? "receiver" : "donor";
    if (!userRole) {
      /* Phone Number Validation */
      // if (!/^(?:\+88|01)?\d{11}$/.test((formData as any)?.phone)) {
      //   return toast.error("Invalid Phone Number");
      // }
    }

    if (formData.password === formData.confirmPassword) {
      try {
        await createUserWithEmailAndPassword(formData.email, formData.password);
        await updateProfile({
          displayName: formData.name,
          photoURL: role,
        });
        toast.success("Account Created Successfully");
        reset();
        navigate("/login");
      } catch (error) {
        // console.log(error);
        toast.error(error as any);
      }
    } else {
      toast.error("Password does not match");
    }
  });

  if (token) {
    navigate("/", { replace: true });
  }

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
          <div className="h-100vh font-poppins bg-[#3fa7674f] sm:w-[30rem] grid place-items-center py-20 sm:py-0">
            <div className="text-center px-8">
              <Fade top distance="20px" cascade>
                <h3 className="text-3xl font-bold">Welcome Back</h3>
                <p className="my-4">
                  Welcome back to the Blood Bucket app. here you will get your life through blood for yourself.
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
              </Fade>
            </div>
          </div>
          <Fade top distance="10px">
            <form
              onSubmit={registerForm}
              method="post"
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
