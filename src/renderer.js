/*
 * @Description: 
 * @Author: Chen Wang
 * @Email: mr_cwang@foxmail.com
 * @Date: 2020-05-05 21:53:06
 * @LastEditors: Chen Wang
 * @LastEditTime: 2020-05-06 14:07:42
 */
const { ipcRenderer, remote } = require('electron');
const fs = require('fs');
const { saveSvgAsPng, saveSvg } = require('save-svg-as-png');

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
  saveSvgAsPng(document.getElementsByTagName("svg")[0], 'tikz.png', { left: -72, top: -72 });
}

function saveSVG() {
  saveSvg(document.getElementsByTagName("svg")[0], 'tikz.svg', { left: -72, top: -72 })
};