const assert = require("assert");
const electron = require("electron");
const kill = require("tree-kill");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");

let pid;

const run = async () => {
  const port = 9200; // Debugging port
  const startTime = Date.now();
  const timeout = 10000; // Timeout in miliseconds
  let browser;

  pid = spawn(electron, [".", `--remote-debugging-port=${port}`], {
    shell: true
  }).pid;

  while (!browser) {
    try {
      browser = await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 1000, height: 600 }
      });
    } catch (error) {
      if (Date.now() > startTime + timeout) {
        throw error;
      }
    }
  }

  const [page] = await browser.pages();
  await page.waitForSelector("#demo");
  const text = await page.$eval("#demo", element => element.innerText);
  assert(text === "Demo of Electron + Puppeteer + Jest.");
  await page.close();
};

run()
  .then(() => {
    console.log("Test passed");
  })
  .catch(error => {
    console.log(`Test failed. Error: ${error.message}`);
    kill(pid, () => {
      process.exit(1);
    });
  });
