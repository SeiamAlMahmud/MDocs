import React from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import HeroSection from '../../Components/HeroSection/HeroSection';
const HomePage = () => {
  document.title = `Homepage`;
  ScrollToTop()

  return (
    <div className='h-full'>
      <HeroSection />
    </div>
  )
}

export default HomePage