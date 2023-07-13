import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Error from 'payload/dist/admin/components/forms/Error'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'
import Label from 'payload/dist/admin/components/forms/Label'
import useField from 'payload/dist/admin/components/forms/useField'
import withCondition from 'payload/dist/admin/components/forms/withCondition'
import { date as dateValidation } from 'payload/dist/fields/validations'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

import { ColorPickerField } from '../../elements/ColorPickerComponent'
import { Props } from './types'

import './index.scss'

const baseClass = 'date-time-field'

const DateTime: React.FC<Props> = props => {
  const {
    path: pathFromProps,
    name,
    required,
    validate = dateValidation,
    label,
    admin: {
      placeholder,
      readOnly,
      style,
      className,
      width,
      description,
      condition,
      position,
    } = {},
  } = props

  const { i18n } = useTranslation()

  const path = pathFromProps || name

  const memoizedValidate = useCallback(
    (value: any, options: any): any => {
      return validate(value, { ...options, required })
    },
    [validate, required],
  )

  const { value, showError, errorMessage, setValue } = useField({
    path,
    validate: memoizedValidate,
    condition,
  })

  const classes = [
    'field-type',
    baseClass,
    className,
    showError && `${baseClass}--has-error`,
    readOnly && 'read-only',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <div className={`${baseClass}__error-wrap`}>
        <Error showError={showError} message={errorMessage || ''} />
      </div>
      <Label htmlFor={path} label={label} required={required} />
      <div id={`field-${path.replace(/\./gi, '__')}`} className={`${baseClass}__input-wrapper`}>
        <ColorPickerField
          placeholder={getTranslation(placeholder || '', i18n)}
          readOnly={readOnly}
          onChange={(incomingString: string | null) => {
            if (!readOnly) setValue(incomingString || null)
          }}
          hasError={showError}
          value={value as string}
          position={position}
        />
      </div>
      <FieldDescription value={value} description={description} />
    </div>
  )
}

export default withCondition(DateTime)
