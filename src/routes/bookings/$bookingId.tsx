import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bookings/$bookingId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bookings/bookingId"!</div>
}
