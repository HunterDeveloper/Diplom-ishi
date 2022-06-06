import React from "react";
import { LoadingButton } from "@mui/lab";

import "./Loader.scss";

const Loader = () => {
  return <LoadingButton className="loader" size="large" loading={true} />;
};

export default Loader;
