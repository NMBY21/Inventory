import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createCategory } from '../../services/categoryService';
import { Category } from '../../interfaces/Category'; 


interface AddCategoryProps {
  onClose: () => void;
}

const initialFormData: Category= {
  category_id: 0,
  category_name: '',
  description: '',
};

const AddCategory: React.FC<AddCategoryProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Category>(initialFormData);

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
      // Make a POST request to create a new category
      await createCategory(formData);
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
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              margin: '0 auto',
              padding: '16px',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Category Name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={<AddIcon />}>
                {loading ? <CircularProgress size={24} /> : 'Category'}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
