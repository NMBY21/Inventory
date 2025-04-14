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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {getInventoryList, deleteInventory, updateInventory} from '../../services/inventoryService';
import {Inventory} from '../../interfaces/Inventory';
import AddInventory from "../Add/AddInventory";
import ConvertInventory from "./ConvertInventory";

const InventoryList = () => {
  const [loading, setLoading] = useState(false);
  const [isProduct, setIsProduct] = useState(true);
  const [productInventory, setProductInventory] = useState<Inventory[]>([]);
  const [materialInventory, setMaterialInventory] = useState<Inventory[]>([]);
  const [openAddInventoryDialog, setOpenAddInventoryDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConvertDialog, setOpenConvertDialog] = useState(false);
  const [inventoryId, setInventoryId] = useState<number | null>(null);
  const [editedInventory, setEditedInventory] = useState<Inventory | null>(null);


  useEffect(() => {
    fetchInventory().then(() => { return; })
  }, []);

  // const fetchInventory = async () => {
  //   try {
  //     setLoading(true);
  //     const product: Inventory[] = [];
  //     const material: Inventory[] = [];
  //     (await getInventoryList()).forEach((element) => {
  //       if (element.item.item_type === 'product') {
  //         product.push(element);
  //       } else {
  //         material.push(element);
  //       }
  //     });
  //     setProductInventory(product);
  //     setMaterialInventory(material);
  //   } catch (error) {
  //     console.error('Error fetching inventory:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchInventory = async () => {
  try {
    setLoading(true);
    const product: Inventory[] = [];
    const material: Inventory[] = [];

    (await getInventoryList()).forEach((element) => {
      if (element.item && element.item.item_type) {
        if (element.item.item_type === 'product') {
          product.push(element);
        } else {
          material.push(element);
        }
      } else {
        console.warn("Missing item or item_type in inventory element:", element);
      }
    });

    setProductInventory(product);
    setMaterialInventory(material);
  } catch (error) {
    console.error('Error fetching inventory:', error);
  } finally {
    setLoading(false);
  }
};

  const handleMaterialDelete = async (inventoryId: number) => {
    setLoading(true);
    try {
      const success = await deleteInventory(inventoryId);
      if (success) {
        setMaterialInventory(prevInventory => prevInventory.filter(inv => inv.inventory_id !== inventoryId));
      }
    } catch (error) {
      console.error('Error deleting inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDelete = async (inventoryId: number) => {
    setLoading(true);
    try {
      const success = await deleteInventory(inventoryId);
      if (success) {
        setProductInventory(prevInventory => prevInventory.filter(inv => inv.inventory_id !== inventoryId));
      }
    } catch (error) {
      console.error('Error deleting inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddInventoryDialog = () => {
    setOpenAddInventoryDialog(true);
  };

  const handleCloseAddInventoryDialog = () => {
    setOpenAddInventoryDialog(false);
    fetchInventory().then(() => { return; })
  };

  const handleOpenMaterialConvertDialog = () => {
    setOpenConvertDialog(true);
  };

  const handleCloseConvertInventoryDialog = () => {
    setOpenConvertDialog(false);
    fetchInventory().then(() => { return; })
  };

  const handleOpenProductEditDialog = (inventoryId: number) => {
    const inventoryToEdit = productInventory.find(inv => inv.inventory_id === inventoryId);
    if (inventoryToEdit) {
      setInventoryId(inventoryId);
      // Ensure last_restock_date is a Date object
      inventoryToEdit.last_restock_date = new Date(inventoryToEdit.last_restock_date);
      setEditedInventory({ ...inventoryToEdit });
      setOpenEditDialog(true);
    }
  };

  const handleOpenMaterialEditDialog = (inventoryId: number) => {
    const inventoryToEdit = materialInventory.find(inv => inv.inventory_id === inventoryId);
    if (inventoryToEdit) {
      setInventoryId(inventoryId);
      // Ensure last_restock_date is a Date object
      inventoryToEdit.last_restock_date = new Date(inventoryToEdit.last_restock_date);
      setEditedInventory({ ...inventoryToEdit });
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setInventoryId(null);
    setEditedInventory(null);
    fetchInventory().then(() => { return; });
  };

  const handleEditInventory = async () => {
    if (editedInventory && inventoryId !== null) {
      // Parse the date string manually to ensure it's valid
      const editedDate = new Date(editedInventory.last_restock_date);
      if (isNaN(editedDate.getTime())) {
        console.error('Invalid date entered');
        return;
      }
  
      // Update the editedInventory with the parsed date
      editedInventory.last_restock_date = editedDate;
  
      try {
        await updateInventory(inventoryId, editedInventory); // Use inventoryId for update
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating inventory:', error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === 'true') {
      setIsProduct(true);
    } else {
      setIsProduct(false);
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Inventory</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 10px 10px'}}>
        <FormControl>
          {/*<FormLabel id="demo-row-radio-buttons-group-label">Item Type</FormLabel>*/}
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={isProduct}
              onChange={handleChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Product" />
            <FormControlLabel value="false" control={<Radio />} label="Raw Material" />
          </RadioGroup>
        </FormControl>
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddInventoryDialog}
        >
          Add Inventory
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Inventory ID</TableCell>
              <TableCell>Quantity in Stock</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Reorder Level</TableCell>
              <TableCell>Last Restock Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                  isProduct ?
                    (productInventory.map((inv, index) => (
                      <TableRow key={inv.inventory_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{inv.item.item_name}</TableCell>
                        <TableCell>{inv.inventory_id}</TableCell>
                        <TableCell>{inv.quantity_in_stock}</TableCell>
                        <TableCell>{inv.supplier ? inv.supplier.supplier_name : '-'}</TableCell>
                        <TableCell>{inv.reorder_level}</TableCell>
                        <TableCell>{new Date(inv.last_restock_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleOpenProductEditDialog(inv.inventory_id)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton color="error" aria-label="delete" onClick={() => handleProductDelete(inv.inventory_id)} size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))) : (
                        materialInventory.map((inv, index) => (
                          <TableRow key={inv.inventory_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{inv.item.item_name}</TableCell>
                            <TableCell>{inv.inventory_id}</TableCell>
                            <TableCell>{inv.quantity_in_stock}</TableCell>
                            <TableCell>{inv.supplier ? inv.supplier.supplier_name : '-'}</TableCell>
                            <TableCell>{inv.reorder_level}</TableCell>
                            <TableCell>{new Date(inv.last_restock_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleOpenMaterialEditDialog(inv.inventory_id)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton color="error" aria-label="delete" size="small" onClick={() => handleMaterialDelete(inv.inventory_id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                    ))))
            }
          </TableBody>
        </Table>
      </TableContainer>

      {
        !isProduct ? (
            <IconButton
                style={{position: 'fixed', bottom: '1rem', right: '1rem'}}
                color="primary"
                onClick={() => handleOpenMaterialConvertDialog()}
                aria-label="Change to Product"
            >
              <ChangeCircleIcon fontSize="large" />
            </IconButton>
        ) : (<></>)
      }

      <Dialog open={openAddInventoryDialog} onClose={handleCloseAddInventoryDialog}  >
        <DialogContent>
          <AddInventory onClose={handleCloseAddInventoryDialog} inventories={isProduct ? productInventory : materialInventory} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={openConvertDialog} onClose={handleCloseConvertInventoryDialog}  >
        <DialogContent>
          <ConvertInventory onClose={handleCloseConvertInventoryDialog} materialInventory={materialInventory} inventories={productInventory}/>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}  >
        <DialogTitle>Edit Inventory</DialogTitle>
        <DialogContent>
          {editedInventory && (
            <>
              <TextField
                label="Quantity in Stock"
                value={editedInventory.quantity_in_stock || ''}
                onChange={e => setEditedInventory(prevState => ({ ...prevState!, quantity_in_stock: parseInt(e.target.value) }))}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Reorder Level"
                value={editedInventory.reorder_level || ''}
                onChange={e => setEditedInventory(prevState => ({ ...prevState!, reorder_level: parseInt(e.target.value) }))}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Last Restock Date"
                type="date"
                value={editedInventory.last_restock_date ? editedInventory.last_restock_date.toISOString().split('T')[0] : ''}
                onChange={e => setEditedInventory(prevState => ({ ...prevState!, last_restock_date: new Date(e.target.value) }))}
                fullWidth
                variant="outlined"
                margin="normal"
              />

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditInventory} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryList;
