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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { getTransactionList, deleteTransaction, updateTransaction, createTransaction } from '../../services/transactionService';
import { Transaction } from '../../interfaces/Transaction';
import AddTransaction from '../Add/AddTransaction';

const TransactionList = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetchTransactions().then(() => {return;});
  }, []);

  
  const fetchTransactions = async () => {
  try {
    setLoading(true);
    const data = await getTransactionList();
    setTransactions(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (transactionId: number) => {
    setLoading(true);
    try {
      const success = await deleteTransaction(transactionId);
      if (success) {
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.transaction_id !== transactionId));
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddTransactionDialog = () => {
    setOpenAddTransactionDialog(true);
  };

  const handleCloseAddTransactionDialog = () => {
    setOpenAddTransactionDialog(false);
    fetchTransactions().then(() => {return;});
  };

  const handleEdit = (transactionId: number) => {
    setEditTransactionId(transactionId);
    const editedTransaction = transactions.find(transaction => transaction.transaction_id === transactionId);
    if (editedTransaction) {
      setEditedTransaction(editedTransaction);
    }
  };

  const handleCloseEditDialog = () => {
    setEditTransactionId(null);
    setEditedTransaction(null);
    fetchTransactions().then(() => {return;} );
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedTransaction) {
      setEditedTransaction(prevState => ({
        ...prevState!,
        [name]: value
      }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editedTransaction) {
        await updateTransaction(editedTransaction.transaction_id, editedTransaction);
        handleCloseEditDialog();
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleAddTransaction = async (formData: Transaction) => {
    try {
      await createTransaction(formData);
      handleCloseAddTransactionDialog();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Transactions</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddTransactionDialog}
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Transaction
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Transferred To</TableCell>
              <TableCell>Total Amount</TableCell>
              {/*<TableCell>Customer</TableCell>*/}
              {/*<TableCell>Employee</TableCell>*/}
              {/*<TableCell>Actions</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction: Transaction, index: number) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{new Date(transaction.transaction_date).toLocaleString()}</TableCell>
                  {/* <TableCell>{transaction.order.orderId}</TableCell> */}
                  <TableCell>{transaction.order?.orderId || 'N/A'}</TableCell>
                  <TableCell>{transaction.transactionTo}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.total_amount)}
                  </TableCell>
                  {/*<TableCell>*/}
                  {/*  <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEdit(transaction.transaction_id)}>*/}
                  {/*    <EditIcon fontSize="small" />*/}
                  {/*  </IconButton>*/}
                  {/*  <IconButton color="error" aria-label="delete" onClick={() => handleDelete(transaction.transaction_id)} size="small">*/}
                  {/*    <DeleteIcon fontSize="small" />*/}
                  {/*  </IconButton>*/}
                  {/*</TableCell>*/}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editTransactionId} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Transaction Date"
              name="transaction_date"
              type="datetime-local"
              value={editedTransaction?.transaction_date || ''}
              onChange={handleEditInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Total Amount"
              name="total_amount"
              type="number"
              value={editedTransaction?.total_amount || ''}
              onChange={handleEditInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddTransactionDialog} onClose={handleCloseAddTransactionDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <AddTransaction onClose={handleCloseAddTransactionDialog} onAddTransaction={handleAddTransaction} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTransactionDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionList;
