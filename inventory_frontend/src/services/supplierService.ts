import { Supplier } from '../interfaces/Supplier';
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

export const getSupplierList = async (): Promise<Supplier[]> => {
  try {
    const supplierResponse = await api.get<Supplier[]>(`${API_URL}/supplier`);
    const suppliers: Supplier[] = supplierResponse.data;

    return await Promise.all(
        suppliers.map(async (supplier) => {
          const addressId = supplier.supplier_id;

          const addressResponse = await api.get(`${API_URL}/address/${addressId}`);
          const addressData = addressResponse.data;

          return {
            ...supplier,
            address: addressData,
          };
        })
    );
  } catch (error) {
    console.error('Error fetching supplier list:', error);
    throw error;
  }
};

export const createSupplier = async (supplierData: Supplier): Promise<Supplier> => {
  const addressId = supplierData.address?.address_id;

  const newData = { ...supplierData, address_id: addressId };

  const response = await api.post<Supplier>(`${API_URL}/supplier`, newData);
  return response.data;
};

export const updateSupplier = async (supplierId: number, supplierData: Supplier): Promise<Supplier> => {
  const addressId = supplierData.address?.address_id;

  const updatedData = { ...supplierData, address_id: addressId };

  const response = await api.patch<Supplier>(`${API_URL}/supplier/${supplierId}`, updatedData);
  return response.data;
};


export const deleteSupplier = async (supplierId: number): Promise<boolean> => {
  const response = await api.delete<boolean>(`${API_URL}/supplier/${supplierId}`);
  return response.data;
};
