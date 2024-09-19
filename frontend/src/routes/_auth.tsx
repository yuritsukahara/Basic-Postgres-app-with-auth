import Navbar from '@/components/Navbar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
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