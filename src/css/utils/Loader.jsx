import React from "react";
import {
  Audio,
  Dna,
  Oval,
  RotatingLines,
  TailSpin,
} from "react-loader-spinner";

function Loader() {
  return (
    <div className="fixed-element">
      <Oval
        height={50}
        width={50}
        color="#5d00d2"
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

export default Loader;
