import type { Field, FieldBase } from 'payload/dist/fields/config/types'

import ColorPicker from '../../components/formFields/ColorPicker'

export const colorPickerField = ({
  name,
  label,
  admin,
  hooks,
  ...rest
}: Omit<FieldBase, 'name'> & {
  name?: string
}): Field => {
  return {
    name: name || 'colorPicker',
    label: label || 'Color Picker',
    type: 'text',
    ...rest,
    admin: {
      ...admin,
      components: {
        ...admin?.components,
        Field: args => ColorPicker({ ...args }),
      },
    },
  }
}
