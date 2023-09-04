import axios from "axios";
import URL from "./../../Data/data.json";
export const addEntryVc = async ({
  entryId,
  user,
  userName,
  userEmail,
  oldData,
}) => {
  let data = JSON.stringify({
    entryId: entryId,
    logDetails: {
      user: user,
      userName: userName,
      userEmail: userEmail,
      date: Date.now(),
      oldData: oldData,
    },
  });
  var config = {
    method: "post",
    url: `${URL[0]}api/entries/vc`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjBjM2VmMzU2ODc0Zjc3NTdmNjc3OCIsImlhdCI6MTY4OTMyNzAyNCwiZXhwIjoxNjkxOTE5MDI0fQ.jNS_36axdjmRdH1N-cBeaGv9hpO5T_2f0CWnhaDcuWs",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function(response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
