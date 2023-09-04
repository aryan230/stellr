import React from "react";
import { Oval } from "react-loader-spinner";

function LoaderInside() {
  return (
    <div className="loader-inside">
      {" "}
      <Oval
        height={40}
        width={40}
        color="#000000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#ffffff"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </div>
  );
}

export default LoaderInside;
