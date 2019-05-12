const assert = require("assert");
const electron = require("electron");
const path = require("path");
const puppeteer = require("puppeteer-core");

let app;
let page;

const run = async () => {
  app = await puppeteer.launch({
    executablePath: electron,
    args: ["."],
    headless: false
  });
  const pages = await app.pages();
  [page] = pages;
  await page.setViewport({ width: 1000, height: 600 });

  await page.waitForSelector("#demo");
  const text = await page.$eval("#demo", e => e.innerText);

  try {
    assert(text === "Demo of Electron + Puppeteer + Jest.");
    console.log("Assertion successful");
  } catch (error) {
    console.error(error.message);
  }

  app.close();
};

run();
