# Payload Color Picker Field

[![NPM](https://img.shields.io/npm/v/@innovixx/payload-color-picker-field)](https://www.npmjs.com/package/@innovixx/payload-color-picker-field)

A field for [Payload](https://github.com/payloadcms/payload) The Payload Color Picker that enables an easy color selection field for your Payload projects..

Core features:

  - Add a color picker field to your Payload collections
  - Supports HEX and RGB color formats

## Installation

```bash
  yarn add @innovixx/payload-color-picker-field
  # OR
  npm i @innovixx/payload-color-picker-field
```

## Basic Usage

```js
import type { CollectionConfig } from 'payload/types'

import { colorPickerField } from '@innovixx/payload-color-picker-field'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    colorPickerField({
      name: 'primaryColor',
      label: 'Primary Color',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Choose a color for this page',
      },
    }),
  ],
}

export default Pages
```

## Development

To actively develop or debug this plugin you can either work directly within the demo directory of this repo, or link your own project.

1. #### Internal Demo

   This repo includes a fully working, self-seeding instance of Payload that installs the plugin directly from the source code. This is the easiest way to get started. To spin up this demo, follow these steps:

   1. First clone the repo
   1. Then, `cd YOUR_PLUGIN_REPO && yarn && cd demo && yarn && yarn cleanDev`
   1. Now open `http://localhost:3000/admin` in your browser
   1. Enter username `admin@innovixx.co.uk` and password `pa$$w0rd!`

   That's it! Changes made in `./src` will be reflected in your demo. Keep in mind that the demo database is automatically seeded on every startup, any changes you make to the data get destroyed each time you reboot the app.