import { useState } from "react"
import { Container, Typography, Paper } from '@mui/material' 
import './App.css'
import PersonList from "./components/PersonList";
import PersonSearch from "./components/PersonSearch";

const initialPersons = [
  {
    id: 1,
    nume: "Popescu Ion",
    cnp: "1980101223344",
    adresa: "Str. Lalelelor 10",
    serie: "AB",
    nrBuletin: "123456",
    poza: null
  },
  {
    id: 2,
    nume: "Ionescu Maria",
    cnp: "2970405332211",
    adresa: "Str. Trandafirilor 3",
    serie: "XY",
    nrBuletin: "998877",
    poza: null
  }
]; 

function App() {
  const [persons, setPersons] = useState(initialPersons)
  const [searchValue, setSearchValue] = useState("")

  const handleDeletePerson = (idDeSters) => {
    if(window.confirm("Are you sure you want to delete this person?")){
      const newPersonList = persons.filter(person => person.id !== idDeSters);
      setPersons(newPersonList)
    }
  }

  const filterPersons = persons.filter(person => {
    if(searchValue === "") return true;
    const term = searchValue.toLowerCase();
    return person.nume.toLowerCase().includes(term) ||
           person.cnp.includes(term) ||
           person.serie.toLowerCase().includes(term) ||
           person.nrBuletin.toLowerCase().includes(term);
  });

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
          />

          {persons.length === 0 && (
            <Typography align="center" sx={{ mt: 4, color: 'text.secondary' }}>
              Nu există persoane în listă.
            </Typography>
          )}

        </Paper>
      </Container>
    </>
  )
}

export default App