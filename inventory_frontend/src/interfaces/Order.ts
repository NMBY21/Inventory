import {OrderDetail} from "./OrderDetail";
import {Customer} from "./Customer";

export interface Order {
  orderId: number;
  orderDate: Date;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  orderDetails: OrderDetail[];
  customer: Customer;
}
