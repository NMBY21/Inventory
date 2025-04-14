export interface Transaction {
  transaction_id: number;
  transaction_date: Date;
  total_amount: number;
  order: any;
  transactionTo: string;
  // customer: Customer;
  // employee: Employee;
}
