import React, { lazy, Suspense } from 'react'
import { ShimmerEffect } from 'payload/dist/admin/components/elements/ShimmerEffect'

import { Props } from './types'

const ColorPicker = lazy(() => import('./ColorPicker'))

export const ColorPickerField: React.FC<Props> = props => (
  <Suspense fallback={<ShimmerEffect height={60} />}>
    <ColorPicker {...props} />
  </Suspense>
)
