import {Item} from '../interfaces/Item';
import {Category} from '../interfaces/Category';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getItemList = async (): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>(`${API_URL}/item`);
    const items = response.data;

    const categoryPromises = items.map(async (item) => {
      if (item.category) {
        const categoryResponse = await api.get<Category>(`${API_URL}/category/${item.category.category_id}`);
        return categoryResponse.data;
      }
      return null; 
    });
    const categories = await Promise.all(categoryPromises);

    return items.map((item, index) => ({
      ...item,
      category: item.category ? categories[index] : null,
    }));
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; 
  }
};

export const createItem = async (itemData: { category_id?: any; category: any; item_id?: number; item_name?: string; item_type?: "product" | "raw material"; description?: string; price?: number; discount?: number; }) => {
  try {
    const categoryId = itemData.category?.category_id || null;

    const newItemData = { ...itemData, category_id: categoryId };

    const response = await api.post<Item>(`${API_URL}/item`, newItemData);
    
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error; 
  }
};



export const updateItem = async (itemId: number, itemData: Item): Promise<Item> => {
  const response = await api.patch<Item>(`${API_URL}/item/${itemId}`, itemData);
  return response.data;
};

export const deleteItem = async (itemId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/item/${itemId}`);
  return response.data;
};
