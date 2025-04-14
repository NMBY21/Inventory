import { Category } from '../interfaces/Category';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(`${API_URL}/category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Propagate the error to the caller
  }
};

export const createCategory = async (categoryData: Category): Promise<Category> => {
  const response = await api.post<Category>(`${API_URL}/category`, categoryData);
  return response.data;
};

export const updateCategory = async (categoryId: number, categoryData: Category): Promise<Category> => {
  const response = await api.patch<Category>(`${API_URL}/category/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (categoryId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/category/${categoryId}`);
  return response.data;
};
