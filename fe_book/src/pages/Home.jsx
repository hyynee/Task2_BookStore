import React from 'react'
import BestSeller from '../components/Books/BestSeller'
import FeaturedBook from '../components/Books/FeaturedBook'
import Newsletter from '../components/Books/Newsletter'
import Hero from '../components/Layout/Hero'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedBook />
      <BestSeller />
      <Newsletter />
    </>
  )
}

export default Home