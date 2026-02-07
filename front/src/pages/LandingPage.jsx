import DataHome from '@/home/DataHome'
import MapHome from '@/home/MapHome'
import Plans from '@/home/Plans'
import Trailer from '@/home/Trailer'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <Trailer />
      <DataHome />
      <Plans />
      <MapHome />
    </div>
  )
}

export default LandingPage
