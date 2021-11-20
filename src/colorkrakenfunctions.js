const path = require("path");

const configFilePath = path.join(process.cwd(), "colorkraken-config.js");
const colorkraken = require(configFilePath);

hexToRgba = (hexColor, isHex) => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1,
    rgba = [];
  if (isHex) {
    if (hexColor.length === 4) {
      r = "0x" + hexColor[1] + hexColor[1];
      g = "0x" + hexColor[2] + hexColor[2];
      b = "0x" + hexColor[3] + hexColor[3];
    } else if (hexColor.length === 7) {
      r = "0x" + hexColor[1] + hexColor[2];
      g = "0x" + hexColor[3] + hexColor[4];
      b = "0x" + hexColor[5] + hexColor[6];
    }
    rgba.push(+r, +g, +b, +a);
  } else if (!isHex) {
    if (hexColor.length === 3) {
      r = "0x" + hexColor[0] + hexColor[0];
      g = "0x" + hexColor[1] + hexColor[1];
      b = "0x" + hexColor[2] + hexColor[2];
    } else if (hexColor.length === 6) {
      r = "0x" + hexColor[0] + hexColor[1];
      g = "0x" + hexColor[2] + hexColor[3];
      b = "0x" + hexColor[4] + hexColor[5];
    }
    rgba.push(+r, +g, +b, +a);
  }
  return rgba;
};

mixColors = (overlay, targetColor) => {
  var mix = [];
  mix[3] = 1 - (1 - overlay[3]) * (1 - targetColor[3]); // alpha
  mix[0] = Math.round(
    (overlay[0] * overlay[3]) / mix[3] +
      (targetColor[0] * targetColor[3] * (1 - overlay[3])) / mix[3]
  ); // red
  mix[1] = Math.round(
    (overlay[1] * overlay[3]) / mix[3] +
      (targetColor[1] * targetColor[3] * (1 - overlay[3])) / mix[3]
  ); // green
  mix[2] = Math.round(
    (overlay[2] * overlay[3]) / mix[3] +
      (targetColor[2] * targetColor[3] * (1 - overlay[3])) / mix[3]
  ); // blue
  return mix;
};

prepareOverlays = (targetColor, name) => {
  var preparedOverlays = [];
  for (let i = 0; i < 10; i++) {
    const whiteOverlay = [255, 255, 255];
    const blackOverlay = [0, 0, 0];
    let newOverlay;
    let preparedOverlay = {};
    if (i == 0) {
      newOverlay = targetColor;
      name = `${(i + 1) * 500}`;
    } else if (i > 0 && i < 5) {
      whiteOverlay[3] = i / 10;
      newOverlay = whiteOverlay;
      name = `${900 - (i * 100 + 400)}`;
    } else if (i > 0 && i > 5) {
      blackOverlay[3] = (i - 5) / 10;
      newOverlay = blackOverlay;
      name = `${i * 100}`;
    }
    if (i != 5) {
      preparedOverlay = {
        name: name,
        overlay: newOverlay,
      };
      preparedOverlays.push(preparedOverlay);
    }
  }
  return preparedOverlays;
};

checkInput = (input, name) => {
  const hex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  const notHex = new RegExp("^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  let results;

  if (hex.test(input)) {
    results = results = {
      valid: true,
      isHex: true,
    };
  } else if (notHex.test(input)) {
    results = {
      valid: true,
      isHex: false,
    };
  } else {
    results = {
      message: `❌ ${name}: ${input} is not valid`,
      valid: false,
    };
    // console.log(results);
  }
  return results;
};

let userInputs = colorkraken.arguments;
let colors = userInputs.map((userInput) => {
  // checkInput and call convertor,
  const inputValidator = checkInput(userInput.value, userInput.name);

  if (inputValidator.valid) {
    let targetColor = hexToRgba(userInput.value, inputValidator.isHex);
    // take converted color and prepare overlays
    const newOverlays = prepareOverlays(targetColor, userInput.name);
    let className = userInput.name;
    // mix the colors with overlays using overlays as loop
    const colorsArray = newOverlays.map((overlayss) => {
      let mixedColors = {};
      const mixed = mixColors(overlayss.overlay, targetColor);
      let classNumber = overlayss.name;
      mixedColors = {
        [`${classNumber}`]: `rgba(${mixed[0]}, ${mixed[1]}, ${mixed[2]}, ${mixed[3]})`,
      };
      return mixedColors;
    });
    // turn array to obj
    let colorsObj = colorsArray.reduce(
      (acc, elem) => ({ ...acc, ...elem }),
      {}
    );
    // store colors with their classNames
    let finalOutPut = {
      [`${className}`]: colorsObj,
    };
    console.log("ColorKraken - ✅", userInput.name, "added successfuly");
    return finalOutPut;
  } else if (!inputValidator.valid) {
    console.log("ColorKraken -", inputValidator.message);
    return inputValidator.message;
  }
});

module.exports = colors;
