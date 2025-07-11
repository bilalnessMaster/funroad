
import { isSuperAdmin } from '@/lib/access';
import { Tenant } from '@/payload-types';
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical';
import { Play } from 'next/font/google';
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true

      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted)
    },
    update: ({ req }) => true
  },
  admin: {
    useAsTitle: "name",
    description: "You have to verify your account before you create a product "
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: 'description',
      type: "richText",

    },
    {
      name: 'price',
      required: true,
      type: "text",

    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,

    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true
    },
    {
      name: "refundPolicy",
      type: 'select',
      options: ['30-day', '14-day', '7-day', '3-day', '1-day', 'no-refund'],
      defaultValue: "30-day"
    },
    {
      name: "tags",
      type: 'relationship',
      relationTo: "tags",
      hasMany: true
    },
    {
      name: "content",
      editor : lexicalEditor({
        features({ defaultFeatures}) {
         return [
           ...defaultFeatures, 
            UploadFeature({
              collections : {
                 media : {
                  fields : [
                    {
                      name : "alt",
                      type : "text"
                    }
                  ]
                }
              }
            })
         ]   
        },
      }),
      type: "richText",
      admin: {
        description: 'Protect content only visible to customer whne they purchase a product '
      }
    },
    {
      name: "isArchived",
      label: "Archive",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Check if you want to hide this product ",
      }
    },
    {
      name: "isPrivate",
      label: "Private",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Product only visible on the tenant store",
      }
    }

  ],
}
