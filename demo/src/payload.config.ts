import path from 'path'
import { buildConfig } from 'payload/config'

import plugin from '../../src'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import Users from './collections/Users'
import HomePage from './globals/Settings'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  collections: [Users, Pages, Posts, Media],
  globals: [HomePage],
  localization: {
    locales: ['en', 'es', 'de'],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [plugin({})],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
