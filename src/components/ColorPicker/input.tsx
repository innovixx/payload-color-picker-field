import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'
import Button from 'payload/dist/admin/components/elements/Button'
import Error from 'payload/dist/admin/components/forms/Error'
import { fieldBaseClass } from 'payload/dist/admin/components/forms/field-types/shared'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'
import { Description } from 'payload/dist/admin/components/forms/FieldDescription/types'
import Label from 'payload/dist/admin/components/forms/Label'
import type { TextField } from 'payload/dist/fields/config/types'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

import './index.scss'

const baseClass = 'color'

export type ColorInputProps = Omit<TextField, 'type'> & {
  className?: string
  description?: Description
  errorMessage?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path: string
  placeholder?: Record<string, string> | string
  readOnly?: boolean
  required?: boolean
  rtl?: boolean
  showError?: boolean
  style?: React.CSSProperties
  value?: string
  width?: string
  colors?: string[]
}

const ColorInput: React.FC<ColorInputProps> = props => {
  const {
    className,
    description,
    errorMessage,
    inputRef,
    label,
    onChange,
    onKeyDown,
    path,
    placeholder,
    readOnly,
    required,
    rtl,
    showError,
    style,
    value,
    width,
    colors,
  } = props

  const [fieldIsFocused, setFieldIsFocused] = useState(false)

  const { i18n } = useTranslation()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value.startsWith('#')) {
      evt.target.value = `#${evt.target.value}`
    }

    evt.target.value = evt.target.value.replace(/[^a-fA-F0-9#]/g, '').slice(0, 7)

    onChange?.(evt)
  }

  return (
    <div
      className={[
        fieldBaseClass,
        baseClass,
        className,
        showError && 'error',
        readOnly && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <Error message={errorMessage || ''} showError={showError} />
      <Label htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <div
        className={`${baseClass}__input-container`}
        onFocus={() => setFieldIsFocused(true)}
        onBlur={e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setFieldIsFocused(false)
          }
        }}
      >
        {!rtl && (
          <div
            className={`${baseClass}__color-preview`}
            style={{
              background: value?.length && value?.length > 1 ? value : '#fff',
            }}
          />
        )}
        <input
          data-rtl={rtl}
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={getTranslation(placeholder as string, i18n)}
          ref={inputRef}
          type="text"
          value={value || ''}
        />
        {rtl && (
          <div
            className={`${baseClass}__color-preview`}
            style={{
              background: value?.length && value?.length > 1 ? value : '#fff',
            }}
          />
        )}
        <div
          className={`
            ${baseClass}__color-picker-modal 
            ${rtl ? `${baseClass}__color-picker-modal--rtl` : ''}
            ${fieldIsFocused ? `${baseClass}__color-picker-modal--focused` : ''}
          `}
        >
          {colors && (
            <div className={`${baseClass}__color-picker-modal__predefined-colors`}>
              {colors.map((color, index) => (
                <Button
                  buttonStyle="none"
                  key={index}
                  className={`${baseClass}__color-picker-modal__button`}
                  onClick={() => {
                    onChange?.({
                      target: {
                        name: path,
                        value: color,
                      },
                    } as ChangeEvent<HTMLInputElement>)
                  }}
                >
                  <span
                    className={`${baseClass}__color-picker-modal__button__color`}
                    style={{
                      background: color,
                    }}
                  />
                </Button>
              ))}
            </div>
          )}
          <HexColorPicker
            color={value || ''}
            onChange={v => {
              onChange?.({
                target: {
                  name: path,
                  value: v,
                },
              } as ChangeEvent<HTMLInputElement>)
            }}
          />
        </div>
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={description}
        value={value || ''}
      />
    </div>
  )
}

export default ColorInput
