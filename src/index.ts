import type { Field, Plugin, TextField } from "payload"

import deepmerge from 'deepmerge'

import type { PluginConfig } from './types'

export const colorPickerPlugin = (pluginConfig?: PluginConfig): Plugin => (config) => {

  config.admin = {
    ...config.admin,
    dependencies: {
      ...config.admin?.dependencies,
      'ColorPickerFieldComponent': {
        type: 'component',
        path: '@innovixx/payload-color-picker-field',
      },
    }
  }

  return deepmerge(config, pluginConfig?.overwrites || {})
}

export const colorPickerField = (
  options?: {
    colors?: string[]
  } & Partial<TextField>,
): Field => {
  const { colors, ...rest } = options || {}

  return {
    ...rest,
    name: rest?.name || 'colorPicker',
    type: 'text',
    admin: {
      ...rest?.admin,
      components: {
        ...rest?.admin?.components,
        Field: {
          clientProps: {
            colors
          },
          path: '@innovixx/payload-color-picker-field/components#ColorPickerFieldComponent',
        },
      },
    },
    label: rest?.label || 'Color Picker',
  } as TextField
}