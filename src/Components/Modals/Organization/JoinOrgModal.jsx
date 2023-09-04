import React from "react";

function JoinOrgModal() {
  const submitHandler = () => {};
  return (
    <div className="forms-inside-div">
      <div className="form-inside-org">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter invite code"
            // onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default JoinOrgModal;
