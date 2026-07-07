import { Car, CarFormValues } from "../../types/CarEntity";
import ApiService from "../api-service";
import { CARS_END_POINTS } from "./cars-end-point";

// GET API to fetch all cars
export const getCars = async (): Promise<Car[]> => {
  const apiEndPoint = `${CARS_END_POINTS.base}`;
  try {
    const response = await ApiService.getRequest(apiEndPoint);

    if (response?.data && response?.status === 200) {
      // Returning success response data
      return response.data;
    }

    // Rejecting failure response data - 400, 401, etc
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// GET API to fetch one car
export const getCar = async (id: number): Promise<Car> => {
  const apiEndPoint = `${CARS_END_POINTS.base}/${id}`;
  try {
    const response = await ApiService.getRequest(apiEndPoint);

    if (response?.data && response?.status === 200) {
      // Returning success response data
      return response.data;
    }

    // Rejecting failure response data - 400, 401, etc
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// POST API to add one car
export const createCar = async (car: CarFormValues): Promise<Car> => {
  const apiEndPoint = `${CARS_END_POINTS.base}`;
  try {
    const response = await ApiService.postRequest(apiEndPoint, car);

    if (response?.data) {
      // Returning success response data
      return response.data;
    }

    // Rejecting failure response data - 400, 401, etc
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// PUT API to update one car
export const updateCar = async (
  id: number,
  car: CarFormValues,
): Promise<Car> => {
  const apiEndPoint = `${CARS_END_POINTS.base}/${id}`;
  try {
    const response = await ApiService.putRequest(apiEndPoint, car);

    if (response?.data && response?.status === 200) {
      // Returning success response data
      return response.data;
    }

    // Rejecting failure response data - 400, 401, etc
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// DELETE API to delete one car
export const deleteCar = async (id: number): Promise<void> => {
  const apiEndPoint = `${CARS_END_POINTS.base}/${id}`;
  try {
    const response = await ApiService.deleteRequest(apiEndPoint);

    if (response?.data && response?.status === 200) {
      // Returning success response data
      return response.data;
    }

    // Rejecting failure response data - 400, 401, etc
    return Promise.reject(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
