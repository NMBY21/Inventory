import React, {useEffect, useState} from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel, Select, MenuItem, FormControl, Radio, FormLabel, RadioGroup, FormControlLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {addToExistingInventory, createInventory} from '../../services/inventoryService';
import { Inventory } from '../../interfaces/Inventory';
import {Supplier} from "../../interfaces/Supplier";
import {Item} from "../../interfaces/Item";
import {getSupplierList} from "../../services/supplierService";
import {getItemList} from "../../services/itemService";

interface AddInventoryProps {
  onClose: () => void;
  inventories: Inventory[];
}

const initialFormData: Inventory = {
  inventory_id: 0,
  quantity_in_stock: 0,
  reorder_level: 0,
  last_restock_date: new Date(),
  item: undefined,
  supplier: undefined,
};

const AddInventory: React.FC<AddInventoryProps> = ({ onClose, inventories }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Inventory>(initialFormData);
  const [items, setItems] = useState<Item[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [type, setType] = useState<string>('existing');
  const [selectedInventory, setSelectedInventory] = useState<number>();

  useEffect(() => {
    fetchItems().then(() => { return; });
    fetchSuppliers().then(() => { return; });
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItemList();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getSupplierList();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value
    }));
  };

  const handleItemChange = (itemId: number) => {
    const item = items.find(item => item.item_id === itemId);
    setFormData(prevState => ({ ...prevState, item: item || undefined }));
  };

  const handleSupplierChange = (supplierId: number) => {
    const supplier = suppliers.find(sup => sup.supplier_id === supplierId);
    setFormData(prevState => ({ ...prevState, supplier: supplier || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'new') {
        await createInventory(formData);
      } else {
        await addToExistingInventory(formData, selectedInventory);
      }
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
      <DialogTitle>Add Inventory</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gap: '1.5rem',
              margin: 'auto',
              padding: '16px 0',
              placeItems: 'center',
            }}
          >
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Add as</FormLabel>
              <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={'existing'}
                  value={type}
                  onChange={(e) => { setType(e.target.value) }}
              >
                <FormControlLabel value="existing" control={<Radio />} label="Existing" />
                <FormControlLabel value="new" control={<Radio />} label="New" />
              </RadioGroup>
            </FormControl>
            <div style={{display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: '1rem'}}>
              { type === 'new' ? (
                  <FormControl fullWidth>
                    <InputLabel id="item-label">Item</InputLabel>
                    <Select
                        labelId="item-label"
                        id="item"
                        label="Item"
                        value={formData.item?.item_id.toString() || ''}
                        onChange={(e) => handleItemChange(Number(e.target.value))}
                        required
                    >
                      {items.map(item => (
                          <MenuItem key={item.item_id} value={item.item_id}>
                            {item.item_name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel id="inventory-label">Inventory</InputLabel>
                    <Select
                        labelId="inventory-label"
                        id="inventory"
                        label="Inventory"
                        value={selectedInventory}
                        onChange={(e) => setSelectedInventory(Number(e.target.value))}
                        required
                    >
                      {inventories.map((inventory) => (
                          <MenuItem key={inventory.inventory_id} value={inventory.inventory_id}>
                            {inventory.item.item_name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )
              }
              <TextField
                label="Quantity in Stock"
                name="quantity_in_stock"
                type="number"
                value={formData.quantity_in_stock}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth>
                <InputLabel id="supplier-label">Supplier</InputLabel>
                <Select
                    labelId="supplier-label"
                    id="supplier"
                    label="Supplier"
                    value={formData.supplier?.supplier_id.toString() || ''}
                    onChange={(e) => handleSupplierChange(Number(e.target.value))}
                >
                  {suppliers.map(supplier => (
                      <MenuItem key={supplier.supplier_id} value={supplier.supplier_id}>
                        { supplier.supplier_name }
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Reorder Level"
                name="reorder_level"
                type="number"
                value={formData.reorder_level}
                onChange={handleChange}
                required
              />
              <TextField
                label="Last Restock Date"
                name="last_restock_date"
                type="date"
                value={formData.last_restock_date}
                onChange={handleChange}
                onBlur={(e) => {
                  const { name, value } = e.target;
                  setFormData(prevState => ({
                    ...prevState,
                    [name as string]: new Date(value).toISOString().slice(0, 10)
                  }));
                }}
                required
              />
            </div>
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained"
                    color="primary" disabled={loading}
                    startIcon={<AddIcon />}>
              {loading ? <CircularProgress size={24} /> : 'Inventory'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventory;
