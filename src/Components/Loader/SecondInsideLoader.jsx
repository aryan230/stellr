import React from "react";

function SecondInsideLoader({ message }) {
  return (
    <div className="inside-loader-div">
      <span class="loader-two"></span>
      <h2> {message}.</h2>
      <p> This may take few minutes.</p>
    </div>
  );
}

export default SecondInsideLoader;
