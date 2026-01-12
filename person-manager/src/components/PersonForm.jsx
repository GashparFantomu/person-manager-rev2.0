import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Grid,
  Avatar,
  Box,
  IconButton
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

const PersonForm = ({open, onClose, onSubmit, initialData}) => {
    const [formData, setFormData] = useState({
        nume: '',
        cnp: '',
        adresa: '',
        serie: '',
        nrBuletin: '',
        poza: null 
    });    
    useEffect(() => {
        if(initialData){
            setFormData(initialData);
        }else{
            setFormData({
                nume: '',
                cnp: '',
                adresa: '',
                serie: '',
                nrBuletin: '',
                poza: null 
            });
          }
        }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };



    const handleSubmit = () => {
        onSubmit(formData);
        // setFormData({
        //     nume: '',
        //     cnp: '',
        //     adresa: '',
        //     serie: '',
        //     nrBuletin: '',
        //     poza: null
        // });
        onClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData(prevData => ({ ...prevData, poza: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = () => {
        setFormData({ ...formData, poza: null });
    };

    
    return (
      <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit" : "Add"}</DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs = {12} display="flex" flexDirection="column" alignItems="center">
            <Box position="relative">
              <Avatar
                src={formData.poza}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton size="small" color = "error" onClick={handleRemoveImage} sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                <Delete fontSize="small"/>  
              </IconButton>
            </Box>
            <Button
                component="label" variant="outlined" startIcon={<CloudUpload />} size="small">
                Încarcă Poză
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>  
          </Grid>
          
          
          <Grid item xs={12}>
            <TextField
              name="nume" 
              label="Nume Complet"
              fullWidth
              value={formData.nume}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="cnp"
              label="CNP"
              fullWidth
              value={formData.cnp}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="adresa"
              label="Adresa"
              fullWidth
              multiline
              rows={2}
              value={formData.adresa}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              name="serie"
              label="Serie"
              fullWidth
              value={formData.serie}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={8}>
            <TextField
              name="nrBuletin"
              label="Număr Buletin"
              fullWidth
              value={formData.nrBuletin}
              onChange={handleChange}
            />
          </Grid>
          
          
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Anulează</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Save" : "Add"}
        </Button>
      </DialogActions>
        </Dialog>
    );
}
export default PersonForm;
    
