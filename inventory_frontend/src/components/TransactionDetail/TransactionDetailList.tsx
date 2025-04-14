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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { TransactionDetail } from '../../interfaces/TransactionDetail';
import { getTransactionDetailList, deleteTransactionDetail } from '../../services/transactionDetailService';

interface TransactionDetailListProps {
  transactionId: number;
  onClose: () => void;
}

const TransactionDetailList: React.FC<TransactionDetailListProps> = ({ transactionId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetail[]>([]);
  const [open, setOpen] = useState(true); // State to control the dialog visibility

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      const data = await getTransactionDetailList();
      setTransactionDetails(data);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (transactionDetailId: number) => {
    setLoading(true);
    try {
      const success = await deleteTransactionDetail(transactionDetailId);
      if (success) {
        setTransactionDetails(prevTransactionDetails =>
          prevTransactionDetails.filter(detail => detail.transactiondetail_id !== transactionDetailId)
        );
      }
    } catch (error) {
      console.error('Error deleting transaction detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Transaction Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Detail ID</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionDetails.map((detail: TransactionDetail) => (
                  <TableRow key={detail.transactiondetail_id}>
                    <TableCell>{detail.transactiondetail_id}</TableCell>
                    <TableCell>{detail.quantity}</TableCell>
                    <TableCell>{detail.unit_price}</TableCell>
                    <TableCell>{detail.subtotal}</TableCell>
                    <TableCell>{detail.discount}</TableCell>
                    <TableCell>
                      <IconButton color="default" aria-label="view" size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDelete(detail.transactiondetail_id)}
                        size="small"
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
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

export default TransactionDetailList;
