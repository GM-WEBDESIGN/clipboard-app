const { app, BrowserWindow, Tray } = require("electron");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.hide();
  tray = new Tray("./icon/icon.png");

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  mainWindow.on("show", () => {
    // tray.setHighlightMode("always");
    const bounds = tray.getBounds();
    let y = 0;
    let x = bounds.x;
    if (process.platform !== "darwin") {
      const size = mainWindow.getSize();
      const windowWidth = size[0];
      const windowHeight = size[1];
      if (bounds.y === 0) y = bounds.height;
      else y = bounds.y - windowHeight;
    }
    mainWindow.setPosition(x, y);
  });

  mainWindow.on("hide", () => {
    // tray.setHighlightMode("never");
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("close", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
