// Preload scripts for Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  loadSubscriptions: () => ipcRenderer.invoke('load-subscriptions'),
  saveSubscriptions: (subscriptions) => ipcRenderer.invoke('save-subscriptions', subscriptions),
  exportCSV: (subscriptions) => ipcRenderer.invoke('export-csv', subscriptions),
  importCSV: () => ipcRenderer.invoke('import-csv')
});