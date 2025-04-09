import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phoneNumber) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phoneNumber,
  };
  return axios.post(URL_BACKEND, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

const fetchAllUserAPI = () => {
  const URL_BACKEND = "/api/v1/user";
  return axios.get(URL_BACKEND, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};
const updateUserAPI = () => {};
const deleteUserAPI = () => {};

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI };
