import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className=' flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 text-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage
