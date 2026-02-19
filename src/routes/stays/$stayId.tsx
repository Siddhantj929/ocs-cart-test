import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stays/$stayId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/stays/$stayId"!</div>
}

{/* <div className='grid grid-cols-12'>
        <div className="border h-[20vh] col-span-3 sticky top-24"></div>
        <div className="border min-h-[200vh] col-span-9"></div>
      </div> */}