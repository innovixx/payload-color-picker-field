import type { CollectionConfig } from 'payload/types'

// eslint-disable-next-line import/no-relative-packages
import { colorPickerField } from '../../../dist'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    colorPickerField({
      name: 'primaryColor',
      label: 'Primary Color',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Choose a color for this page',
      },
    }),
    colorPickerField({
      name: 'secondaryColor',
      label: 'Secondary Color',
      required: true,
    }),
  ],
}

export default Pages
