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

export const getAllServices = (path) => {
  return  instance.get(`${path}`).then((res) => res.data)
}

export const getAllRecords = () => {
  return  instance.get("record").then((res) => res.data)
}

export const createPackage =  (data) => {
  return instance.post("package", data).then((res) => res.data)
}
export const createService =  (data) => {
  return  instance.post("service", data).then((res) => res.data)
}
export const createRecords =  (data) => {
  return  instance.post("record", data).then((res) => res.data)
}

export const createAgreement =  (id, data) => {
  return  instance.put(`client/agreement/${id}`, data).then((res) => res.data)
}
export const deleteService =  (point, serviceId) => {
  return  instance.delete(`${point}/${serviceId}`).then((res) => res.data)
}

export const createClient =  (data) => {
  return  instance.post("client", data).then((res) => res.data)
}

export const getClientById =  (id) => {
  return  instance.get(`client/${id}`).then((res) => res.data)
}

export const getAllRecord =  () => {
  return  instance.get(`client`).then((res) => res.data)
}

export const getClientByName =  (data) => {
  return  instance.get(`client/search`, {params: data}).then((res) => res.data)
}


export const deleteBookedFromList =  (id) => {
  return  instance.delete(`client/${id}`).then((res) => res.data)
}


export const updateInfoUser = (id, data) => {
  return instance
    .put(`client/${id}`, data, {
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