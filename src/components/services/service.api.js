import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};
const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  // return axios.get(URL_BACKEND, {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("access_token"),
  //   },
  // });
  return axios.get(URL_BACKEND);
};
const deleteUserAPI = (id) => {
  console.log(">> check userid: ", id);
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
};

const resgisterUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const loginUserAPI = (userName, password) => {
  const URL_BACKEND = "api/v1/auth/login";
  const data = {
    username: userName,
    password: password,
  };
  return axios.post(URL_BACKEND, data);
};

const getAccountAPI = () => {
  const URL_BACKEND = "api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
export {
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  fetchAllUserAPI,
  resgisterUserAPI,
  loginUserAPI,
  getAccountAPI,
};
