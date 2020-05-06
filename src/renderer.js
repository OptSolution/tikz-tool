/*
 * @Description: 
 * @Author: Chen Wang
 * @Email: mr_cwang@foxmail.com
 * @Date: 2020-05-05 21:53:06
 * @LastEditors: Chen Wang
 * @LastEditTime: 2020-05-06 19:24:38
 */
const { ipcRenderer, remote } = require('electron');
const fs = require('fs');
const { saveSvgAsPng, saveSvg } = require('save-svg-as-png');

const windowMenuTemplate = [
  {
    label: 'Save as PNG',
    click: function () {
      savePNG();
    }
  },
  {
    label: 'Save as SVG',
    click: function () {
      saveSVG();
    }
  }
];
const windowMenu = remote.Menu.buildFromTemplate(windowMenuTemplate);
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  windowMenu.popup(remote.getCurrentWindow());
});

var output = document.getElementById('draw');
var texFile = null;

//监听与主进程的通信
ipcRenderer.on('action', (event, arg) => {
  switch (arg) {
    case 'savePNG':
      savePNG();
      break;
    case 'saveSVG':
      saveSVG();
      break;
    case 'openFile':
      openFile();
      break;
  }
});

function openFile() {
  remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
    filters: [
      { name: "Text Files", extensions: ['tex'] },
      { name: 'All Files', extensions: ['*'] }],
    properties: ['openFile']
  }).then(result => {
    if (!result.canceled) {
      texFile = result.filePaths[0].toString();
      update();
    }
  }).catch(err => {
    console.log(err);
  });
}

function update() {
  let texDOM = document.createElement('script');
  texDOM.setAttribute('type', 'text/tikz');
  fs.readFile(texFile, (err, data) => {
    if (err) throw err;
    texDOM.innerHTML = data.toString();
    output.innerHTML = '';
    output.appendChild(texDOM);
    process_tikz(texDOM);
  })
}

function savePNG() {
  saveSvgAsPng(document.getElementsByTagName("svg")[0], 'tikz.png', { left: -72, top: -72 });
}

function saveSVG() {
  saveSvg(document.getElementsByTagName("svg")[0], 'tikz.svg', { left: -72, top: -72 })
};