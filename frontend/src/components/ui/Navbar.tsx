import { AppBar, Typography } from '@mui/material';
import Sidebar from './Sidebar'
import UserMenu from './UserMenu';
import { Link } from '@tanstack/react-router';

export default function Navbar() {

    return (
        <>
            <AppBar component="nav" position="static">
                <div className='flex justify-between items-center m-2'>
                    <Sidebar />
                    <Typography variant='h6' component="h1" ><Link to="/">{import.meta.env.VITE_COMPANY_NAME}</Link></Typography>
                    <UserMenu />
                </div>
            </AppBar>
        </>)
}