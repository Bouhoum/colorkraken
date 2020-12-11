// Beta version of the project
const colorkraken = require('../../../colorkraken-config.js' );

// Convert Hex To Rgb

function hexToRgb(h) {
  let r = 0,
    g = 0,
    b = 0,
    rgb = []

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1]
    g = "0x" + h[2] + h[2]
    b = "0x" + h[3] + h[3]

    // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2]
    g = "0x" + h[3] + h[4]
    b = "0x" + h[5] + h[6]
  }
  rgb.push(+r, +g, +b)
  return rgb
}

// Rgb To HSL

function rgbToHsl(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255
  g /= 255
  b /= 255

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0,
    hsl = []
  // Calculate hue
  // No difference
  if (delta === 0) h = 0
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2
  // Blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0) h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = +(s * 100).toFixed(0)
  l = +(l * 100).toFixed(0)

  hsl.push(+h, +s, +l);
  return hsl
}

// Add export default before function mainColor

function mainColor(h, s, l, name) {
 
  let $100 = "hsl(" + h + "," + s + "%," + (l + 40) + "%)"
  let $200 = "hsl(" + h + "," + s + "%," + (l + 30) + "%)"
  let $300 = "hsl(" + h + "," + s + "%," + (l + 20) + "%)"
  let $400 = "hsl(" + h + "," + s + "%," + (l + 10) + "%)"
  let $500 = "hsl(" + h + "," + s + "%," + l + "%)"
  let $600 = "hsl(" + h + "," + s + "%," + (l - 10) + "%)"
  let $700 = "hsl(" + h + "," + s + "%," + (l - 20) + "%)"
  let $800 = "hsl(" + h + "," + s + "%," + (l - 30) + "%)"
  let $900 = "hsl(" + h + "," + s + "%," + (l - 40) + "%)"
  
  let colors = { [`${name}`]: {
    100 : $100,
    200 : $200,
    300 : $300,
    400 : $400,
    500 : $500,
    600 : $600,
    700 : $700,
    800 : $800,
    900 : $900,
  }
  }
  return colors
}

let classNames = colorkraken.arguments;

let colors = classNames.map(function(className) {
  let rgb = hexToRgb(className.value);

let r = rgb[0];
let g = rgb[1];
let b = rgb[2];

let hsl = rgbToHsl(r, g, b);

let h = hsl[0];
let s = hsl[1];
let l = hsl[2];

let color = mainColor(h, s, l, className.name);

let colors = color;

return colors;

})


module.exports = colors;