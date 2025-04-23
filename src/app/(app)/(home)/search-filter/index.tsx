import React from 'react'
import SeachInput from './Seach-Input'
import Categories from './Categories'

interface Props {
    data : any
}


const SearchFilter = ({data} : Props) => {
  return (
    <div className='px-4 lg:px-12 py-8 flex gap-4 flex-col border-b w-full '>
        <SeachInput />
        <Categories data={data} />
    </div>
  )
}

export default SearchFilter