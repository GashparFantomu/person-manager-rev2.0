import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Grid 
} from '@mui/material';

const PersonForm = ({open, onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        nume: '',
        cnp: '',
        adresa: '',
        serie: '',
        nrBuletin: '',
        poza: null
    });    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({
            nume: '',
            cnp: '',
            adresa: '',
            serie: '',
            nrBuletin: '',
            poza: null
        });
        onClose();
    };

    
    return (
        <>
<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adaugă Persoană Nouă</DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
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
          Salvează
        </Button>
      </DialogActions>
    </Dialog>
        </>
    );
}
export default PersonForm;
    
