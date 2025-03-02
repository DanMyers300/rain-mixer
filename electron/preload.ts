import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Your custom APIs here
});
