#!/usr/bin/env node

const path = require('path');
const sharp = require('sharp');
const input = path.join(__dirname, '../public/img/q-torial.svg');
const output = path.join(__dirname, '../public/img/q-torial.png');


function run() {
  sharp(input)
    .resize(1200, 630, {
      fit: 'contain',
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
