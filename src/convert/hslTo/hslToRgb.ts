import { Hsl, Rgb } from '../../types'
import { validateHsl } from '../../utils/validateHsl'

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) {
    t += 1
  } else if (t > 1) {
    t -= 1
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t
  } else if (t < 1 / 2) {
    return q
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  }

  return p
}

function hslToRgb(hsl: Hsl): Rgb {
  validateHsl(hsl)

  let { h, s, l } = hsl

  h /= 360
  s /= 100
  l /= 100

  let r: number
  let g: number
  let b: number

  if (s === 0) {
    r = g = b = l 
  } else {

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)

  return { r, g, b }
}

export { hslToRgb }