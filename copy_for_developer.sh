#!/bin/sh

rsync -av ./functions/ ../q-torial-firebase/functions \
  --exclude lib \
  --exclude node_modules \
  --exclude src/models/stripe-customer.ts \
  --exclude src/index.ts \
  --exclude src/stripe.ts \
  --exclude package.json \
  --exclude .gitignore \
  --exclude yarn.lock

mv ../q-torial-firebase/functions/src/developer.ts ../q-torial-firebase/functions/src/index.ts
