import { type ApiRoutes } from '@server/app'
import { hc } from 'hono/client'

const token = localStorage.getItem('user');

const client = hc<ApiRoutes>("/", {
    headers: token
        ? { "Authorization": `Bearer ${token}` }
        : {}
});

export async function getMe() {
    const res = await api.me.$get()
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data
}

export const api = client.api
