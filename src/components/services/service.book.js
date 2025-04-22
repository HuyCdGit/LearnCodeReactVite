import axios from "./axios.customize";
const createBookAPI = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const BACKEND_URL = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    slider: [0],
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(BACKEND_URL, data);
};

const fetchBookAPI = (current, pageSize) => {
  const BACKEND_URL = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(BACKEND_URL);
};

const updateBookAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const BACKEND_URL = `/api/v1/book/${_id}`;
  const data = {
    thumbnail: thumbnail,
    slider: [0],
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(BACKEND_URL, data);
};

const fetchCategoryAPI = () => {
  const BACK_URL = "/api/v1/database/category";
  return axios.get(BACK_URL);
};
const handleUploadFile = (file, folder) => {
  const BACKEND_URL = "/api/v1/file/upload";
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": folder,
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(BACKEND_URL, bodyFormData, config);
};
export {
  fetchBookAPI,
  fetchCategoryAPI,
  createBookAPI,
  handleUploadFile,
  updateBookAPI,
};
