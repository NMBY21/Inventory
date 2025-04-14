import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TransactionDetail } from '../../interfaces/TransactionDetail';

interface AddTransactionDetailProps {
  onClose: () => void;
}

const AddTransactionDetail: React.FC<AddTransactionDetailProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TransactionDetail>({
    item_id: 0,
    transactiondetail_id: 0,
    quantity: 0,
    unit_price: 0,
    subtotal: 0,
    discount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        console.log('TransactionDetail created:', formData);
        setLoading(false);
        setFormData({
          item_id: 0,
          transactiondetail_id: 0,
          quantity: 0,
          unit_price: 0,
          subtotal: 0,
          discount: 0,
        });
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Transaction Detail</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '400px',
              margin: 'auto',
              marginTop: '32px',
              padding: '16px',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              label="Unit Price"
              name="unit_price"
              type="number"
              value={formData.unit_price}
              onChange={handleChange}
              required
            />
            <TextField
              label="Subtotal"
              name="subtotal"
              type="number"
              value={formData.subtotal}
              onChange={handleChange}
              required
            />
            <TextField
              label="Discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={<AddIcon />} fullWidth>
              {loading ? <CircularProgress size={24} /> : 'Add Transaction Detail'}
            </Button>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionDetail;
