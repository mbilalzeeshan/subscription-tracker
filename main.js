const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// Keep a global reference of the window object
let mainWindow;

// Data file path for persistence
const getDataFilePath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'subscriptions.json');
};

// Load subscriptions from file
const loadSubscriptions = () => {
  const dataFile = getDataFilePath();
  if (fs.existsSync(dataFile)) {
    try {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      return getSampleData();
    }
  }
  return getSampleData();
};

// Save subscriptions to file
const saveSubscriptions = (subscriptions) => {
  try {
    const dataFile = getDataFilePath();
    fs.writeFileSync(dataFile, JSON.stringify(subscriptions, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving subscriptions:', error);
    return false;
  }
};

// Get sample data
const getSampleData = () => {
  return [
    {
      id: 1,
      name: 'Netflix',
      category: 'Streaming',
      price: 15.99,
      billingCycle: 'monthly',
      active: true,
      renewalDate: '2026-09-15'
    },
    {
      id: 2,
      name: 'Spotify',
      category: 'Streaming',
      price: 9.99,
      billingCycle: 'monthly',
      active: true,
      renewalDate: '2026-09-20'
    },
    {
      id: 3,
      name: 'Gym Membership',
      category: 'Health',
      price: 30.00,
      billingCycle: 'monthly',
      active: true,
      renewalDate: '2026-09-10'
    }
  ];
};

// IPC handlers for data operations
ipcMain.handle('load-subscriptions', () => {
  return loadSubscriptions();
});

ipcMain.handle('save-subscriptions', (event, subscriptions) => {
  return saveSubscriptions(subscriptions);
});

ipcMain.handle('export-csv', (event, subscriptions) => {
  const { dialog } = require('electron');
  return dialog.showSaveDialog(mainWindow, {
    defaultPath: 'subscriptions.csv',
    filters: [
      { name: 'CSV Files', extensions: ['csv'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePath) {
      const csvContent = [
        ['Name', 'Category', 'Price', 'Billing Cycle', 'Renewal Date', 'Active'].join(','),
        ...subscriptions.map(sub => [
          `"${sub.name.replace(/"/g, '""')}"`,
          sub.category,
          sub.price,
          sub.billingCycle,
          sub.renewalDate,
          sub.active ? 'true' : 'false'
        ].join(','))
      ].join('\n');

      fs.writeFileSync(result.filePath, csvContent);
      return { success: true, path: result.filePath };
    }
    return { success: false };
  });
});

ipcMain.handle('import-csv', (event) => {
  const { dialog } = require('electron');
  return dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'CSV Files', extensions: ['csv'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const lines = fileContent.split('\n').filter(line => line.trim() !== '');

      if (lines.length < 2) {
        return { success: false, error: 'Invalid CSV file' };
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const expectedHeaders = ['Name', 'Category', 'Price', 'Billing Cycle', 'Renewal Date', 'Active'];

      if (!headers.every((h, i) => h === expectedHeaders[i])) {
        return { success: false, error: 'CSV format is incorrect' };
      }

      const imported = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        return {
          id: Date.now() + Math.random(),
          name: values[0],
          category: values[1],
          price: parseFloat(values[2]),
          billingCycle: values[3],
          renewalDate: values[4],
          active: values[5] === 'true'
        };
      }).filter(sub => !isNaN(sub.price) && sub.name && sub.category);

      if (imported.length === 0) {
        return { success: false, error: 'No valid subscriptions found' };
      }

      saveSubscriptions(imported);
      return { success: true, count: imported.length };
    }
    return { success: false };
  });
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'build/icon.ico')
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools in development
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});