import { useEffect, useState } from "react";

const useTitle = (titleText: string) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    document.title = titleText + " - Blood Bucket";
    setTitle(titleText);
  }, [titleText]);
  return [title];
};

export default useTitle;
