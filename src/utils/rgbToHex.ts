export const rgbToHex = (r: number, g: number, b: number): string => {
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error('Invalid input values')
  }
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')
  return `#${hexR}${hexG}${hexB}`
}
