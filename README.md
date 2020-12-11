# Color Kraken (Beta)

Color Kraken is an hsl tailwind integration that generates custom color shades from a given hexcolor

Dark mode support is coming soon

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install ColorKraken.

```bash
npm install colorkraken --save-dev
```
## Usage

After installing your package, create ```colorkraken-config.js``` in your root dir and add as many classnames and colors as you want.

```javascript
module.exports = {
    arguments: [
      { name: "primary", value: "#604181" },
      { name: "secondary", value: "#F89630" },
    ],
  }
  ```
In your ```tailwind.config.js``` add 
```javascript
const Colorkraken = require ('colorkraken');
```
And assign tailwind variables to Color Kraken ones

```javascript
module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: Colorkraken,
      textColors: Colorkraken,
      backgroundColors: Colorkraken,
    },
   ...
}
```

Then run 

```bash
npm run build:css
```

## List of available sub class

Color Kraken returns an object that contains all your classnames and colors converted to hsl

```javascript
{
  primary: {
    '100': 'hsl(269,33%,78%)',
    '200': 'hsl(269,33%,68%)',
    '300': 'hsl(269,33%,58%)',
    '400': 'hsl(269,33%,48%)',
    '500': 'hsl(269,33%,38%)',
    '600': 'hsl(269,33%,28%)',
    '700': 'hsl(269,33%,18%)',
    '800': 'hsl(269,33%,8%)',
    '900': 'hsl(269,33%,-2%)'
  },
  secondary: {
    '100': 'hsl(31,93%,98%)',
    '200': 'hsl(31,93%,88%)',
    '300': 'hsl(31,93%,78%)',
    '400': 'hsl(31,93%,68%)',
    '500': 'hsl(31,93%,58%)',
    '600': 'hsl(31,93%,48%)',
    '700': 'hsl(31,93%,38%)',
    '800': 'hsl(31,93%,28%)',
    '900': 'hsl(31,93%,18%)'
  }
}
```
To access your new custom color using tailwind ```text-primary-500 active:text-primary-700 hover:text-primary-300 ``` 
⚠️By default, the active variant is not enabled for any core plugins⚠️ 

## License
[MIT](https://choosealicense.com/licenses/mit/)