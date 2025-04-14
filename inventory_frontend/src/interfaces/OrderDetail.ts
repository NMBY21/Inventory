export interface OrderDetail {
  readonly orderDetailId: number;
  readonly inventory: any;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly discount: number;
  readonly subtotal: number;
}
