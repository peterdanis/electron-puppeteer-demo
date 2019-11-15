const assert = require("assert");
const electron = require("electron");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");

const run = async () => {
  const startTime = Date.now();
  const timeout = 5000; // Timeout in miliseconds
  let browser;

  spawn(electron, [".", "--remote-debugging-port=9200"], { shell: true });

  while (!browser) {
    try {
      browser = await puppeteer.connect({
        browserURL: "http://localhost:9200",
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

  const text = await page.$eval("#demo", e => e.innerText);

  try {
    assert(text === "Demo of Electron + Puppeteer + Jest.");
    console.log("Assertion successful");
  } catch (error) {
    console.error(error.message);
  }

  await page.close();
};

run();
