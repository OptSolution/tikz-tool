/*
 * @Description: 
 * @Author: Chen Wang
 * @Email: mr_cwang@foxmail.com
 * @Date: 2020-05-05 19:49:38
 * @LastEditors: Chen Wang
 * @LastEditTime: 2020-05-06 00:38:40
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu} = require('electron')

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Add mune
    const mainMenuTemplate = [
        {
            label: "Tikz-tool",
            submenu: [
                {
                    label: "Reload",
                    accelerator: "CmdOrCtrl+R",
                    role: "reload"
                },
                {
                    label: "Quit",
                    accelerator: "CmdOrCtrl+Q",
                    role: "quit"
                }
            ]
        },
        {
            label: "File",
            submenu: [
                {
                    label: "Save as PNG",
                    click() {
                        mainWindow.webContents.send('action', 'savePNG');
                    }
                },
                {
                    label: "Save as SVG",
                    click() {
                        mainWindow.webContents.send('action', 'saveSVG');
                    }
                }
            ]
        // },
        // {
        //     label: "Help",
        //     submenu: [
        //         {
        //             label: 'Devtool',
        //             accelerator: 'CmdOrCtrl+D',
        //             click() {
        //                 mainWindow.webContents.openDevTools();
        //             }
        //         }
        //     ]
        }
    ];
    const menu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
