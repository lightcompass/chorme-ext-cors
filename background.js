let allowOrigin = '';

// Load the stored origin value when the extension starts
chrome.storage.sync.get('allowOrigin', ({ allowOrigin: saved }) => {
  if (saved) {
    allowOrigin = saved;
  }
});

// Update the cached value whenever the setting changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.allowOrigin) {
    allowOrigin = changes.allowOrigin.newValue || '';
  }
});

function modifyHeaders(details) {
  if (!allowOrigin) {
    return {};
  }

  const responseHeaders = details.responseHeaders || [];
  const headerIndex = responseHeaders.findIndex(
    h => h.name.toLowerCase() === 'access-control-allow-origin'
  );

  if (headerIndex >= 0) {
    responseHeaders[headerIndex].value = allowOrigin;
  } else {
    responseHeaders.push({ name: 'Access-Control-Allow-Origin', value: allowOrigin });
  }

  return { responseHeaders };
}

chrome.webRequest.onHeadersReceived.addListener(
  modifyHeaders,
  { urls: ['<all_urls>'] },
  ['blocking', 'responseHeaders', 'extraHeaders']
);
