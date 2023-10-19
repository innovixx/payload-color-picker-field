import type { Field, TextField } from 'payload/dist/fields/config/types'

import TextInput from './components/ColorPicker'

export const colorPickerField = (options?: Partial<TextField>): Field => {
  return {
    ...options,
    name: options?.name || 'colorPicker',
    label: options?.label || 'Color Picker',
    type: 'text',
    admin: {
      ...options?.admin,
      components: {
        ...options?.admin?.components,
        Field: args => TextInput({ ...args }),
      },
    },
  }
}
