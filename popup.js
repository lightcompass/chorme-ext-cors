document.getElementById('save').addEventListener('click', () => {
  const origin = document.getElementById('origin').value.trim();
  if (origin) {
    chrome.storage.sync.set({ allowOrigin: origin });
  }
});

chrome.storage.sync.get('allowOrigin', ({ allowOrigin }) => {
  if (allowOrigin) {
    document.getElementById('origin').value = allowOrigin;
  }
});
