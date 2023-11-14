import URL from "./../../../Data/data.json";
import CryptoJS from "crypto-js";
export const encryptData = async ({ type, id, access, role, slug }) => {
  const password = "3VJx8BtRnD";
  const object = {
    type,
    id,
    slug,
    access,
    role,
  };
  let ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(object),
    password
  ).toString();
  return ciphertext;
};
