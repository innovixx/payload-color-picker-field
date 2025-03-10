'use client'
import type { ChangeEvent } from 'react'

import { getTranslation } from '@payloadcms/translations'
import { Button, fieldBaseClass, FieldDescription, FieldError, FieldLabel, RenderCustomComponent, useTranslation } from '@payloadcms/ui'
import React, { useState, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'

import type { ColorPickerInputProps } from './types.js'

import './index.scss'

const baseClass = 'color'

export const ColorPickerInput: React.FC<ColorPickerInputProps> = (props) => {
  const {
    AfterInput,
    BeforeInput,
    className,
    colors,
    Description,
    description,
    Error,
    inputRef,
    Label,
    label,
    localized,
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
  } = props

  const [fieldIsFocused, setFieldIsFocused] = useState(false)
  const lastValueRef = useRef(value)

  const { i18n, t } = useTranslation()

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value.startsWith('#')) {
      evt.target.value = `#${evt.target.value}`
    }

    evt.target.value = evt.target.value.replace(/[^a-f0-9#]/gi, '').slice(0, 7)

    if (lastValueRef.current !== evt.target.value) {
      lastValueRef.current = evt.target.value
      onChange?.(evt as any)
    }
  }

  return (
    <div
      className={[
        fieldBaseClass,
        'color',
        className,
        showError && 'error',
        readOnly && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={
          <FieldLabel label={label} localized={localized} path={path} required={required} />
        }
      />
      <div className={`${fieldBaseClass}__wrap`}>
        <RenderCustomComponent
          CustomComponent={Error}
          Fallback={<FieldError path={path} showError={showError} />}
        />
        {BeforeInput}
        <div
          className={`${baseClass}__input-container`}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setFieldIsFocused(false)
            }
          }}
          onFocus={() => setFieldIsFocused(true)}
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
                    className={`${baseClass}__color-picker-modal__button`}
                    key={index}
                    onClick={() => {
                      if (color !== value) {
                        onChange?.({
                          target: {
                            name: path,
                            value: color,
                          },
                        } as any)
                      }
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
                if (v !== value) {
                  onChange?.({
                    target: {
                      name: path,
                      value: v,
                    },
                  } as any)
                }
              }}
            />
          </div>
        </div>
        {AfterInput}
        <RenderCustomComponent
          CustomComponent={Description}
          Fallback={<FieldDescription description={description} path={path} />}
        />
      </div>
    </div>
  )
}