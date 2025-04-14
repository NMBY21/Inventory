import { TransactionDetail } from '../interfaces/TransactionDetail';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getTransactionDetailList = async (): Promise<TransactionDetail[]> => {
  const response = await api.get<TransactionDetail[]>(`${API_URL}/transaction-detail`);
  return response.data;
};

export const createTransactionDetail = async (transactionDetailData: TransactionDetail): Promise<TransactionDetail> => {
  const response = await api.post<TransactionDetail>(`${API_URL}/transaction-detail`, transactionDetailData);
  return response.data;
};

export const updateTransactionDetail = async (transactionDetailId: number, transactionDetailData: TransactionDetail): Promise<TransactionDetail> => {
  const response = await api.patch<TransactionDetail>(`${API_URL}/transaction-detail/${transactionDetailId}`, transactionDetailData);
  return response.data;
};

export const deleteTransactionDetail = async (transactionDetailId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/transaction-detail/${transactionDetailId}`);
  return response.data;
};
