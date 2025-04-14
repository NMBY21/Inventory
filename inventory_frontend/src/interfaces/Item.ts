export interface Item {
  category: any;
  item_id: number;
  item_name: string;
  item_type: "product" | "raw material";
  description: string;
  price: number;
  discount: number;
  category_id?: number | null; 
}