import type { CollectionConfig } from 'payload'

import { colorPickerField } from '@innovixx/payload-color-picker-field'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    colorPickerField({
      name: 'primaryColor',
      admin: {
        description: 'Pick a color for this page',
      },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff', '#ff00ff'],
      label: 'Primary Color',
    }),
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
    },
    // colorPickerField({
    //   name: 'secondaryColor',
    //   label: 'Secondary Color',

    //   admin: {
    //     description: 'Pick a secondary color for this page',
    //     position: 'sidebar',
    //     rtl: true,
    //   },
    // }),
  ],
}
