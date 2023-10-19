import React, { useCallback } from 'react'
import { isFieldRTL } from 'payload/dist/admin/components/forms/field-types/shared'
import useField from 'payload/dist/admin/components/forms/useField'
import withCondition from 'payload/dist/admin/components/forms/withCondition'
import { useConfig } from 'payload/dist/admin/components/utilities/Config'
import { useLocale } from 'payload/dist/admin/components/utilities/Locale'
import { text } from 'payload/dist/fields/validations'

import ColorInput from './input'
import type { Props } from './types'

const Color: React.FC<Props> = props => {
  const {
    name,
    admin: { className, condition, description, placeholder, readOnly, rtl, style, width } = {},
    inputRef,
    label,
    localized,
    maxLength,
    minLength,
    path: pathFromProps,
    required,
    validate = text,
  } = props

  const path = pathFromProps || name
  const locale = useLocale()

  const { localization } = useConfig()
  const isRTL = isFieldRTL({
    fieldLocalized: localized as boolean,
    fieldRTL: rtl as boolean,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate = useCallback(
    (value: unknown, options: any) => {
      return validate(value, { ...options, maxLength, minLength, required })
    },
    [validate, minLength, maxLength, required],
  )

  const { errorMessage, setValue, showError, value } = useField<string>({
    condition,
    path,
    validate: memoizedValidate,
  })

  return (
    <ColorInput
      className={className}
      description={description}
      errorMessage={errorMessage}
      inputRef={inputRef}
      label={label}
      name={name}
      onChange={e => {
        setValue(e.target.value)
      }}
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={isRTL}
      showError={showError}
      style={style}
      value={value}
      width={width}
    />
  )
}

export default withCondition(Color)
