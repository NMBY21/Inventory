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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getSupplierList, deleteSupplier, updateSupplier, createSupplier } from '../../services/supplierService';
import { Supplier } from '../../interfaces/Supplier';
import AddSupplier from '../Add/AddSupplier';

const SupplierList = () => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState<number | null>(null);
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchSuppliers().then(() => {return});
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getSupplierList();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (supplierId: number) => {
    setLoading(true);
    try {
      const success = await deleteSupplier(supplierId);
      if (success) {
        setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.supplier_id !== supplierId));
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddSupplierDialog = () => {
    setOpenAddSupplierDialog(true);
  };

  const handleCloseAddSupplierDialog = () => {
    setOpenAddSupplierDialog(false);
    fetchSuppliers().then(() => {return});
  };

  const handleEdit = (supplierId: number) => {
    setEditSupplierId(supplierId);
    const editedSupplier = suppliers.find(supplier => supplier.supplier_id === supplierId);
    if (editedSupplier) {
      setEditedSupplier(editedSupplier);
    }
  };

  const handleCloseEditDialog = () => {
    setEditSupplierId(null);
    setEditedSupplier(null);
    fetchSuppliers().then(()=> {return});
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedSupplier) {
      setEditedSupplier(prevState => ({
        ...prevState!,
        [name]: value
      }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editedSupplier) {
        await updateSupplier(editedSupplier.supplier_id, editedSupplier);
        handleCloseEditDialog();
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Suppliers</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddSupplierDialog}
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Supplier
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell> 
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress/>
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier: Supplier, index: number) => (
                <TableRow key={supplier.supplier_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supplier.supplier_name}</TableCell>
                  <TableCell>{supplier.contact_number}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.address?.city}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleEdit(supplier.supplier_id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(supplier.supplier_id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Link to={`/view-supplier/${supplier.supplier_id}`}>
                      <IconButton color="default" aria-label="view" size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={!!editSupplierId} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Supplier Name"
              name="supplier_name"
              value={editedSupplier?.supplier_name || ''}
              onChange={handleEditInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Contact Number"
              name="contact_number"
              value={editedSupplier?.contact_number || ''}
              onChange={handleEditInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={editedSupplier?.email || ''}
              onChange={handleEditInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
  label="Street"
  name="address.street"
  value={editedSupplier?.address?.street || ''}
  onChange={handleEditInputChange}
  fullWidth
  variant="outlined"
  margin="normal"
  required
/>
<TextField
  label="City"
  name="address.city"
  value={editedSupplier?.address?.city || ''}
  onChange={handleEditInputChange}
  fullWidth
  variant="outlined"
  margin="normal"
  required
/>
<TextField
  label="Region"
  name="address.region"
  value={editedSupplier?.address?.region || ''}
  onChange={handleEditInputChange}
  fullWidth
  variant="outlined"
  margin="normal"
  required
/>
<TextField
  label="Country"
  name="address.country"
  value={editedSupplier?.address?.country || ''}
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

      <Dialog open={openAddSupplierDialog} onClose={handleCloseAddSupplierDialog}>
        <DialogContent>
          <AddSupplier onClose={handleCloseAddSupplierDialog}/>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SupplierList;
