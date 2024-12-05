import type { FieldClientComponent, StaticDescription, StaticLabel, TextFieldClient, TextFieldValidation } from 'payload'
import type { ChangeEvent } from 'react'
import type React from 'react'
import type { MarkOptional } from 'ts-essentials';

export type SharedColorPickerFieldProps =
  | {
    readonly hasMany?: false
    readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  }

export type ColorPickerInputProps = {
  readonly AfterInput?: React.ReactNode
  readonly BeforeInput?: React.ReactNode
  readonly className?: string
  readonly colors?: string[]
  readonly Description?: React.ReactNode
  readonly description?: StaticDescription
  readonly Error?: React.ReactNode
  readonly inputRef?: React.RefObject<HTMLInputElement>
  readonly Label?: React.ReactNode
  readonly label?: StaticLabel
  readonly localized?: boolean
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  readonly path: string
  readonly placeholder?: Record<string, string> | string
  readonly readOnly?: boolean
  readonly required?: boolean
  readonly rtl?: boolean
  readonly showError?: boolean
  readonly style?: React.CSSProperties
  readonly value?: string
} & SharedColorPickerFieldProps

type ColorPickerFieldClientWithoutType = MarkOptional<TextFieldClient, 'type'>;
type ColorPickerFieldBaseClientProps = {
  readonly colors?: string[];
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  readonly path: string;
  readonly validate?: TextFieldValidation;
};
export type ColorPickerFieldClientComponent = FieldClientComponent<ColorPickerFieldClientWithoutType, ColorPickerFieldBaseClientProps>;