import { Transaction } from '../interfaces/Transaction';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getTransactionList = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(`${API_URL}/transaction`);
  return response.data;
};

export const createTransaction = async (transactionData: Transaction): Promise<Transaction> => {
  const response = await api.post<Transaction>(`${API_URL}/transaction`, transactionData);
  return response.data;
};

export const updateTransaction = async (transactionId: number, transactionData: Transaction): Promise<Transaction> => {
  const response = await api.patch<Transaction>(`${API_URL}/transaction/${transactionId}`, transactionData);
  return response.data;
};

export const deleteTransaction = async (transactionId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/transaction/${transactionId}`);
  return response.data;
};
