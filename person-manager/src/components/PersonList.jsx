import React from 'react';
import { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Avatar, 
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, ContentCopy, Edit } from '@mui/icons-material';



const PersonList = ({persons, onDelete}) =>{
  const [toastOpen, setToastOpen] = useState(false);
  const handleCopy = (person) =>{
    const text = `${person.nume}, ${person.cnp}, ${person.adresa}, ${person.serie}, ${person.nrBuletin}.`;
    navigator.clipboard.writeText(text);
    setToastOpen(true);
  };
  const handleCloseToast = () =>{
    setToastOpen(false);
  }
  return (
    <Grid container spacing={2}>
      {persons.map((person) => (
        <Grid item xs={12} sm={6} md={4} key={person.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src={person.poza} 
                  sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}
                >
                  {!person.poza && person.nume.charAt(0)}
                </Avatar>
                
                <Box>
                  <Typography variant="h6" component="div">
                    {person.nume}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {person.serie} {person.nrBuletin}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                <strong>CNP:</strong> {person.cnp}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Adresa:</strong> {person.adresa}
              </Typography>

            </CardContent>

            <CardActions>
              <Tooltip title="Copiază propoziție">
                <IconButton onClick={() => handleCopy(person)} color="primary">
                  <ContentCopy />
                </IconButton>
              </Tooltip>

               <IconButton color="info">
                  <Edit />
                </IconButton>

              <Box sx={{ flexGrow: 1 }} /> 
              
              <Button 
                size="small" 
                color="error" 
                startIcon={<Delete />}
                onClick={() => onDelete(person.id)}
              >
                Șterge
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Snackbar 
        open={toastOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Text copiat cu succes în clipboard!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PersonList;
