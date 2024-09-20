import { AuthContext } from '@/hooks/useAuth';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type RouterContext = {
    authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: Root,
})

function Root() {
    return <>
        <Outlet />;
        <TanStackRouterDevtools />
    </>
}
