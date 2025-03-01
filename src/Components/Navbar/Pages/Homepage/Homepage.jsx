import React, { useRef } from 'react'
import Hero from './Hero/Hero'
import Benefits from './Benefits/Benefits'
import Testimonial from './Testimonial/Testimonial'
import { Helmet } from 'react-helmet-async'

const Homepage = () => {
  const benefitsRef = useRef(null)

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Home - Spend Smart</title>
      </Helmet>
      <Hero scrollToBenefits={scrollToBenefits} />
      <Benefits ref={benefitsRef} />
      <Testimonial />
    </>
  )
}

export default Homepage
