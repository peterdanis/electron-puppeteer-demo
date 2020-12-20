# Electron + Puppeteer (+ Jest optionally)

Simple repo to showcase how to use Puppeteer for end-to-end testing of Electron application. For further information see Puppeteer API docs here: https://github.com/puppeteer/puppeteer/blob/master/docs/api.md

For Electron using `puppeteer-core` package is recommended instead of standard `puppeteer` package, as the `-core` version does not download Chromium by default.

To connect Electron and Puppeteer together you have to start Electron app yourself (via `child_process.spawn`)...

```Javascript
const electron = require("electron");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const port = 9200;

spawn(electron, [".", `--remote-debugging-port=${port}`], { shell: true });
```

...and then connect to it via `puppeteer.connect` method

```Javascript
(async () => {
  await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 1000, height: 600 }
      });
})()
```

For full example please see https://github.com/peterdanis/electron-puppeteer-demo/blob/master/tests/simpleNodeTest.js

## Test status

[![Github Actions badge](https://github.com/peterdanis/electron-puppeteer-demo/workflows/Tests/badge.svg?event=push)](https://github.com/peterdanis/electron-puppeteer-demo/actions?query=workflow%3ATests+event%3Apush)

Currently the tests are being run for Electron versions from 5 to 12 (beta) on Linux, MacOS and Windows. [Go to test results](https://github.com/peterdanis/electron-puppeteer-demo/actions?query=workflow%3ATests+event%3Apush)

## How to use

- clone repo and "cd" into it
- run `npm i` or `yarn`
- run `npm run test-no-jest` to run test without Jest

or

- run `npm run test` or `yarn test` to run test with Jest
