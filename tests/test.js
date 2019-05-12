const assert = require("assert");
const electron = require("electron");
const puppeteer = require("puppeteer-core");
const cp = require("child_process");

const run = async () => {
  cp.spawn(electron, [". --remote-debugging-port=9200"], {
    shell: true
  });

  const browser = await puppeteer.connect({
    browserURL: "http://localhost:9200",
    defaultViewport: { width: 1000, height: 600 }
  });
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
