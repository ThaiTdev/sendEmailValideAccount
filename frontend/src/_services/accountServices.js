import Axios from "../apis/Axios";

const createUser = (data) => {
  return Axios.post("/createUser", data);
};
let emailConfirm = (activateCode) => {
  return Axios.post(`/emailConfirm/${activateCode}`);
};

export const accountService = { createUser, emailConfirm };
