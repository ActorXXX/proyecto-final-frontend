import { useEffect, useState } from 'react';
// import { Account } from 'appwrite';
import { Box, Button, Input, Text } from '@chakra-ui/react';
// import { Appwrite } from '../shared/lib/env';
import loginBackground from '@images/loginbg.jpeg'
import useAppwrite from '@hooks/useAppwrite';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { account } = useAppwrite();

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await account.createEmailPasswordSession(email, password);
            // Redirigir al usuario a la página principal o a la página deseada
            window.location.href = '/admin';
        } catch (err) {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    useEffect(() => {
        const session = localStorage.getItem('cookieFallback')

        if (session && JSON.parse(session).length != 0) navigate('/admin')
    }, [])

    return (
        <Box display='flex' flexDirection='column' backgroundImage={loginBackground} alignItems='center' justifyContent='center' height='100vh' margin={'0 auto'}>
            <Text fontSize='2xl' mb='4' color={'wheat'}>Iniciar Sesión</Text>
            <Input
                width='300px'
                color='white'
                bgColor='white'
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb='4'
            />
            <Input
                width='300px'
                color='white'
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