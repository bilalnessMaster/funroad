import React from 'react'
import Navbar from './navbar'
import Footer from './Footer'

interface Props { 
    children : React.ReactNode
}
const layout = ({children} : Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-grow bg-[#f4f4f0]'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default layout