import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/terms-and-conditions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(legal)/terms-and-conditions"!</div>
}
