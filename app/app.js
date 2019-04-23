const { app, BrowserWindow } = require("electron"); // eslint-disable-line

const path = require("path");
const url = require("url");

function appQuit() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}

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

  // Window listeners
  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    win = null;
    appQuit();
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
