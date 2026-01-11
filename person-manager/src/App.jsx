import { useState, useMemo } from "react"
import { Container, Typography, Paper, Fab, Box } from '@mui/material'
import Add from '@mui/icons-material/Add';
import axios from "axios";
import PersonForm from "./components/PersonForm"; 
import './App.css'
import PersonList from "./components/PersonList";
import PersonSearch from "./components/PersonSearch";
import { useEffect } from "react";

// const initialPersons = [
//   {
//     id: 1,
//     nume: "Popescu Ion",
//     cnp: "1980101223344",
//     adresa: "Str. Lalelelor 10",
//     serie: "AB",
//     nrBuletin: "123456",
//     poza: null
//   },
//   {
//     id: 2,
//     nume: "Ionescu Maria",
//     cnp: "2970405332211",
//     adresa: "Str. Trandafirilor 3",
//     serie: "XY",
//     nrBuletin: "998877",
//     poza: null
//   }
// ]; 

function App() {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/persons');
      setPersons(response.data);
    } catch (error) {
      console.error("vezi ca nu mere ->", error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleOpenAddPerson = () => {
    setPersonToEdit(null);
    setIsFormOpen(true);
  }

  const handleEditPerson = (person) => {
    setPersonToEdit(person);
    setIsFormOpen(true);
  }



  const handleAddPerson = async (PersonData) => {
    
    if(personToEdit){
       try {
        const response = await axios.put(`http://localhost:3000/api/persons/${personToEdit._id}`, PersonData);
        const updatedPersonFromDB = response.data;
        const updatedPersons = persons.map(person => 
          person._id === updatedPersonFromDB._id ? updatedPersonFromDB : person
        );
        setPersons(updatedPersons);
        setIsFormOpen(false);
        setPersonToEdit(null);
      } catch (err) {
        alert("eroare la actualizare FMM ce dumniezo mai e acum? " + err.message);
      }
    
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/persons', PersonData);

        const newPersonFromDB = response.data;
        setPersons([...persons, newPersonFromDB]);
        
        setIsFormOpen(false); 
      } catch (err) {
        alert("Eroare la salvare: " + err.message);
      }
    }
  };

  const handleDeletePerson = async (idDeSters) => {
    if(window.confirm("Are you sure you want to delete this person?")){
      try {
        await axios.delete(`http://localhost:3000/api/persons/${idDeSters}`);
        const newPersonList = persons.filter(person => person._id !== idDeSters);
        setPersons(newPersonList)
      } catch (error) {
        console.error("vezi ca nu mere stergerea, nush de ce ->", error);
      }
    }
  }

const filterPersons = useMemo(() => {
  return persons.filter(person => {
    if (searchValue === "") return true;
    const term = searchValue.toLowerCase();
    return person.nume.toLowerCase().includes(term) ||
           person.cnp.includes(term) ||
           person.serie.toLowerCase().includes(term) ||
           person.nrBuletin.toLowerCase().includes(term);
  });
}, [persons, searchValue]);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#f5f5f5f5', minHeight: '80vh' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Person Manager
          </Typography>
          <PersonSearch 
            searchValue={searchValue} 
            onChange={setSearchValue} 
          />

          <PersonList 
            persons={filterPersons} 
            onDelete={handleDeletePerson} 
            onEdit={handleEditPerson}
          />

          <PersonForm 
            open={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            onSubmit={handleAddPerson} 
            initialData={personToEdit}
          />
          

          {persons.length === 0 && (
            <Typography align="center" sx={{ mt: 4, color: 'text.secondary' }}>
              Nu există persoane în listă. Did you killed them all?
            </Typography>
          )}

        </Paper>
        <Fab 
          color="primary" 
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
          onClick={handleOpenAddPerson}
        >
          <Add />
        </Fab>
      </Container>
    </>
  )
}

export default App;
