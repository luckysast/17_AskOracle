#!/bin/sh
npm run dev &
cd application && npm install --quite && HOST=0.0.0.0 npm run dev &
tail -f /dev/null
