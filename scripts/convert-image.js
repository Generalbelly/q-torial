#!/usr/bin/env node

const path = require('path');
const sharp = require('sharp');
const input = path.join(__dirname, 'q-torial.svg');
const output = path.join(__dirname, '../public/img/q-torial@1200x630.png');


function run() {
  sharp(input)
    .resize(1200, 630, {
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
