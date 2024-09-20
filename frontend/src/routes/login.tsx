import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoginForm from '@/components/ui/Forms/LoginForm';
import CopyRight from '@/components/ui/CopyRight'
import companyLogo from '../assets/company-logo.png'


import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
    component: Login,
})

function Login() {
    return (
        <Container component="main" maxWidth="xs">
            <Box className="flex flex-col" >
                <img src={companyLogo} alt="company logo" className="w-full my-10" />
                <LoginForm />
            </Box>
            <CopyRight className="mt-10" />
        </Container>
    )
}


