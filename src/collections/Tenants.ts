
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
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
      admin: {
        readOnly: true
      }
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "You cannot create product until    you submit your stripe details"
      }
    }

  ],
}
