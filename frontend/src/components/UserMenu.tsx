import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user,] = useAtom(userAtom)
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
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
        </div>
    );
}
