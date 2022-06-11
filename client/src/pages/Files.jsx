import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Files = () => {
  const { id } = useParams();
  const application = useSelector((state) =>
    id ? state.applications.find((a) => a._id === id) : null
  );

  console.log(application);

  return <div>Files</div>;
};

export default Files;
