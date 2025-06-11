# CORS Allow Chrome Extension

This extension lets you specify an origin that will be added as the `Access-Control-Allow-Origin` header for all requests. Useful when developing against APIs that do not have CORS enabled.

## Usage

1. Load the extension in Chrome:
   - Go to `chrome://extensions`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and choose this folder.
2. Click the extension icon and enter the origin you want to allow (e.g. `https://example.com`).
3. All requests will include `Access-Control-Allow-Origin` with your specified value.

The origin is stored using `chrome.storage.sync` and can be changed at any time from the popup.
