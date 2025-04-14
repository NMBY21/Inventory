import React, {useEffect, useState} from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, InputLabel, Select, MenuItem, FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Transaction } from '../../interfaces/Transaction';
import {Order} from "../../interfaces/Order";
import {getOrderList} from "../../services/orderService";

interface AddTransactionProps {
  onClose: () => void;
  onAddTransaction: (formData: Transaction) => Promise<void>;
}

const initialFormData: Transaction = {
  transaction_id: 0,
  transaction_date: new Date(),
  order: undefined,
  transactionTo: '',
  total_amount: 0,
};

const AddTransaction: React.FC<AddTransactionProps> = ({ onClose, onAddTransaction }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Transaction>(initialFormData);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then(() => { return; });
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data: Order[] = [];
      (await getOrderList()).forEach((order) => {
        if (order.status === 'pending') {
          data.push(order);
        }
      })
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddTransaction(formData);
      setLoading(false);
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  function handleOrderChange(orderId: number) {
    const order = orders.find(ord => ord.orderId === orderId);
    setFormData(prevState => ({
      ...prevState,
      // @ts-ignore
      total_amount: order?.totalAmount | 0,
      order: order || undefined
    }));
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              // placeItems: 'center',
              gap: '16px',
              margin: 'auto',
              padding: '16px',
            }}
          >
            <div style={{display: 'grid', gridTemplateColumns: '1.4fr .75fr', gridGap: ' 1rem', alignItems: 'center'}}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Order</InputLabel>
                <Select
                    labelId="order-label"
                    id="order"
                    label="Order"
                    value={formData.order?.orderId.toString() || ''}
                    onChange={(e) => handleOrderChange(Number(e.target.value))}
                    required
                >
                  {orders.map(order => (
                      <MenuItem key={order.orderId} value={order.orderId}>
                        Customer: {order.customer.name} | Order: {order.orderId}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <h2 style={{justifySelf: 'center'}}>
                {formData.order ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formData.order.totalAmount) : 0}
              </h2>
              {/*<TextField*/}
              {/*  label="Total Amount"*/}
              {/*  name="total_amount"*/}
              {/*  type="number"*/}
              {/*  value={formData.total_amount}*/}
              {/*  onChange={handleChange}*/}
              {/*  required*/}
              {/*/>*/}
              <div style={{gridColumn: '1 / -1', justifySelf: 'center'}}>
                <TextField
                    label="Transferred To"
                    name="transactionTo"
                    value={formData.transactionTo}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained"
                    color="primary" disabled={loading}
                    startIcon={<AddIcon />}
            >
              {loading ? <CircularProgress size={24} /> : 'Transaction'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export default AddTransaction;
