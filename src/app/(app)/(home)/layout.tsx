import React from 'react'
import Navbar from './navbar'
import Footer from './Footer'
import SearchFilter from './search-filter'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { CategoriesSelect, Category } from '@/payload-types'
interface Props {
  children: React.ReactNode
}
const layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'categories',
    pagination : false , 
    depth: 1,
    where: {
      parent: {
        exists: false,
      }
    }
  })
  const formatedData = data.docs.map((doc) => ({
    ...doc , 
    subcategories : (doc.subcategories?.docs ?? []).map((doc )=>({...(doc as Category)}))
  }))

  
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <SearchFilter data={formatedData} />
      <div className='flex-grow bg-[#f4f4f0]'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default layout