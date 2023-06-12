import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import URL from "../../assets/url.png";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { InitializeContext } from "../../App";
import auth from "../../auth/Firebase/Firebase.config";
import Loading from "../../components/Loading/Loading";
import useUserInfo from "../../hooks/useUserInfo";

const Dashboard: any = () => {
          const { appName } = useContext(InitializeContext);
          const [user, isLoading] = useAuthState(auth);
          const navigate = useNavigate();
          const [userInfo] = useUserInfo();

          const handleLogOut = () => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You will be signed out from this account.",
                              icon: "warning",
                              showCancelButton: true,
                              background: "#fff",
                              color: "#333",
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, sign out!",
                    }).then((result: any) => {
                              if (result.isConfirmed) {
                                        signOut(auth).then(() => {
                                                  localStorage.removeItem("accessToken");
                                                  navigate("/");
                                                  toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
                                                            position: "top-center",
                                                  });
                                        }).catch((err) => {
                                                  toast(err.message, {
                                                            icon: '👎',
                                                  })
                                        })
                              }
                    })
          };

          if (isLoading) {
                    return <Loading />;
          }

          return (
                    <div className="drawer drawer-mobile bg-[url('./assets/bg2.jpg')]">
                              <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                              <div className="drawer-content p-3 md:p-3">
                                        <div className="header z-50 sticky top-0 flex justify-between items-center bg-[url('./assets/bg.jpg')] shadow-lg p-4 rounded-xl">
                                                  <label
                                                            htmlFor="dashboard-sidebar"
                                                            className="btn btn-outline btn-primary border-primary drawer-button lg:hidden text-white"
                                                  >
                                                            <MdSpaceDashboard className="text-2xl text-white" />
                                                  </label>
                                                  <div className="flex items-center gap-1 text-white">
                                                            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
                                                                      Welcome to
                                                            </h1>
                                                            <Link
                                                                      to="/"
                                                                      className="text-xl md:text-2xl font-semibold md:text-primary"
                                                            >
                                                                      <span className="text-white md:text-primary text-center">{appName}</span>
                                                                      <br />
                                                                      <span className="text-xs text-center flex items-center justify-center mx-auto md:hidden">({userInfo && userInfo?.role === "receiver" ? "Receiver" : userInfo?.role === "donor" ? "Donor" : userInfo?.role === "superAdmin" ? "Super Admin" : "User"} Panel)</span>
                                                            </Link>
                                                            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
                                                                      ({userInfo && userInfo?.role === "receiver" ? "Receiver" : userInfo?.role === "donor" ? "Donor" : userInfo?.role === "superAdmin" ? "Super Admin" : "User"} Panel)
                                                            </h1>
                                                  </div>
                                                  <div className="dropdown dropdown-end">
                                                            <label
                                                                      tabIndex={0}
                                                                      className="btn btn-ghost btn-circle avatar online"
                                                            >
                                                                      <div
                                                                                style={{ display: "grid" }}
                                                                                className="w-10 h-10  place-items-center rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                                                                      >
                                                                                {auth?.currentUser?.photoURL ? (
                                                                                          <img
                                                                                                    src={auth?.currentUser?.photoURL}
                                                                                                    alt={auth?.currentUser?.displayName || ""}
                                                                                          />
                                                                                ) : (
                                                                                          <img src={"https://i.ibb.co/xY0rfV4/avatar.jpg"} alt={auth?.currentUser?.displayName || ""} />
                                                                                )}
                                                                      </div>
                                                            </label>
                                                            <ul
                                                                      tabIndex={0}
                                                                      className="mt-6 -mr-4 p-2 shadow-xl menu menu-compact dropdown-content rounded-box w-72 bg-primary"
                                                            >
                                                                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-error ring-offset-base-100 ring-offset-2">
                                                                                {auth?.currentUser?.photoURL ? (
                                                                                          <img
                                                                                                    src={auth?.currentUser?.photoURL}
                                                                                                    alt={auth?.currentUser?.displayName || ""}
                                                                                                    className="w-16 h-16 rounded-full"
                                                                                          />
                                                                                ) : (
                                                                                          <img
                                                                                                    src={"https://i.ibb.co/xY0rfV4/avatar.jpg"}
                                                                                                    alt={auth?.currentUser?.displayName || ""}
                                                                                                    className="w-16 h-16 rounded-full"
                                                                                          />
                                                                                )}
                                                                      </div>
                                                                      <div className="text-center mb-4 text-white">
                                                                                <span className="font-semibold">Hello,</span>
                                                                                <span className="flex justify-center items-center gap-1 font-semibold">
                                                                                          <h2 className="text-error">
                                                                                                    {auth?.currentUser?.displayName}
                                                                                          </h2>
                                                                                          <i className='bx bxs-hand' ></i>
                                                                                </span>
                                                                                <div className="flex flex-col items-center gap-1 pt-2 md:hidden">
                                                                                          <h1 className="font-semibold">
                                                                                                    Welcome to,{" "}
                                                                                                    <span className="font-semibold text-error">
                                                                                                              <Link to="/">{appName}</Link>
                                                                                                    </span>
                                                                                          </h1>
                                                                                          <h1 className="font-semibold">
                                                                                                    ({userInfo && userInfo?.role === "receiver" ? "Receiver" : userInfo?.role === "donor" ? "Donor" : userInfo?.role === "superAdmin" ? "Super Admin" : "User"} Panel)
                                                                                          </h1>
                                                                                </div>
                                                                                <div className="flex justify-center">
                                                                                          <Link to="/dashboard/profile" className="hidden md:flex">
                                                                                                    <button className="btn btn-outline mt-4 rounded-full text-white hover:text-white hover:bg-error hover:border-error duration-500">
                                                                                                              View Profile
                                                                                                    </button>
                                                                                          </Link>
                                                                                </div>
                                                                      </div>
                                                                      <hr className="font-semibold" />
                                                                      <li className="py-1 font-semibold md:hidden text-white">
                                                                                <Link to="/dashboard/profile">
                                                                                          <i className="bx bxs-user font-semibold"></i> Profile
                                                                                </Link>
                                                                      </li>
                                                                      <li className="py-1 text-white">
                                                                                <button onClick={handleLogOut} className="font-semibold">
                                                                                          <i className="bx bx-log-out font-semibold"></i>
                                                                                          Sign Out
                                                                                </button>
                                                                      </li>
                                                            </ul>
                                                  </div>
                                        </div>
                                        <Outlet />
                              </div>
                              <div className="drawer-side shadow-xl">
                                        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                                        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content bg-[url('./assets/bg.jpg')]">
                                                  <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
                                                            <Link
                                                                      to="/"
                                                                      className="logo font-semibold text-center flex items-center flex-col gap-2 text-white"
                                                            >
                                                                      <img src={URL} alt="" className="w-16" /> {appName}
                                                                      <p className="text-sm">A Blood Donation Web App</p>
                                                                      <span className="text-xs text-center flex items-center justify-center mx-auto md:hidden">({userInfo && userInfo?.role === "receiver" ? "Receiver" : userInfo?.role === "donor" ? "Donor" : userInfo?.role === "superAdmin" ? "Super Admin" : "User"} Panel)</span>
                                                            </Link>
                                                  </div>
                                                  <li className="py-2 mt-4">
                                                            <NavLink
                                                                      className={({ isActive }) =>
                                                                                isActive ? "text-white bg-primary" : ""
                                                                      }
                                                                      to="/dashboard"
                                                            >
                                                                      <i className="bx bxs-dashboard text-xl"></i> Dashboard
                                                            </NavLink>
                                                  </li>
                                                  <li className="py-2">
                                                            <NavLink
                                                                      className={({ isActive }) =>
                                                                                isActive ? "text-white bg-primary" : "text-white"
                                                                      }
                                                                      to="/dashboard/profile"
                                                            >
                                                                      <i className="bx bxs-user text-xl"></i> Profile
                                                            </NavLink>
                                                  </li>
                                                  {
                                                            userInfo?.role === "donor" && (
                                                                      <>
                                                                                <li className="py-2">
                                                                                          <NavLink
                                                                                                    className={({ isActive }) =>
                                                                                                              isActive ? "text-white bg-primary" : "text-white"
                                                                                                    }
                                                                                                    to="/dashboard/yourUrls"
                                                                                          >
                                                                                                    <i className='bx bxs-droplet text-xl'></i> Donated Blood Details
                                                                                          </NavLink>
                                                                                </li>
                                                                      </>
                                                            )
                                                  }
                                                  {
                                                            userInfo?.role === "receiver" && (
                                                                      <>
                                                                                <li className="py-2">
                                                                                          <NavLink
                                                                                                    className={({ isActive }) =>
                                                                                                              isActive ? "text-white bg-primary" : "text-white"
                                                                                                    }
                                                                                                    to="/dashboard/yourUrls"
                                                                                          >
                                                                                                    <i className='bx bxs-droplet text-xl'></i> Received Blood Details
                                                                                          </NavLink>
                                                                                </li>
                                                                      </>
                                                            )
                                                  }
                                                  {
                                                            userInfo?.role === "superAdmin" && (
                                                                      <>
                                                                                <li className="py-2">
                                                                                          <NavLink
                                                                                                    className={({ isActive }) =>
                                                                                                              isActive ? "text-white bg-primary" : "text-white"
                                                                                                    }
                                                                                                    to="/dashboard/setting"
                                                                                          >
                                                                                                    <i className="bx bx-cog text-xl"></i> Setting
                                                                                          </NavLink>
                                                                                </li>
                                                                      </>
                                                            )
                                                  }
                                                  <li className="absolute bottom-5 w-72">
                                                            <button
                                                                      onClick={handleLogOut}
                                                                      className="bg-transparent hover:bg-primary hover:border-primary border-2 border-white rounded-lg text-white duration-300"
                                                            >
                                                                      <i className="bx bx-log-out"></i> Sign Out
                                                            </button>
                                                  </li>
                                        </ul>
                              </div>
                    </div>
          );
};

export default Dashboard;
