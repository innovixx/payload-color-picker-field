export const hexToRgb = (
  hex: string,
): {
  r: number
  g: number
  b: number
} => {
  if (hex === '') {
    return {
      r: 0,
      g: 0,
      b: 0,
    }
  }

  const hexCode = hex.replace('#', '')
  const r = parseInt(hexCode.substring(0, 2), 16)
  const g = parseInt(hexCode.substring(2, 4), 16)
  const b = parseInt(hexCode.substring(4, 6), 16)
  return {
    r,
    g,
    b,
  }
}
