import Navbar from '@/components/ui/Navbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;

    const athenticated = await isLogged()
    console.log('athenticated', athenticated) // todo fix
    if (!athenticated) {
      throw redirect({
        to: '/login'
      })
    }
  },
  component: () =>
    <>
      <Navbar />
      <Outlet />
    </>
})