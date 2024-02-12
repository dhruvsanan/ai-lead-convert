import React from 'react'
import Footer from './components/Footer'
import LandingPageNavbar from './components/LandingPageNavbar'

function LandingLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-clip">
        <LandingPageNavbar />
        <div className="flex-grow">{children}</div> 
        <Footer/>
    </section>
  )
}

export default LandingLayout