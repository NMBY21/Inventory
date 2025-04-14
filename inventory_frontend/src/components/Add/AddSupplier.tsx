import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Supplier } from '../../interfaces/Supplier';
import {Address} from '../../interfaces/Address';
import {createSupplier} from "../../services/supplierService";

interface AddSupplierProps {
  onClose: () => void;
}

const AddSupplier: React.FC<AddSupplierProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Supplier>({
    supplier_id: 0,
    supplier_name: '',
    contact_number: '',
    email: '',
    address: { 
      address_id: 0,
      street: '',
      city: '',
      region: '',
      postal_code: '',
      country: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
  const { name, value } = e.target;
  setFormData((prevState: Supplier) => ({
    ...(prevState as Supplier), 
    address: {
      ...(prevState.address as Address), 
      [name as string]: value,
    },
  }));
};




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSupplier(formData);
      onClose();
    } catch (error) {
      console.error('Error creating supplier:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Supplier</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: ' 1rem'}}>
            <TextField
                label="Supplier Name"
                name="supplier_name"
                value={formData.supplier_name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Contact Number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Street"
                name="street"
                value={formData.address?.street || ''}
                onChange={handleAddressChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="City"
                name="city"
                value={formData.address?.city || ''}
                onChange={handleAddressChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Region"
                name="region"
                value={formData.address?.region || ''}
                onChange={handleAddressChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
            <TextField
                label="Country"
                name="country"
                value={formData.address?.country || ''}
                onChange={handleAddressChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
            />
          </div>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button><Button type="submit" variant="contained"
                             color="primary" disabled={loading}
                             startIcon={<AddIcon />}>
              {loading ? <CircularProgress size={24} /> : 'Supplier'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplier;
