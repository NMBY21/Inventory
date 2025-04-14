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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategoryList, deleteCategory, updateCategory } from '../../services/categoryService';
import { Category } from '../../interfaces/Category';
import AddCategory from '../Add/AddCategory';

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories().then(() => {return;});
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategoryList();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: number) => {
    setLoading(true);
    try {
      const success = await deleteCategory(categoryId);
      if (success) {
        setCategories(prevCategories => prevCategories.filter(category => category.category_id !== categoryId));
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddCategoryDialog = () => {
    if (!openAddCategoryDialog) {
      setOpenAddCategoryDialog(true);
    }
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
    fetchCategories().then(() => {return;});
  };

  const handleOpenEditDialog = (categoryId: number) => {
    const categoryToEdit = categories.find(category => category.category_id === categoryId);
    if (categoryToEdit) {
      setEditedCategory(categoryToEdit);
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedCategory(null);
    fetchCategories().then(() => {return;});
  };

  const handleEditCategory = async () => {
    if (editedCategory) {
      try {
        await updateCategory(editedCategory.category_id!, editedCategory);
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Categories</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddCategoryDialog}
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Category
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
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
              categories.map((category, index) => (
                <TableRow key={category.category_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.category_name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleOpenEditDialog(category.category_id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(category.category_id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogContent>
          <AddCategory onClose={handleCloseAddCategoryDialog} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={editedCategory?.category_name || ''}
            onChange={e => setEditedCategory(prevState => ({ ...prevState!, category_name: e.target.value }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedCategory?.description || ''}
            onChange={e => setEditedCategory(prevState => ({ ...prevState!, description: e.target.value }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditCategory} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
