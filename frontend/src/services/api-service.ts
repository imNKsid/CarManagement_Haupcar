import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getRequest = async (endPoint: string) => {
  try {
    const response = await api.get(endPoint);
    return response;
  } catch (error: any) {
    return error;
  }
};

const postRequest = async (endPoint: string, body: any) => {
  try {
    const response = await api.post(endPoint, body);
    return response;
  } catch (error: any) {
    return error;
  }
};

const putRequest = async (endPoint: string, body: any) => {
  try {
    const response = await api.put(endPoint, body);
    return response;
  } catch (error: any) {
    return error;
  }
};

const deleteRequest = async (endPoint: string) => {
  try {
    const response = await api.delete(endPoint);
    return response;
  } catch (error: any) {
    return error;
  }
};

const ApiService = {
  api,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};

export default ApiService;
