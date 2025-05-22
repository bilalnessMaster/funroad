

import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
    admin : {
      useAsTitle : "name"
    },
 
  fields: [
    {
      name : "name", 
      required : true , 
      type : "text",
      unique: true,
    },

   {
      name : "products", 
      type : "relationship",
      relationTo : "products",
      hasMany : true, 

    }, 
  ],
}
