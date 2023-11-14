import axios from "axios";
import URL from "./../../Data/data.json";
import { io } from "socket.io-client";
export const addNotification = async (delta) => {
  console.log(delta);
  const socket = io(URL[0].substring(0, URL[0].length - 1), {
    maxHttpBufferSize: 1e8,
  });

  socket.emit("send-message", {
    id: delta.id,
    type: delta.type,
    data: delta.value,
  });

  let data = JSON.stringify({
    id: delta.id,
    type: delta.type,
    data: delta.value,
  });
  var config = {
    method: "post",
    url: `${URL[0]}api/notification`,
    headers: {
      Authorization: `Bearer ${delta.token}`,
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
