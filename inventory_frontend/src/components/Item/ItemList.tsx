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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getItemList, deleteItem, updateItem } from '../../services/itemService';
import { Item } from '../../interfaces/Item';
import AddItem from '../Add/AddItem';
import { Category } from '../../interfaces/Category';
import {getCategoryList} from "../../services/categoryService";

const ItemList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchItems();
        await fetchCategories();
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(() => { return; });
  }, []);

  const fetchItems = async () => {
    const data = await getItemList();
    setItems(data);
  };

  const fetchCategories = async () => {
    const data = await getCategoryList();
    setCategories(data);
  };

  const handleDelete = async (itemId: number) => {
    setLoading(true);
    try {
      const success = await deleteItem(itemId);
      if (success) {
        setItems((prevItems: any[]) => prevItems.filter((item: { item_id: number; }) => item.item_id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddItemDialog = () => {
    if (!openAddItemDialog) {
      setOpenAddItemDialog(true);
    }
  };

  const handleCloseAddItemDialog = () => {
    setOpenAddItemDialog(false);
    fetchItems().then(() => { return; });
  };

  const handleOpenEditDialog = (itemId: number) => {
    const itemToEdit = items.find(item => item.item_id === itemId);
    if (itemToEdit) {
      setEditedItem(itemToEdit);
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditItemId(null);
    setEditedItem(null);
    fetchItems().then(() => { return; });
  };

  const handleEditItem = async () => {
    if (editedItem) {
      try {
        const updatedItem = {
          ...editedItem,
          category_id: editedItem.category?.category_id || null,
        };

        await updateItem(updatedItem.item_id!, updatedItem);
        handleCloseEditDialog();
        await fetchItems();
      } catch (error) {
        console.error('Error updating item:', error);
      }
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Items</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddItemDialog}
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              items.map((item,index) => (
                <TableRow key={item.item_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.item_type}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}Br</TableCell>
                  <TableCell>{item.discount}</TableCell>
                  <TableCell>{item.category?.category_name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleOpenEditDialog(item.item_id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(item.item_id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    {/*<Link to={`/view-item/${item.item_id}`}>*/}
                    {/*  <IconButton color="default" aria-label="view" size="small">*/}
                    {/*    <VisibilityIcon fontSize="small" />*/}
                    {/*  </IconButton>*/}
                    {/*</Link>*/}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddItemDialog} onClose={handleCloseAddItemDialog}>
        <DialogContent>
          <AddItem onClose={handleCloseAddItemDialog} />
        </DialogContent>
        <DialogActions />
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            value={editedItem?.item_name || ''}
            onChange={e => setEditedItem(prevState => ({ ...prevState!, item_name: e.target.value }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Item Type"
            value={editedItem?.item_type || ''}
            onChange={e => setEditedItem(prevState => ({ ...prevState!, item_type: e.target.value as "product" | "raw material"}))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedItem?.description || ''}
            onChange={e => setEditedItem(prevState => ({ ...prevState!, description: e.target.value }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Price"
            value={editedItem?.price.toString() || ''}
            onChange={e => setEditedItem(prevState => ({ ...prevState!, price: parseFloat(e.target.value) || 0 }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Discount"
            value={editedItem?.discount.toString() || ''}
            onChange={e => setEditedItem(prevState => ({ ...prevState!, discount: parseFloat(e.target.value) || 0 }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={editedItem?.category?.category_id !== undefined ? editedItem.category.category_id.toString() : ''}
              onChange={e => {
                const categoryId = e.target.value !== '' ? Number(e.target.value) : undefined;
                const updatedCategory: Category | null = categoryId !== undefined ? { category_id: categoryId, category_name: '', description: '' } : null;
                setEditedItem(prevState => ({
                  ...prevState!,
                  category: updatedCategory,
                }));
              }}
              label="Category"
            >
              {categories.map(category => (
                <MenuItem key={category.category_id} value={category.category_id.toString()}>{category.category_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditItem} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ItemList;
