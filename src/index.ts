import { app, BrowserWindow, Menu } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
  });

  Menu.setApplicationMenu(null);

  win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
  createWindow();
});
