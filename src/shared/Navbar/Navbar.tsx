import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { BiDonateBlood } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import auth from "../../auth/Firebase/Firebase.config";

const Navbar = () => {
  const [user] = useAuthState(auth);
  // const [userInfo] = useUserInfo(user);
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState<Number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset as any;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user?.displayName} to stay with us!`);
  };

  const NavbarMenus = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/donors"
        >
          Find a donor
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/campaigns"
        >
          Campaigns
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/volunteers"
        >
          Volunteers
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-error" : ""
          }
          to="/contact-us"
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 w-full z-50">
      <div
        className={`drawer-content flex flex-col bg-base-100 duration-300 ${scrollY > 100 && `shadow-md bg-[#006A4E] text-white`
          }`}
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <CgMenuLeft className="text-3xl" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
              >
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <BiDonateBlood className="hidden lg:block text-2xl text-error" />{" "}
              {!user ? (
                <span className="text-lg md:text-xl">Blood Bucket</span>
              ) : (
                <span className="ml-[-17px] md:ml-0">Blood Bucket</span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-error text-white"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div
                    style={{ display: "grid" }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    <img src={auth?.currentUser?.photoURL as any} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-60"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                      alt="profile"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h2 className="font-semibold text-lg">
                      {
                        auth?.currentUser?.displayName
                      }
                    </h2>

                    <Link to="/dashboard/profile">
                      <button className="btn btn-primary mt-4 rounded-full text-white">
                        View Profile
                      </button>
                    </Link>
                  </div>
                  <hr className="font-semibold" />
                  <li className="py-1 font-semibold">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-white py-3 bg-primary" : "py-3"
                      }
                      to="/dashboard"
                    >
                      <i className="bx bxs-dashboard"></i> Dashboard
                    </NavLink>
                  </li>
                  <li className="py-1">
                    <button
                      onClick={handleLogOut}
                      className="py-3 font-semibold"
                    >
                      <i className="bx bx-log-out font-semibold"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
