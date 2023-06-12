import React from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import { signOut } from "@firebase/auth";
import auth from "../../auth/Firebase/Firebase.config";

export default function BecomeDonor() {
  const [userInfo] = useUserInfo();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto z-10 relative md:w-1/2 py-10 bg-error rounded-lg mt-20 -mb-10 shadow-lg">
      <div className="content text-center px-4 py-6 md:mx-10">
        <h1 className="text-xl lg:text-3xl font-semibold mb-2 text-white">
          Best way to make a difference in the lives of others
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={() => {
          signOut(auth)
          navigate("/register")
        }} className="btn bg-white border-white hover:bg-success hover:border-success hover:text-white text-black md:px-12 rounded-full duration-500">Become a {
            userInfo?.role === "donor" ? "Receiver" : "Donor"
          }</button>
      </div>
    </div>
  )
}
