import { Factory } from '../interfaces/Factory';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getFactoryList = async (): Promise<Factory[]> => {
  try {
    const response = await api.get<Factory[]>(`${API_URL}/factory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching factories:', error);
    throw error; // Propagate the error to the caller
  }
}

export const createFactory = async (factoryData: Factory): Promise<Factory> => {
  const response = await api.post<Factory>(`${API_URL}/factory`, factoryData);
  return response.data;
};

export const updateFactory = async (factoryId: number, factoryData: Factory): Promise<Factory> => {
  const response = await api.patch<Factory>(`${API_URL}/factory/${factoryId}`, factoryData);
  return response.data;
};

export const deleteFactory = async (factoryId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/factory/${factoryId}`);
  return response.data;
};
