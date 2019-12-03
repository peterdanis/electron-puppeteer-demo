# Demo of Electron + Puppeteer + Jest

Simple repo to showcase how to use Puppeteer for end-to-end testing of Electron application. For further information see Puppeteer API docs here: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md

## Test status
Currently the test are being run for Electron versions 5, 6, 7 and 8 (beta) on Linux, MacOS and Windows.

[![Github Actions badge](https://github.com/peterdanis/electron-puppeteer-demo/workflows/Tests/badge.svg?event=push)](https://github.com/peterdanis/electron-puppeteer-demo/actions)



[Go to test results](https://github.com/peterdanis/electron-puppeteer-demo/actions)



## How to use
- clone repo and "cd" into it
- run `npm i` or `yarn`
- run `npm run test` or `yarn test`

To test without Jest run `npm run test-no-jest`
