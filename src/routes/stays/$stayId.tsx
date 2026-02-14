import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stays/$stayId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/stays/$stayId"!</div>
}
