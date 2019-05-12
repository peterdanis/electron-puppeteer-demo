const electron = require("electron");
const puppeteer = require("puppeteer-core");
const cp = require("child_process");

let page;

jest.setTimeout(50000);

beforeAll(async () => {
  cp.spawn(electron, [". --remote-debugging-port=9200"], {
    shell: true
  });

  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9200",
    defaultViewport: { width: 1000, height: 600 }
  });

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
