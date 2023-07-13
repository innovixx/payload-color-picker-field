import type { TextField } from 'payload/dist/fields/config/types'

export type Props = Omit<TextField, 'type'> & {
  path: string
}
