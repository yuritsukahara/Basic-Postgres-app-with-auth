import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/groups/')({
  component: () => <div>Hello /_auth/groups/!</div>
})