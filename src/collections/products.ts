
import type { CollectionConfig } from 'payload'

export const Products : CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name : "name", 
      required : true , 
      type : "text",
    },
    {
      name : 'description', 
      type : "text", 

  }, 
 {
      name : 'price',
      required : true,
      type : "text", 

    },
    {
      name : "category", 
      type : "relationship",
      relationTo : "categories",
      hasMany : true, 

    }, 
    {
      name : "image", 
      type : "upload", 
      relationTo : "media",
      required : true
    }, 
    {
      name : "refundPolicy",
      type : 'select', 
      options: ['30-day', '14-day', '7-day', '3-day', '1-day', 'no-refund'],
      defaultValue : "30-day"
    }

  ],
}
