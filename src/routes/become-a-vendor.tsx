import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/become-a-vendor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/become-a-vendor"!</div>
}
