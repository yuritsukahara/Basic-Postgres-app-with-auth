import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingIndicator() {
    return (
        <Box className="flex justify-center m-5">
            <CircularProgress />
        </Box>
    );
}