export interface Car {
  id: number;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CarFormValues {
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  notes?: string;
}
