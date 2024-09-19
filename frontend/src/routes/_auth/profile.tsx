import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
    component: Profile,
})

function Profile() {
    return <div className="p-2">Hello from Profile!</div>
}