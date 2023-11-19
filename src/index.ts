import type { Field, TextField } from 'payload/dist/fields/config/types'

import TextInput from './components/ColorPicker'

export const colorPickerField = (
  options?: Partial<TextField> & {
    colors?: string[]
  },
): Field => {
  const { colors, ...rest } = options || {}

  return {
    ...rest,
    name: rest?.name || 'colorPicker',
    label: rest?.label || 'Color Picker',
    type: 'text',
    admin: {
      ...rest?.admin,
      components: {
        ...rest?.admin?.components,
        Field: args => TextInput({ ...args, colors }),
      },
    },
  }
}
