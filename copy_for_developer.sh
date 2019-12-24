#!/bin/sh

rsync -av ./functions/ ../firebase/functions \
  --exclude lib \
  --exclude node_modules \
  --exclude src/models/stripe-customer.ts \
  --exclude src/index.ts \
  --exclude src/stripe.ts \
  --exclude package.json \
  --exclude .gitignore \
  --exclude yarn.lock \
  --exclude src/ga.ts
#  --exclude src/models/ga.ts \

mv ../firebase/functions/src/developer.ts ../firebase/functions/src/index.ts
