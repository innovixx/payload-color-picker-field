import path from 'path'
import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: (): boolean => true,
  },
  upload: {
    staticDir: path.join(process.cwd(), 'storage', 'media'),
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
}

export default Media
