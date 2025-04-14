import React, {useEffect, useState} from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel, Select, MenuItem, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import {
  convertInventory,
  convertToExistingInventory,
} from '../../services/inventoryService';
import {Inventory, ItemAmount} from '../../interfaces/Inventory';
import {Item} from "../../interfaces/Item";
import {getItemList} from "../../services/itemService";

interface ConvertInventoryProps {
  onClose: () => void;
  materialInventory: Inventory[];
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

const ConvertInventory: React.FC<ConvertInventoryProps> = ({ onClose, materialInventory, inventories}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Inventory>(initialFormData);
  const [items, setItems] = useState<Item[]>([]);
  const [type, setType] = useState<string>('existing');
  const [selectedInventory, setSelectedInventory] = useState<number>();
  const [rawMaterials, setRawMaterials] = useState<ItemAmount[]>([
    {
      inventory: {
        inventory_id: '',
      },
      quantity: 1
    }
  ]);

  useEffect(() => {
    fetchItems().then(() => { return; });
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItemList();
      const products: Item[] = data.filter(item => {
        return item.item_type === 'product';
      })
      setItems(products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value
    }));
  };

  const handleItemChange = (itemId: number, index: number) => {
    const inventoryItem = materialInventory.find(inv => inv.item.item_id === itemId);
    if (inventoryItem) {
      const newFields = rawMaterials.map((rawMaterial, i) => {
        if (i === index) {
          return { ...rawMaterial, inventory: inventoryItem };
        }
        return rawMaterial;
      });
      setRawMaterials(newFields);
    }
  };

  const handleQuantityChange = (value: number, index: number) => {
    const newFields = rawMaterials.map((rawMaterial, i) => {
      if (i === index) {
        return {
          ...rawMaterial,
          quantity: value,
        };
      }
      return rawMaterial;
    });
    setRawMaterials(newFields);
  };

  const newItemAmount: ItemAmount = {
    inventory: {
      inventory_id: '',
    },
    quantity: 1
  }

  const handleProductChange = (itemId: number) => {
    const item = items.find(item => item.item_id === itemId);
    setFormData(prevState => ({ ...prevState, item: item || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'new') {
        await convertInventory(rawMaterials, formData);
      } else {
        await convertToExistingInventory(rawMaterials, formData, selectedInventory);
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
        <DialogTitle>Convert Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  gap: '16px',
                  margin: 'auto',
                  padding: '16px 0',
                }}
            >
              <div id="parent" style={{display: "flex", gap: "1rem", flexDirection: "column"}}>
                {rawMaterials.map((itemAmount, index) => (
                    <div key={index} className={"child"}
                         style={{display: 'grid', gridTemplateColumns: '1.25fr .75fr', gridGap: ' 1rem'}}>
                      <FormControl fullWidth>
                        <InputLabel id="item-label">Raw Material</InputLabel>
                        <Select
                            labelId="item-label"
                            id={`item${index}`}
                            label="Raw Material"
                            value={itemAmount.inventory.inventory_id.toString() || ''}
                            onChange={(e) => handleItemChange(Number(e.target.value), index)}
                            required
                        >
                          {materialInventory.map(inv => (
                              <MenuItem key={inv.inventory_id} value={inv.item.item_id}>
                                {inv.item.item_name}
                              </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                          label="Amount"
                          type="number"
                          name={`amount${index}`}
                          value={itemAmount.quantity}
                          onChange={(e) => handleQuantityChange(Number(e.target.value), index)}
                          required
                      />
                    </div>
                ))}
                <Button
                    type="button" onClick={() => setRawMaterials([...rawMaterials, newItemAmount])}
                    variant="contained" color="primary"
                    style={{
                      width: "fit-content",
                      alignSelf: "end"
                    }}
                    disabled={loading} startIcon={<AddIcon/>}>
                  {loading ? <CircularProgress size={24}/> : 'Item'}
                </Button>
              </div>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Add as</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={'existing'}
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value)
                    }}
                >
                  <FormControlLabel value="existing" control={<Radio/>} label="Existing"/>
                  <FormControlLabel value="new" control={<Radio/>} label="New"/>
                </RadioGroup>
              </FormControl>
              <div style={{display: 'grid', gridTemplateColumns: '1.25fr .75fr', gridGap: ' 1rem'}}>
                {type === 'new' ? (
                    <FormControl fullWidth>
                      <InputLabel id="item-label">Product</InputLabel>
                      <Select
                          labelId="item-label"
                          id="item"
                          label="Product"
                          value={formData.item?.item_id.toString() || ''}
                          onChange={(e) => handleProductChange(Number(e.target.value))}
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
                <TextField
                    label="Last Restock Date"
                    name="last_restock_date"
                    type="date"
                    value={formData.last_restock_date}
                    onChange={handleChange}
                    onBlur={(e) => {
                      const {name, value} = e.target;
                      setFormData(prevState => ({
                        ...prevState,
                        [name as string]: new Date(value).toISOString().slice(0, 10)
                      }));
                    }}
                    required
                />
                <TextField
                    label="Reorder Level"
                    name="reorder_level"
                    type="number"
                    value={formData.reorder_level}
                    onChange={handleChange}
                    required
                />
              </div>
            </Box>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained"
                      color="primary" disabled={loading}
                      startIcon={<ChangeCircleOutlinedIcon/>}
              >
                {loading ? <CircularProgress size={24}/> : 'Convert'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
  );
};

export default ConvertInventory;
