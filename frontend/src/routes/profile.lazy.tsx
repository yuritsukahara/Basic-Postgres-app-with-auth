import { createLazyFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'

export const Route = createLazyFileRoute('/profile')({
    component: Profile,
})

async function getCurrentUser() {
    const res = await api.me.$get();
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data
}

function Profile() {


    return <div className="p-2">Hello from About!</div>
}