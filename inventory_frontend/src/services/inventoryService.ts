import {Inventory, ItemAmount} from '../interfaces/Inventory';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getInventoryList = async (): Promise<Inventory[]> => {
  try {
    const response = await api.get<Inventory[]>(`${API_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
}

export const createInventory = async (inventoryData: Inventory): Promise<Inventory> => {
  const response = await api.post<Inventory>(`${API_URL}/inventory/new`, inventoryData);
  return response.data;
};

export const addToExistingInventory = async (inventoryData: Inventory, inventoryId: number | undefined): Promise<Inventory> => {
  const response = await api.patch<Inventory>(`${API_URL}/inventory/existing/${inventoryId}`, inventoryData);
  return response.data;
};

export const updateInventory = async (inventoryId: number, inventoryData: Inventory): Promise<Inventory> => {
  const response = await api.patch<Inventory>(`${API_URL}/inventory/${inventoryId}`, inventoryData);
  return response.data;
};

export const convertInventory = async  (materials: ItemAmount[], product: Inventory): Promise<Inventory> => {
  const response = await api.patch<Inventory>(`${API_URL}/inventory/convert`, {
    materials, product
  });
  return response.data;
}

export const convertToExistingInventory = async  (materials: ItemAmount[], product: Inventory, inventoryId: number | undefined): Promise<Inventory> => {
  const response = await api.patch<Inventory>(`${API_URL}/inventory/convertTo/${inventoryId}`, {
    materials, product
  });
  return response.data;
}

export const deleteInventory = async (inventoryId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/inventory/${inventoryId}`);
  return response.data;
};
