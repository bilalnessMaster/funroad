import { Category } from '@/payload-types'
import React from 'react'
import CategoryDropdown from './CategoryDropdown'
interface Props { 
    data : any
}
const Categories = ({data} : Props) => {
  return (
    <div className=''>
        {
            data.map((category : Category) =>(
                <div key={category.id}>
                    <CategoryDropdown 
                        category={category}
                        isActive ={false}
                        isNavigationHovered={false}
                    />
                </div>
            ))
        }
    </div>
  )
}

export default Categories