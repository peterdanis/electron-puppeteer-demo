const electron = require("electron");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");

const timeout = 5000; // Timeout in miliseconds

let page;

jest.setTimeout(timeout);

beforeAll(async () => {
  const startTime = Date.now();
  let browser;

  spawn(electron, [".", "--remote-debugging-port=9200"], {
    shell: true
  });

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

  [page] = await browser.pages();
});

afterAll(async () => {
  await page.close();
});

describe("App", () => {
  test("Text ok", async () => {
    await page.waitForSelector("#demo");
    const text = await page.$eval("#demo", e => e.innerText);
    expect(text).toBe("Demo of Electron + Puppeteer + Jest.");
  });
});
