import Navbar from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

function Root() {
    return (
        <>
            <hr />
            <Outlet />
        </>
    )
}

export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <Root />
            <TanStackRouterDevtools />
        </>
    ),
})

