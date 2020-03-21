const assert = require("assert");
const electron = require("electron");
const kill = require("tree-kill");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");

let spawnedProcess;

const run = async () => {
  const port = 9200; // Debugging port
  const startTime = Date.now();
  const timeout = 20000; // Timeout in miliseconds
  let app;

  // Start Electron with custom debugging port
  spawnedProcess = spawn(electron, [".", `--remote-debugging-port=${port}`], {
    shell: true
  });

  // Log errors of spawned process to console
  spawnedProcess.stderr.on("data", data => {
    console.error(`stderr: ${data}`);
  });

  // Wait for Puppeteer to connect
  while (!app) {
    try {
      app = await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 1000, height: 600 }
      });
    } catch (error) {
      if (Date.now() > startTime + timeout) {
        throw error;
      }
    }
  }

  const [page] = await app.pages();
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
    console.error(`Test failed. Error: ${error.message}`);
    kill(spawnedProcess.pid, () => {
      process.exit(1);
    });
  });
