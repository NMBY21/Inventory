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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { OrderDetail } from '../../interfaces/OrderDetail';
import { getOrderDetailList } from '../../services/orderDetailService';

interface OrderDetailListProps {
  orderId: number;
  onClose: () => void;
}

const OrderDetailList: React.FC<OrderDetailListProps> = ({ orderId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [open, setOpen] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderDetailList(orderId);
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails().then(() => { return; });
  }, []);

  // const handleDelete = async (orderDetailId: number) => {
  //   setLoading(true);
  //   try {
  //     const success = await deleteOrderDetail(orderDetailId);
  //     if (success) {
  //       setOrderDetails(prevOrderDetails =>
  //         prevOrderDetails.filter(detail => detail.orderDetailId !== orderDetailId)
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error deleting order detail:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Order Detail ID</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Subtotal</TableCell>
                    {/*<TableCell>Actions</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((detail: OrderDetail, index) => (
                    <TableRow key={detail.orderDetailId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{detail.inventory?.item?.item_name}</TableCell>
                      <TableCell>{detail.orderDetailId}</TableCell>
                      <TableCell>{detail.quantity}</TableCell>
                      <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(detail.unitPrice)}Br</TableCell>
                      <TableCell>{detail.discount}</TableCell>
                      <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((detail.unitPrice * detail.quantity))}Br</TableCell>
                      {/*<TableCell>*/}
                      {/*  <IconButton color="default" aria-label="view" size="small">*/}
                      {/*    <InfoIcon fontSize="small" />*/}
                      {/*  </IconButton>*/}
                      {/*  <IconButton*/}
                      {/*    color="error"*/}
                      {/*    aria-label="delete"*/}
                      {/*    onClick={() => handleDelete(detail.orderDetailId)}*/}
                      {/*    size="small"*/}
                      {/*  >*/}
                      {/*    <InfoIcon fontSize="small" />*/}
                      {/*  </IconButton>*/}
                      {/*</TableCell>*/}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailList;
