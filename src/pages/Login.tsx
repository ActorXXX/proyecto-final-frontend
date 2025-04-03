import { useEffect, useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import loginBackground from '@images/loginbg.jpeg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/admin');
    }, [navigate]);

    return (
        <Box display='flex' flexDirection='column' backgroundImage={loginBackground} alignItems='center' justifyContent='center' height='100vh' margin={'0 auto'}>
            <Text fontSize='2xl' mb='4' color={'wheat'}>Iniciar Sesión</Text>
            <Input
                width='300px'
                color='black'
                bgColor='white'
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb='4'
            />
            <Input
                width='300px'
                color='black'
                bgColor='white'
                placeholder='Contraseña'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb='4'
            />
            {error && <Text color='red.500' mb='4'>{error}</Text>}
            <Button onClick={handleLogin}>Iniciar Sesión</Button>
        </Box>
    );
};

export default Login;
