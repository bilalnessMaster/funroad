import React from 'react'
import SeachInput from './Seach-Input'
import Categories from './Categories'
import { CustomCategory } from '../types'

interface Props {
    data : CustomCategory[]
}


const SearchFilter = ({data} : Props) => {
  return (
    <div className='px-4 lg:px-12 py-8 flex gap-4 flex-col border-b w-full '>
        <SeachInput data={data} />
        <div className='hidden lg:block'>
        <Categories data={data} />
        </div>
    </div>
  )
}

export default SearchFilter