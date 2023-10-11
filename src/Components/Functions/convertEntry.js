import axios from "axios";
import URL from "./../../Data/data.json";

export const convertEntry = async ({ userInfo, id, data }) => {
  var data = JSON.stringify({
    data,
  });

  var config = {
    method: "put",
    url: `${URL[0]}api/entries/convert/${id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
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
