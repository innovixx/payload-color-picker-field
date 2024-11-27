// eslint-disable-next-line import/no-relative-packages
import type { CollectionConfig } from 'payload'

// import { colorPickerField } from '../../../dist'

const Pages: CollectionConfig = {
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
      required: true,
      // NOTE: in order for position: 'sidebar' to work here,
      // the first field of this config must be of type `tabs`,
      // and this field must be a sibling of it
      // See `./Posts` or the `../../README.md` for more info
      admin: {
        position: 'sidebar',
      },
    },
    // colorPickerField({
    //   name: 'primaryColor',
    //   label: 'Primary Color',
    //   admin: {
    //     description: 'Pick a color for this page',
    //   },
    //   colors: ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff', '#ff00ff'],
    // }),
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
    //     position: 'sidebar',
    //     description: 'Pick a secondary color for this page',
    //     rtl: true,
    //   },
    // }),
  ],
}

export default Pages
