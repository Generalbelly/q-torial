#!/usr/bin/env node

const admin = require('firebase-admin');
const path = require('path');

const keyFilename = path.join(
  __dirname,
  `../${
    process.env.NODE_ENV === 'production'
      ? 'q-torial-firebase-adminsdk-ejl4w-29ec1987ad.json'
      : 'still-protocol-228301-firebase-adminsdk-i9ol4-8b98dccfe2.json'
  }`
);
admin.initializeApp({
  credential: admin.credential.cert(keyFilename),
});

async function main() {
  const allRulesets = [];
  let pageToken = undefined;
  while (true) {
    const result = await admin.securityRules().listRulesetMetadata(undefined, pageToken);
    allRulesets.push(...result.rulesets);
    pageToken = result.nextPageToken;
    if (!pageToken) {
      break;
    }
  }
  allRulesets.forEach((rs) => {
    console.log(rs);
  });
}

main();
