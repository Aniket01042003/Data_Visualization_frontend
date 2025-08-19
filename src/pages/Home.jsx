import React from 'react'
import Carousel from '../component/Navbar/Carousel.jsx'
import UploadDataset from '../component/UploadData/UploadDataset.jsx'
import UploadManualData from '../component/UploadData/UploadManualData.jsx'

function Home() {
  return (
    <div>
      <Carousel/>
      <UploadDataset/>
      <div className='border shadow-lg'></div>
      <UploadManualData/>
    </div>
  )
}

export default Home
