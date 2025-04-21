import axios from "axios";

let instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:5000/",
});

export const getAuthMe = async () => {
  return await instance.get("auth/me").then((res) => res.data)
}

export const loginUser = (body) => {
  return instance.post(`auth/login`, body).then((res) => res.data)
}

export const getAllServices = () => {
  return instance.get(`service`).then((res) => res.data)
}

export const getAllPackages =  () => {
  return  instance.get("package").then((res) => res.data)
}


export const updatePhoto = (id, data) => {
  return instance
    .put(`user/photo/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config
});