import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  isLoading?: boolean;
};

const Spinner = ({ isLoading = true }: Props) => {
  return (
    <div id="loading-spinner">
      <ClipLoader
        aria-label="loading spinner"
        size={15}
        color="#36d7b7"
        loading={isLoading}
      />
    </div>
  );
};

export default Spinner;
