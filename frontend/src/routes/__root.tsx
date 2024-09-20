import { AuthContext } from '@/hooks/useAuth';
import { Button, Typography } from '@mui/material';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import companyLogo from '../assets/company-logo.png'

type RouterContext = {
    authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: Root,
    notFoundComponent: NotFound,
})

function Root() {
    return <>
        <Outlet />;
        <TanStackRouterDevtools />
    </>
}
function NotFound() {
    return (
        <>
            <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50 ">
                <div className="flex flex-col rounded-lg bg-white p-8 text-center shadow-xl gap-3">
                    <img src={companyLogo} className='w-64' />
                    <Typography component="h1" variant='h3'>Error 404</Typography>
                    <Typography component="p">Page not found</Typography>
                    <Button href="/" variant="contained">Home</Button>
                </div>
            </div>
        </ >
    );
}