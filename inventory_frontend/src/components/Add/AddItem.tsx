import React, {useState, useEffect} from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {createItem} from '../../services/itemService';
import {Item} from '../../interfaces/Item';
import {Category} from '../../interfaces/Category';
import {getCategoryList} from '../../services/categoryService';

interface AddItemProps {
  onClose: () => void;
}

const initialFormData: Item = {
  item_id: 0,
  item_name: '',
  item_type: 'product',
  description: '',
  price: 0,
  discount: 0,
  category: undefined,
};

const AddItem: React.FC<AddItemProps> = ({onClose}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Item>(initialFormData);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(() => {
      return;
    });
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategoryList();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleItemTypeChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      item_type: value as "product" | "raw material"
    }));
  };

  const handleCategoryChange = (categoryId: number) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    setFormData(prevState => ({...prevState, category: category || undefined}));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newItemData = {
        ...formData,
        category_id: formData.category?.category_id,
      };
      const newItem = await createItem(newItemData);
      console.log('Item created:', newItem);
      setLoading(false);
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };


  return (
      <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  gap: '1.5rem',
                  margin: 'auto',
                  padding: '16px 0'
                }}
            >
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <TextField
                    label="Item Name"
                    name="item_name"
                    value={formData.item_name}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth>
                  <InputLabel id="item-type-label">Item Type</InputLabel>
                  <Select
                      labelId="item-type-label"
                      label="Item Type"
                      id="item-type"
                      value={formData.item_type}
                      onChange={(e) => handleItemTypeChange(e.target.value as string)}
                      name="item_type"
                      required
                  >
                    <MenuItem value="product">Product</MenuItem>
                    <MenuItem value="raw material">Raw Material</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                      labelId="category-label"
                      id="category"
                      label="Category"
                      value={formData.category?.category_id.toString() || ''}
                      onChange={(e) => handleCategoryChange(Number(e.target.value))}
                      required
                  >
                    {categories.map(category => (
                        <MenuItem key={category.category_id} value={category.category_id}>
                          {category.category_name}
                        </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    label="Discount"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                />
              </div>
            </Box>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={<AddIcon/>}
              >
                {loading ? <CircularProgress size={24}/> : 'Item'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default AddItem;
