import React from 'react'
import { HexColorPicker } from 'react-colorful'
import Label from 'payload/dist/admin/components/forms/Label'

import { hexToRgb } from '../../../utils/hexToRgb'
import { rgbToHex } from '../../../utils/rgbToHex'
import { Props } from './types'

import './index.scss'

const baseClass = 'color-picker'

const ColorPicker: React.FC<Props> = props => {
  const { value, onChange, hasError, position } = props
  const [rgb, setRgb] = React.useState(hexToRgb(value || ''))

  const classes = [baseClass, hasError && `${baseClass}--has-error`].filter(Boolean).join(' ')

  const onRgbChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    const parsedValue = parseInt(value, 10)

    if (value.length > 3) {
      evt.target.value = value.slice(0, 3)
    }

    if (value.length === 2 && value[0] === '0' && value[1] === '0') {
      evt.target.value = '0'
    }

    setRgb({
      ...rgb,
      [name]: parsedValue > 255 ? 255 : parsedValue < 0 ? 0 : parsedValue,
    })
    onChange(rgbToHex(rgb.r || 0, rgb.g || 0, rgb.b || 0))
  }

  return (
    <div className={classes}>
      <div className={`${baseClass}__input-container`}>
        <div className={`${baseClass}__input input`}>
          <HexColorPicker
            color={value}
            onChange={v => {
              const { r, g, b } = hexToRgb(v)
              setRgb({
                r,
                g,
                b,
              })
              onChange(v)
            }}
          />
        </div>
        {position !== 'sidebar' && (
          <>
            <div className={`${baseClass}__input-options`}>
              <div className={`${baseClass}__input-option`}>
                <Label label="R:" />
                <input
                  name="r"
                  value={rgb.r || 0}
                  type="number"
                  min={0}
                  max={255}
                  onChange={onRgbChange}
                />
              </div>
              <div className={`${baseClass}__input-option`}>
                <Label label="G:" />
                <input
                  name="g"
                  value={rgb.g || 0}
                  type="number"
                  min={0}
                  max={255}
                  onChange={onRgbChange}
                />
              </div>
              <div className={`${baseClass}__input-option`}>
                <Label label="B:" />
                <input
                  name="b"
                  value={rgb.b || 0}
                  type="number"
                  min={0}
                  max={255}
                  onChange={onRgbChange}
                />
              </div>
            </div>
            <div className={`${baseClass}__input-options`}>
              <div className={`${baseClass}__input-option`}>
                <Label label="Hex:" />
                <input
                  value={value || ''}
                  onChange={evt => {
                    if (!evt.target.value.startsWith('#')) {
                      evt.target.value = `#${evt.target.value}`
                    }

                    evt.target.value = evt.target.value.replace(/[^a-fA-F0-9#]/g, '').slice(0, 7)

                    const { r, g, b } = hexToRgb(evt.target.value)
                    setRgb({
                      r,
                      g,
                      b,
                    })

                    onChange(evt.target.value)
                  }}
                  type="text"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ColorPicker
