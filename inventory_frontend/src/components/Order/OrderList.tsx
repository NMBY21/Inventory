import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import InfoIcon from '@mui/icons-material/Info';
import OrderDetailList from "../OrderDetail/OrderDetailList";
import { getOrderList, deleteOrder, updateOrder } from '../../services/orderService';
import { Order } from '../../interfaces/Order';
import AddOrder from '../Add/AddOrder';

const OrderList = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then(() => { return; });
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrderList();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: number) => {
    setLoading(true);
    try {
      await deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseDetails = () => {
    setSelectedOrderId(null);
  };

  const handleOpenAddOrderDialog = () => {
    if (!openAddOrderDialog){
    setOpenAddOrderDialog(true);
    }
  };

  const handleCloseAddOrderDialog = async () => {
    setOpenAddOrderDialog(false);
    await fetchOrders();
  };
 
  const handleEditOrder = async (editOrderId: number) => {
    try {
      await updateOrder(editOrderId);
      setOrders(prevOrders => prevOrders.map((order) => {
        if (order.orderId === editOrderId){
          order.status = 'completed';
          return order;
        }
        return order;
      }));
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Orders</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddOrderDialog}
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Order
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: Order, index) => (
                <TableRow key={order.orderId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.customer?.name}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalAmount)}Br</TableCell>
                  <TableCell>
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(order.orderId)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="default" aria-label="order-detail" size="small" onClick={() => handleOpenDetails(order.orderId)}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                    {
                        order.status === 'processing' && (
                            <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEditOrder(order.orderId)}>
                              <CheckOutlinedIcon fontSize="small" />
                            </IconButton>
                        )
                    }
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddOrderDialog} onClose={handleCloseAddOrderDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <AddOrder onClose={handleCloseAddOrderDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddOrderDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {selectedOrderId !== null && (
        <OrderDetailList orderId={selectedOrderId} onClose={handleCloseDetails} />
      )}
    </Box>
  );
};

export default OrderList;
