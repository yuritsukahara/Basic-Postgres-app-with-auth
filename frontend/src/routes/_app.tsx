import Navbar from '@/components/Navbar'
import { Container } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: () => <>
    <Navbar />
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  </>
})