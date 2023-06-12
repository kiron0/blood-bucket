import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheck, BiX } from "react-icons/bi";
import toast from "react-hot-toast";
import { BASE_API } from "../../../config";
import Loading from "../../../components/Loading/Loading";
import { InitializeContext } from "../../../App";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useUserInfo from "../../../hooks/useUserInfo";

export default function Setting() {
  useTitle("Setting");
  useScrollToTop();
  const { appName, refetch } = useContext(InitializeContext);
  const [admin, loading] = useUserInfo();
  const [isEdit, setIsEdit] = useState(false);
  const { setValue } = useForm();
  const [input, setInput] = useState(appName);

  /* Handle Change App Name */
  const handleChangeAppName = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_API}/app/changeAppName`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ appName: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("App Name Changed Successfully");
            setIsEdit(false);
            refetch();
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setValue("appName", appName);
  }, [setValue, appName]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div className="p-5 my-4 font-poppins">
          <h3 className="text-2xl font-bold mb-3 text-white">Settings</h3>

          <div className="settings-content">
            {admin && (
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 rounded my-4 text-white px-5">
                <h2 className="text-xl font-bold pb-3 md:pb-0">
                  Change App Name
                </h2>
                <form
                  onSubmit={handleChangeAppName}
                  className="flex items-center gap-3"
                >
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) => setInput(e.target.value)}
                      defaultValue={appName}
                      placeholder="Change App Name"
                      className="input input-bordered border border-white input-sm bg-transparent text-white"
                      autoComplete="off"
                    />
                  ) : (
                    <h2 className="text-xl">{appName}</h2>
                  )}

                  {isEdit ? (
                    <>
                      <button
                        type="submit"
                        className="cursor-pointer text-primary font-bold text-2xl"
                      >
                        <BiCheck />
                      </button>{" "}
                      <span
                        className="cursor-pointer text-error font-bold text-2xl"
                        onClick={() => setIsEdit(false)}
                      >
                        <BiX />
                      </span>
                    </>
                  ) : (
                    <span
                      className="cursor-pointer text-primary font-bold"
                      onClick={() => setIsEdit(true)}
                    >
                      <i className="bx bx-edit-alt text-xl"></i>
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
