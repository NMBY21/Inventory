import { Order } from '../interfaces/Order';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getOrderList = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>(`${API_URL}/order`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: number): Promise<Order> => {
  try {
    const response = await api.get<Order>(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};

export const createOrder = async (order: Order): Promise<Order> => {
  try {
    const response = await api.post<Order>(`${API_URL}/order`, order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (orderId: number): Promise<Order> => {
  try {
    const response = await api.patch<Order>(`${API_URL}/order/status/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await api.delete(`${API_URL}/order/${orderId}`);
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error;
  }
};
