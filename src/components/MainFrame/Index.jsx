import React from 'react'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

const MainFrame = (props) => {
  const { location } = props

  return (
    <div>
      <Navbar />
      <Dashboard location={location}/>
    </div>
  )
}

export default MainFrame
