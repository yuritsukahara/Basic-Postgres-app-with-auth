import Clock from '@/components/Clock'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
    component: Index,
})

function Index() {
    return (

        <Clock />

    )
}
