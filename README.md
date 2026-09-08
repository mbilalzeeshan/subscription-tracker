# Subscription Tracker

A personal subscription and expense tracker web application built with HTML, Tailwind CSS, and Chart.js.

## Features

- **Visual Metrics Header**: Cards displaying total monthly spending, active subscription count, and upcoming renewals due in the next 7 days
- **Interactive Data Table**: Add, edit, toggle active status, filter by category (Streaming, Utilities, Software, Health), and delete recurring expenses
- **Data Visualizations**: 
  - Pie chart showing spending breakdown by category
  - Bar chart showing 12-month expense projection
- **Data Persistence**: Uses localStorage so your data stays saved across browser sessions
- **Export/Import**: Backup and restore your data as CSV files
- **Polished Design**: Modern dark-mode aesthetic using Tailwind CSS
- **Sample Data**: Pre-loaded with Netflix, Spotify, and Gym membership data for immediate use

## How to Use

### Option 1: Direct Browser Access (Recommended)
1. Simply download or open `index.html` in your web browser
2. The application will work immediately with sample data
3. All data is saved locally in your browser's localStorage

### Option 2: Desktop Shortcut (App-like Experience)
Create a shortcut to launch in app mode (no browser chrome):

**For Google Chrome:**
```
"%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="path/to/index.html"
```

**For Microsoft Edge:**
```
"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="path/to/index.html"
```

### Option 3: Using the Provided Batch File
Double-click `run_subscription_tracker.bat` to automatically launch in Chrome/Edge app mode if available.

## File Structure

```
subscription-tracker/
├── index.html          # Complete self-contained application
├── run_subscription_tracker.bat  # Launcher for app mode
├── INSTALL_AND_RUN.txt     # Detailed usage instructions
├── FINAL_SOLUTION.md       # Technical documentation
├── BUILD_INFO.txt          # Build information
├── package.json            # Electron configuration (from build attempt)
├── main.js                 # Electron main process
├── preload.js              # Electron preload script
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Data Storage & Privacy

- ✅ **100% Local & Private**: All data stored in your browser's localStorage
- ✅ **No External Servers**: Zero data leaves your computer
- ✅ **No Accounts Required**: Works immediately without sign-up
- ✅ **Backup/Restore**: Use Export CSV and Import CSV buttons
- ✅ **Survives Browser Restarts**: Data persists between sessions

## Technical Details

- **Built with**: HTML5, Tailwind CSS v3.4.1 (via CDN), Chart.js v4.4.0 (via CDN), Vanilla JavaScript (ES6+)
- **Browser Support**: Chrome (recommended for app mode), Firefox, Microsoft Edge, Safari
- **No Installation Required**: Single HTML file works in any modern browser
- **Responsive Design**: Works on desktop and mobile devices
- **Offline Functional**: Works offline after initial load (CDN resources cached)

## Getting Started for Development

If you wish to modify or extend the application:

1. The entire application is in `index.html` - no build steps required
2. Modify the file directly and refresh your browser to see changes
3. For true desktop app experience, you could wrap it with Electron or Nativefier

## License

This project is open source and available for personal use.

---
**Note**: The application uses CDN resources for Tailwind CSS and Chart.js. An internet connection is required for the initial load to fetch these resources, after which they are cached and the app works offline.