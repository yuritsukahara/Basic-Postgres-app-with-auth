import { type ApiRoutes } from '@server/app'
import { hc } from 'hono/client'

const client = hc<ApiRoutes>('/')

export async function getCurrentUser() {
    const res = await api.me.$get();
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data
}

export const api = client.api