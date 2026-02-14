import Footer from '@/components/footer'
import Header from '@/components/header'
import PageTitle from '@/components/page-title'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stays/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Header />
    <div className="px-4 py-16 lg:px-22">
      <PageTitle className='mb-6'>Zero Commissions. B2B Prices.</PageTitle>
      <p className='text-muted-foreground max-w-[65vw] mx-auto text-center'>OneClick Stays is a trusted villa and vacation rental platform operated by Nurturelux Experience Private Limited. We connect travelers with premium, handpicked villas and homestays across India, ensuring a seamless booking experience, verified listings, and 24/7 guest support.</p>
    </div>
    <Footer />
  </>
}
