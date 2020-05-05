/*
 * @Description: 
 * @Author: Chen Wang
 * @Email: mr_cwang@foxmail.com
 * @Date: 2020-05-05 21:53:06
 * @LastEditors: Chen Wang
 * @LastEditTime: 2020-05-05 22:29:37
 */

const fs = require('fs');
const code_input = document.getElementById('code');
const output = document.getElementById('draw');

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

update();