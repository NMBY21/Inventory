import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Dialog, Box, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createFactory } from '../../services/factoryService';
import { Factory } from '../../interfaces/Factory'; 

interface AddFactoryProps {
  onClose: () => void;
}

const initialFormData: Factory = {
  factoryId: 0,
  factoryName: '',
  address: {
    address_id: 0,
    country: '',
    region: '',
    city: '',
    street: '',
    postal_code: ''
  }
};

const AddFactory: React.FC<AddFactoryProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Factory>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name === 'factoryName') {
      setFormData(prevState => ({
        ...prevState,
        [name as string]: value
      }));
    } else  {
      setFormData(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name as string]: value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFactory = await createFactory(formData);
      console.log('Factory created:', newFactory);
      setLoading(false);
      setFormData(initialFormData); // Reset form data
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add Factory</DialogTitle>
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
              label="Factory Name"
              name="factoryName"
              value={formData.factoryName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Country"
              name="country"
              value={formData.address.country}
              onChange={handleChange}
              required
            />
            <TextField
              label="Region"
              name="region"
              value={formData.address.region}
              onChange={handleChange}
              required
            />
            <TextField
              label="City"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
            <TextField
              label="Street"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
            <TextField
              label="Postal Code"
              name="postal_code"
              value={formData.address.postal_code}
              onChange={handleChange}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={<AddIcon />} fullWidth>
            {loading ? <CircularProgress size={24} /> : 'Add Factory'}
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFactory;
