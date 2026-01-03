# FeedbackPenguin Helper

A lightweight Chrome extension that adds a one-click shortcut to open FeedbackPenguin directly from supported teaching platforms, automatically passing relevant class and student details to streamline data entry.

---

## What this extension does

- Adds a small penguin icon to supported teaching platform pages
- Lets you open FeedbackPenguin with one click
- Automatically passes relevant class and student details via URL parameters
- Reduces manual copying and pasting

---

## Supported platforms

- VIPTeacher (`teach.vipteacher.com`)

Support for additional platforms may be added in the future.

---

## How it works

1. The extension runs only on supported teaching platform pages
2. It reads visible class and student information from the page when you click the icon
3. It opens FeedbackPenguin in the same tab with the extracted data included in the URL

---

## Permissions explained

This extension requests the following Chrome permissions:

- **`tabs`**  
  Required to detect page navigation after clicking a student and to redirect the tab once required information is available.

- **`scripting`**  
  Required to safely read page content from supported teaching platforms.

- **Host access (`teach.vipteacher.com`)**  
  The extension only runs on explicitly supported domains.

> **Note:**  
> Although Chrome may display a warning about “reading browsing history,” this extension does **not** track, store, or access browsing history. It only reads the current tab URL on supported pages to function correctly.

---

## Privacy

- No tracking
- No analytics
- No data storage
- No background monitoring
- No access outside supported teaching platforms

All processing happens locally in your browser.

---

## License

MIT License
