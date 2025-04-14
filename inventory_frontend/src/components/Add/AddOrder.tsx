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
import { createOrder } from '../../services/orderService';
import { Order } from '../../interfaces/Order';
import {OrderDetail} from "../../interfaces/OrderDetail";
import {getInventoryList} from "../../services/inventoryService";
import {Inventory} from "../../interfaces/Inventory";

interface AddOrderProps {
  onClose: () => void; 
}

const AddOrder: React.FC<AddOrderProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([
    {
      inventory: {
        inventory_id: '',
      },
      orderDetailId: 0,
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      subtotal: 0,
    }
  ]);
  const [formData, setFormData] = useState<Order>({
    orderId: 0,
    orderDate: new Date(),
    totalAmount: 0,
    paymentMethod: '',
    status: 'pending',
    orderDetails: [],
    customer: {
      id: 0,
      name: '',
      contactNumber: ''
    }
  });

  const newOrderDetail: OrderDetail = {
    inventory: {
      inventory_id: '',
    },
    orderDetailId: 0,
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    subtotal: 0,
  }

  useEffect(() => {
    fetchItems().then(() => {
      return;
    });
  }, []);

  useEffect(() => {
    let amount = 0;
    orderDetails.forEach((detail) => {
      amount += detail.subtotal;
    })
    setFormData(prevState => ({
      ...prevState,
      totalAmount: amount,
      orderDetails: orderDetails
    }));
  }, [orderDetails]);

  const fetchItems = async () => {
    try {
      const data: Inventory[] = await getInventoryList();
      // (await getInventoryList()).forEach(inv => {
      //   if (inv.item.item_type === 'product') {
      //     data.push(inv);
      //   }
      // })
      setInventory(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        [name]: value,
      }
    }));
  };

  const handleAddItem = () => {
    setOrderDetails([...orderDetails, newOrderDetail]);
  }

  const handleItemChange = (itemId: number, index: number) => {
    const inventoryItem = inventory.find(inv => inv.item.item_id === itemId);
    if (inventoryItem) {
      const newFields = orderDetails.map((orderDetail, i) => {
        if (i === index) {
          return { ...orderDetail, inventory: inventoryItem , unitPrice: inventoryItem.item.price, subtotal: (inventoryItem.item.price * orderDetail.quantity) };
        }
        return orderDetail;
      });
      setOrderDetails(newFields);
    }
  };

  const handleQuantityChange = (value: number, index: number) => {
    const newFields = orderDetails.map((orderDetail, i) => {
      if (i === index) {
        return {
          ...orderDetail,
          quantity: value,
          subtotal: (orderDetail.unitPrice * value)
        };
      }
      return orderDetail;
    });
    setOrderDetails(newFields);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder(formData);
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  function handlePaymentTypeChange(value: string) {
    setFormData(prevState => ({
      ...prevState,
      paymentMethod: value as "cash" | "credit"
    }));
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              gap: '16px',
              margin: 'auto',
              padding: '16px 0',
            }}
          >
            <div id="parent" style={{display: "flex", gap: "1rem", flexDirection: "column"}}>
              {orderDetails.map((field, index) => (
                <div key={index} className={"child"} style={{display: 'grid', gridTemplateColumns: '1.25fr .75fr', gridGap: ' 1rem'}}>
                <FormControl fullWidth>
                  <InputLabel id="item-label">Item</InputLabel>
                  <Select
                      labelId="item-label"
                      id={`item${index}`}
                      label="Item"
                      value={field.inventory?.inventory_id.toString() || ''}
                      onChange={(e) => handleItemChange(Number(e.target.value), index)}
                      required
                  >
                    {inventory.map(inv => (
                        <MenuItem key={inv.inventory_id} value={inv.inventory_id}>
                          {inv.item.item_name}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                    label="Amount"
                    type="number"
                    name={`amount${index}`}
                    value={field.quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value), index)}
                    required
                />
              </div>
              ))}
              <Button
                  type="button" onClick={handleAddItem}
                  variant="contained" color="primary"
                  style={{
                    width: "fit-content",
                    alignSelf: "end"
                  }}
                  disabled={loading} startIcon={<AddIcon />}>
                {loading ? <CircularProgress size={24} /> : 'Item'}
              </Button>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: ' 1rem'}}>
              <TextField
                  label="Order Date"
                  type="date"
                  name="orderDate"
                  value={formData.orderDate.toISOString().substring(0, 10)}
                  onChange={handleChange}
                  required
              />
              {/*<TextField*/}
              {/*  label="Total Amount"*/}
              {/*  type="number"*/}
              {/*  name="totalAmount"*/}
              {/*  value={formData.totalAmount}*/}
              {/*  onChange={handleChange}*/}
              {/*  required*/}
              {/*/>*/}
              <TextField
                  label="Customer Name"
                  name="name"
                  value={formData.customer.name}
                  onChange={handleCustomerChange}
                  required
              />
              <TextField
                  label="Contact"
                  name="contactNumber"
                  value={formData.customer.contactNumber}
                  onChange={handleCustomerChange}
                  required
              />
              {/*<TextField*/}
              {/*    label="Payment Method"*/}
              {/*    name="paymentMethod"*/}
              {/*    value={formData.paymentMethod}*/}
              {/*    onChange={handleChange}*/}
              {/*    required*/}
              {/*/>*/}
              <FormControl fullWidth>
                <InputLabel id="type-label">Payment Method</InputLabel>
                <Select
                    labelId="type-label"
                    label='Payment Method'
                    value={formData.paymentMethod}
                    onChange={(e) => handlePaymentTypeChange(e.target.value as string)}
                    name="payement-type"
                    required
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="credit">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained"
                    color="primary" disabled={loading}
                    startIcon={<AddIcon />}>
              {loading ? <CircularProgress size={24} /> : 'Order'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrder;
