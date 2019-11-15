const { app, BrowserWindow } = require("electron"); // eslint-disable-line

const path = require("path");
const url = require("url");
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    app.quit();
  });
}

app.on("ready", () => {
  createWindow();
});
