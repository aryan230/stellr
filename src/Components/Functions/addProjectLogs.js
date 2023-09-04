import axios from "axios";
import URL from "./../../Data/data.json";
export const addProjectLogs = async ({
  entryId,
  user,
  userName,
  userEmail,
  message,
}) => {
  var data = JSON.stringify({
    entryId: entryId,
    logDetails: {
      user: user,
      userName: userName,
      userEmail: userEmail,
      message: message,
      date: Date.now(),
    },
  });

  var config = {
    method: "post",
    url: `${URL[0]}api/projects/logs`,
    headers: {
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
