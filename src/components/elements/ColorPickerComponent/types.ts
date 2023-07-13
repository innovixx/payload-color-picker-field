export interface Props {
  value?: string
  onChange: (val: string | null) => void
  readOnly?: boolean
  placeholder?: string
  hasError?: boolean
  position?: string
}
