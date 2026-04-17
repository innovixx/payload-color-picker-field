'use client'

import type { Validate, ValidateOptions } from 'payload'

import { useConfig, useField, useLocale, withCondition } from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import './index.scss'

import type { ColorPickerFieldClientComponent } from './types.js'

import { isFieldRTL } from '../../utils/isFIeldRTL.js'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles.js'
import { ColorPickerInput } from './Input.js'

const ColorPickerField: ColorPickerFieldClientComponent = (props) => {
  const {
    colors,
    field,
    field: {
      admin: { className, description, placeholder, rtl = false } = {},
      label,
      localized = false,
      maxLength,
      minLength,
      required,
    },
    inputRef,
    path,
    readOnly,
    validate,
  } = props

  const locale = useLocale();

  const { config: { localization } = { localization: undefined } } = useConfig() || {};

  const memoizedValidate: Validate = useCallback(
    (
      value: null | string | undefined,
      options: ValidateOptions<any, any, any, string>
    ): Promise<string | true> | string | true => {
      if (typeof validate === 'function') {
        return validate(value, {
          ...options,
          maxLength,
          minLength,
          required,
        })
      }
      return true
    },
    [validate, minLength, maxLength, required],
  )

  const fieldContext = useField({
    path,
    validate: memoizedValidate,
  });

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = fieldContext ?? {
    customComponents: {},
    setValue: () => { },
    showError: false,
    value: '',
  };

  const renderRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  return (
    <ColorPickerInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      colors={colors}
      Description={Description}
      description={description}
      Error={Error}
      inputRef={inputRef}
      Label={Label}
      label={label}
      localized={localized}
      onChange={(e) => {
        if (e.target.value !== value) {
          setValue(e.target.value);
        }
      }}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={renderRTL}
      showError={showError}
      style={styles}
      value={(value as string) || ''}
    />
  )
}

export const ColorPickerFieldComponent = withCondition(ColorPickerField) as typeof ColorPickerField;
