#!/usr/bin/env node

const path = require('path');
const sharp = require('sharp');
const input = path.join(__dirname, 'icon.svg');
const output = path.join(__dirname, 'icon@240x240.png');


function run() {
  sharp(input)
    .resize(240, 240, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toFile(output)
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err)
    })
}

run();
