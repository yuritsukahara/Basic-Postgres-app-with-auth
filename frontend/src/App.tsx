import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth } from "./hooks/useAuth";
import { routeTree } from "./routeTree.gen";

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


const router = createRouter({
    routeTree,
    context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const authentication = useAuth();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ authentication }} />
        </QueryClientProvider>
    )
}

export default App;