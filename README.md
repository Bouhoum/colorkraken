# ColorKraken (Beta)

ColorKraken is a tailwind integration that generates custom color shades from a given hexcolor
From a designer to developers

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

Color Kraken returns an object that contains all your classnames and colors converted to rgba

```javascript
{
    primary: {
      '100': 'rgba(160, 141, 179, 1)',
      '200': 'rgba(144, 122, 167, 1)',
      '300': 'rgba(128, 103, 154, 1)',
      '400': 'rgba(112, 84, 142, 1)',
      '500': 'rgba(96, 65, 129, 1)',
      '600': 'rgba(86, 59, 116, 1)',
      '700': 'rgba(77, 52, 103, 1)',
      '800': 'rgba(67, 46, 90, 1)',
      '900': 'rgba(58, 39, 77, 1)'
    }
  },
  {
    secondary: {
      '100': 'rgba(251, 192, 131, 1)',
      '200': 'rgba(250, 182, 110, 1)',
      '300': 'rgba(249, 171, 89, 1)',
      '400': 'rgba(249, 161, 69, 1)',
      '500': 'rgba(248, 150, 48, 1)',
      '600': 'rgba(223, 135, 43, 1)',
      '700': 'rgba(198, 120, 38, 1)',
      '800': 'rgba(174, 105, 34, 1)',
      '900': 'rgba(149, 90, 29, 1)'
    }
  }
```
To access your new custom color using tailwind ```text-primary-500 active:text-primary-700 hover:text-primary-300 ``` 
⚠️By default, the active variant is not enabled for any core plugins⚠️ 

## License
[MIT](https://choosealicense.com/licenses/mit/)