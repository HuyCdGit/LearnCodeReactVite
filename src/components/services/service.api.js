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

const fetchAllUserAPI = () => {
  const URL_BACKEND = "/api/v1/user";
  return axios.get(URL_BACKEND, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
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

export { createUserAPI, updateUserAPI, deleteUserAPI, fetchAllUserAPI };
