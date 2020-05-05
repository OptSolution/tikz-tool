/*
 * @Description: 
 * @Author: Chen Wang
 * @Email: mr_cwang@foxmail.com
 * @Date: 2020-05-05 21:53:06
 * @LastEditors: Chen Wang
 * @LastEditTime: 2020-05-06 00:38:30
 */
const { ipcRenderer, remote } = require('electron');

let pngFile = null;
let svgFile = null;

const fs = require('fs');
const output = document.getElementById('draw');

update();

//监听与主进程的通信
ipcRenderer.on('action', (event, arg) => {
  switch (arg) {
    case 'savePNG':
      savePNG();
      break;
    case 'saveSVG':
      saveSVG();
      break;
  }
});

function update() {
  const s = document.createElement('script');
  s.setAttribute('type', 'text/tikz');
  fs.readFile('./draw.tex', (err, data) => {
    if (err) throw err;

    s.textContent = data.toString();
  })
  output.innerHTML = '';
  output.appendChild(s);
}

function savePNG() {
  if (!pngFile) {
    remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      filters: [
        { name: "PNG Files", extensions: ['png'] },
        { name: 'All Files', extensions: ['*'] }]
    }).then(result => {
      if (!result.canceled) {
        pngFile = result.filePath;
        alert("Saved PNG file to " + pngFile);
      }
    }).catch(err => {
      console.log(err);
    });
  } else {
    alert("Saved PNG file to " + pngFile);
  }
}

function saveSVG() {
  if (!svgFile) {
    remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      filters: [
        { name: "SVG Files", extensions: ['svg'] },
        { name: 'All Files', extensions: ['*'] }]
    }).then(result => {
      if (!result.canceled) {
        svgFile = result.filePath;
        alert("Saved SVG file to " + svgFile);
      }
    }).catch(err => {
      console.log(err);
    });
  } else {
    alert("Saved SVG file to " + svgFile);
  }
}