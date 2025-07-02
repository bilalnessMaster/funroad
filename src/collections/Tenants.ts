
import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user)
  },
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store name",
      admin: {
        description: "This si the name of the store (e.g nila's store)"
      }
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "This is the subdomain for  ther store (e.g [slug].funroad.com)"
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user)
      }
    },
    {
      name: "image",
      type: "upload",
      relationTo: 'media',

    },
    {
      name: "stripeAccountId",
      type: 'text',
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user)
      }
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user)
      },
      admin: {
        description: "You cannot create product until you submit your stripe details"
      }
    }

  ],
}
