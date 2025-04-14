import { Address } from './Address';

export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_number: string;
  email: string;
  address?: Address;
}
