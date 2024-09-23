import DataTable from '@/components/pages/users/DataTable';
import { Container, Box, Typography, Button, Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { api } from '@/lib/api';


export const Route = createFileRoute('/_auth/users/')({
    component: Users,
    loader: () => {
    }
})


function Users() {
    const [open, setOpen] = useState(false);


    const handlePlusIcon = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container className='py-5'>
            <Box className="flex justify-between mb-4">
                <Typography variant="h4">Users</Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handlePlusIcon}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Box>

            <DataTable modal={setOpen} data='' />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    <Box className='flex float-end'>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                </DialogContent>
            </Dialog>

        </Container>
    );
}