import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/refund-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(legal)/refund-policy"!</div>
}
