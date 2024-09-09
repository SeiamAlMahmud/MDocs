import React from 'react'
import ScrollToTop from '../../Foundation/ScrollToTop';
import HeroSection from '../../Components/Homepage/HeroSection/HeroSection';
import Banner from '../../Components/Homepage/Banner/Banner';
import DownloadApp from '../../Components/Homepage/DownloadApp/DownloadApp';
const HomePage = () => {
  document.title = `Homepage`;
  ScrollToTop()

  return (
    <div className='h-full'>
      <Banner />
      <HeroSection />
      <DownloadApp />
    </div>
  )
}

export default HomePage