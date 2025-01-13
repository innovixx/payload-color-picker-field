import type { Field, TextField } from "payload"

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