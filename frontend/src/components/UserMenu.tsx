import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from '@tanstack/react-router';
import { Payload } from '@server/sharedTypes';

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const userData = localStorage.getItem('user')

    let user: Payload = {
        user: 'string',
        groups: [],
        authenticated: false,
        exp: 0,
    }

    if (userData) {
        user = JSON.parse(userData)
    }

    return (
        <div>
            {user.authenticated ? (<>

                <Button
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='text-white hover:shadow-md hover:bg-primary-light'
                >
                    {user.user}

                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    color='primary'
                >
                    <MenuItem onClick={() => { handleClose(), signOut(), navigate({ to: '/' }) }}>
                        sair
                    </MenuItem>
                </Menu>
            </>) : <Link to='/login'> Login </Link>}

        </div>
    );
}
