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
import { getFactoryList, deleteFactory, updateFactory } from '../../services/factoryService'; // Assuming you have service functions for factory operations
import { Factory } from '../../interfaces/Factory';
import AddFactory from "../Add/AddFactory";

const FactoryList = () => {
  const [loading, setLoading] = useState(false);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddFactoryDialog, setOpenAddFactoryDialog] = useState(false); // State for Add Factory dialog
  const [editFactoryId, setEditFactoryId] = useState<number | null>(null);
  const [editedFactory, setEditedFactory] = useState<Factory | null>(null);

  useEffect(() => {
    fetchFactories().then(() => {return;});
  }, []);

  const fetchFactories = async () => {
    try {
      setLoading(true);
      const data = await getFactoryList();
      setFactories(data);
    } catch (error) {
      console.error('Error fetching factories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (factoryId: number) => {
    setLoading(true);
    try {
      const success = await deleteFactory(factoryId);
      if (success) {
        setFactories(prevFactories => prevFactories.filter(factory => factory.factoryId !== factoryId));
      }
    } catch (error) {
      console.error('Error deleting factory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditDialog = (factoryId: number) => {
    const factoryToEdit = factories.find(factory => factory.factoryId === factoryId);
    if (factoryToEdit) {
      setEditedFactory(factoryToEdit);
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditFactoryId(null);
    setEditedFactory(null);
    fetchFactories().then(() => { return; });
  };

  const handleEditFactory = async () => {
    if (editedFactory) {
      try {
        await updateFactory(editedFactory.factoryId!, editedFactory);
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating factory:', error);
      }
    }
  };

  const handleOpenAddFactoryDialog = () => {
    setOpenAddFactoryDialog(true);
  };

  const handleCloseAddFactoryDialog = () => {
    setOpenAddFactoryDialog(false);
    fetchFactories().then(() => {return;}); // Refresh factory list after adding a new factory
  };

  const handleAddFactory = async () => {
    try {
      handleCloseAddFactoryDialog();
    } catch (error) {
      console.error('Error creating factory:', error);
    }
  };

  return (
    <Box>
      <h1 style={{textAlign: 'center', marginTop: '1.5rem'}}>Factories</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddFactoryDialog} // Open Add Factory dialog on button click
        style={{ float: 'right', marginRight: '10px', marginBottom: '10px' }}
      >
        Add Factory
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Factory Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              factories.map(factory => (
                <TableRow key={factory.factoryId}>
                  <TableCell>{factory.factoryName}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => handleOpenEditDialog(factory.factoryId)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(factory.factoryId)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody> 
        </Table>
      </TableContainer>

      <Dialog open={openAddFactoryDialog} onClose={handleCloseAddFactoryDialog}  >
        <DialogContent>
          <AddFactory onClose={handleCloseAddFactoryDialog} />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Factory</DialogTitle>
        <DialogContent>
          <TextField
            label="Factory Name"
            value={editedFactory?.factoryName || ''}
            onChange={e => setEditedFactory(prevState => ({ ...prevState!, factoryName: e.target.value }))}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditFactory} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FactoryList;
