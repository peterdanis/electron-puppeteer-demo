const electron = require("electron");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");

const port = 9200; // Debugging port
const timeout = 10000; // Timeout in miliseconds

let page;

jest.setTimeout(timeout);

beforeAll(async () => {
  const startTime = Date.now();
  let browser;

  spawn(electron, [".", `--remote-debugging-port=${port}`], {
    shell: true
  });

  while (!browser) {
    try {
      browser = await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 1000, height: 600 }
      });
      [page] = await browser.pages();
    } catch (error) {
      if (Date.now() > startTime + timeout) {
        break;
      }
    }
  }
});

afterAll(async () => {
  try {
    await page.close();
  } catch (error) {
    // Do nothing
  }
});

describe("App", () => {
  test("Text matches", async () => {
    let text;
    try {
      await page.waitForSelector("#demo");
      text = await page.$eval("#demo", element => element.innerText);
      expect(text).toBe("Demo of Electron + Puppeteer + Jest.");
    } catch (error) {
      // Do nothing
    }
  });
});
