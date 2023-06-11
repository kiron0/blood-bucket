import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import swal from "sweetalert";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import useTitle from "../../hooks/useTitle";
import auth from "../../auth/Firebase/Firebase.config";
import { toast } from "react-hot-toast";
import useToken from "../../hooks/useToken";

const Fade = require("react-reveal/Fade");

type Props = {};

const Login = (props: Props) => {
  useScrollToTop();
  useTitle("Login");
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [token] = useToken(user as any);
  const navigate = useNavigate();
  //Handle Form
  const loginForm = handleSubmit(async (formData) => {
    try {
      await signInWithEmailAndPassword(formData.email, formData.password);
      if (user) {
        toast.success("Login Successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err as any);
      console.log(err);
    }
  });

  /* Handle Another Options */
  useEffect(() => {
    /* If Error */
    if (error) {
      // toast.error((error as any).data?.message);
      // toast.error((error as any)?.data);
      swal({
        title: (error as any),
        icon: "error",
        dangerMode: true,
        buttons: ["cancel", "okay"],
      });
    }
    //     /* If Success */
    // if (isSuccess) {
    //   navigate("/dashboard/profile");
    //   dispatch(setAuthInformation({ user: data?.user, token: data?.token }));
    //   cogoToast.success("Login Success");
    // }
  }, [error, navigate]);

  if (token) {
    navigate("/");
    toast.success("Login Successful!");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:p-20 bg-cover bg-base-100">
      <div>
        <div className="hero-content flex border sm:p-10 bg-base-100">
          <div className="text-center lg:text-left max-w-md hidden lg:flex">
            <img
              src="https://i.ibb.co/HVBwcZT/undraw-Access-account-re-8spm.png"
              alt="loginImage"
            />
          </div>
          {/* <div className="divider lg:divider-horizontal">+</div> */}
          <Fade top distance="20px">
            <form
              onSubmit={loginForm}
              className="card flex-shrink-0 w-full sm:w-[30rem]  bg-base-100"
            >
              <div className="card-body p-5">
                <div className="card-header mb-3">
                  <Link to="/" className="text-3xl cursor-pointer w-20 h-20 bg-gray-100 grid place-items-center mb-4">
                    <BiLogIn />
                  </Link>
                  <h3 className="text-2xl">Login to Account</h3>
                </div>
                <div className="form-control rounded-none">
                  <div className="input-group my-1 flex items-start gap-3 flex-col rounded-none">
                    <label htmlFor="email">
                      Email <small className="text-error">*</small>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-5 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                  </div>
                  {errors.email?.type === "required" && (
                    <small className="text-xs py-1 text-error font-poppins">
                      Email field is required.
                    </small>
                  )}
                  {errors.email?.type === "pattern" && (
                    <small className="text-xs py-1 text-error font-poppins">
                      Put valid email
                    </small>
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
                      placeholder="Password"
                      className="w-full p-5 border focus:outline-gray-200 focus:outline-none rounded-none"
                      {...register("password", { required: true })}
                    />
                    <div
                      className="eye absolute right-6 top-16 cursor-pointer z-10 select-none"
                      onClick={() => setIsShow((state) => !state)}
                    >
                      {isShow ? <BsEyeSlash /> : <BsEye />}
                    </div>
                  </div>
                  {errors.password?.type === "required" && (
                    <small className="text-xs text-error font-poppins py-1">
                      Password field is required
                    </small>
                  )}
                  <label className="label">
                    <Link
                      to="/reset-password"
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  {/* {isLoading ? (
                    <button
                      type="button"
                      className="w-full btn btn-success rounded-none btn-lg z-10 cursor-pointer"
                    >
                      <PulseLoader size={8} />
                    </button>
                  ) : ( */}
                  <button className="w-full btn btn-error rounded-none btn-lg z-10 cursor-pointer text-white">
                    Login
                  </button>
                  {/* )} */}
                </div>
                <p className="my-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-success">
                    Create for free
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

export default Login;
