import { OrderDetail } from '../interfaces/OrderDetail';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getOrderDetailList = async (orderId: number): Promise<OrderDetail[]> => {
  try {
    const response = await api.get<OrderDetail[]>(`${API_URL}/order-detail/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

export const deleteOrderDetail = async (orderDetailId: number): Promise<boolean> => {
  try {
    const response = await api.delete<boolean>(`${API_URL}/orderDetails/${orderDetailId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order detail:', error);
    throw error;
  }
};
