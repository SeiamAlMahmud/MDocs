import React from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import HeroSection from '../../Components/Homepage/HeroSection/HeroSection';
import Banner from '../../Components/Homepage/HeroSection/Banner/Banner';
const HomePage = () => {
  document.title = `Homepage`;
  ScrollToTop()

  return (
    <div className='h-full'>
      <HeroSection />
      <Banner />
    </div>
  )
}

export default HomePage