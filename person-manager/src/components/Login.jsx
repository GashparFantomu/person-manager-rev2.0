import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Box, Link } from '@mui/material';

const Login = ({ onLogin }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const endpoint = isLoginMode ? 'login' : 'register';
        
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/${endpoint}`, {
                username,
                password
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            onLogin(); 

        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "A apărut o eroare!";
            setError(message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                <Typography component="h1" variant="h5">
                    {isLoginMode ? "Autentificare" : "Înregistrare Cont Nou"}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Parola"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLoginMode ? "Log In" : "Creează Cont"}
                    </Button>

                    <Box textAlign="center">
                        <Link 
                            component="button"
                            variant="body2"
                            type="button"
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setError(""); 
                            }}
                        >
                            {isLoginMode 
                                ? "Nu ai cont? Înregistrează-te aici" 
                                : "Ai deja cont? Loghează-te"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;