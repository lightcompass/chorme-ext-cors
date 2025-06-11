const updateHeaders = (details) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['allowOrigin'], ({ allowOrigin }) => {
      if (!allowOrigin) {
        return resolve({});
      }
      const responseHeaders = details.responseHeaders || [];
      const headerIndex = responseHeaders.findIndex(h => h.name.toLowerCase() === 'access-control-allow-origin');
      if (headerIndex >= 0) {
        responseHeaders[headerIndex].value = allowOrigin;
      } else {
        responseHeaders.push({ name: 'Access-Control-Allow-Origin', value: allowOrigin });
      }
      resolve({ responseHeaders });
    });
  });
};

chrome.webRequest.onHeadersReceived.addListener(
  (details) => updateHeaders(details),
  { urls: ['<all_urls>'] },
  ['blocking', 'responseHeaders', 'extraHeaders']
);
