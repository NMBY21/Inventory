export interface Inventory {
  inventory_id: number;
  item: any;
  quantity_in_stock: number;
  reorder_level: number;
  last_restock_date: Date;
  supplier: any;
}

export interface ItemAmount {
  inventory: any,
  quantity: number
}