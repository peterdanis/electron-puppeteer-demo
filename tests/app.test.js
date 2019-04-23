const electron = require("electron");
const path = require("path");
const puppeteer = require("puppeteer-core");

let app;
let page;

jest.setTimeout(50000);

beforeAll(async () => {
  app = await puppeteer.launch({
    executablePath: electron,
    args: ["."],
    headless: false
  });
  const pages = await app.pages();
  [page] = pages;
  await page.setViewport({ width: 1000, height: 600 });
});

afterAll(async () => {
  app.close();
});

describe("App", () => {
  test("starts", async () => {
    await page.waitForSelector("#demo");
    const text = await page.$eval("#demo", e => e.innerText);
    expect(text).toBe("Demo of Electron + Puppeteer + Jest.");
  });
});
