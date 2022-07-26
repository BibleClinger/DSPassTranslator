const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 700, height: 250, autoHideMenuBar:true, backgroundColor: '#000000', show: false, webPreferences: { nodeIntegration: true, contextIsolation: false }})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   win.on('ready-to-show', showWindow);
}

function showWindow() {
      win.show();
      win.focus();
  }

app.on('ready', createWindow);
