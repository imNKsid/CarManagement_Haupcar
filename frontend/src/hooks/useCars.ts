import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import * as carService from "../services/cars/car-service";
import { Car, CarFormValues } from "../types/CarEntity";

function getErrorMessage(err: unknown, fallback: string): string {
  const anyErr = err as any;
  return anyErr?.response?.data?.message || fallback;
}

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const data = await carService.getCars();
      setCars(data);
    } catch (err) {
      message.error(getErrorMessage(err, "Failed to load cars"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const addCar = useCallback(
    async (values: CarFormValues) => {
      await carService.createCar(values);
      message.success("Car added successfully");
      await fetchCars();
    },
    [fetchCars],
  );

  const editCar = useCallback(
    async (id: number, values: CarFormValues) => {
      await carService.updateCar(id, values);
      message.success("Car updated successfully");
      await fetchCars();
    },
    [fetchCars],
  );

  const removeCar = useCallback(
    async (id: number) => {
      await carService.deleteCar(id);
      message.success("Car deleted successfully");
      await fetchCars();
    },
    [fetchCars],
  );

  return {
    cars,
    loading,
    fetchCars,
    addCar,
    editCar,
    removeCar,
    getErrorMessage,
  };
}
