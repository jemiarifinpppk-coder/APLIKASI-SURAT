/**
 * Safe browser helpers to prevent uncaught exceptions in sandboxed iframes
 */

export const safeConfirm = (message: string): boolean => {
  try {
    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      return window.confirm(message);
    }
  } catch (err) {
    console.warn('window.confirm blocked in sandboxed iframe:', err);
    return true; // Proceed safely without throwing uncaught SecurityError
  }
  return true;
};

export const safePrint = (elementId: string = 'document-printable'): void => {
  try {
    const printableElement = document.getElementById(elementId);
    if (!printableElement) {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
      return;
    }

    // Remove any previous print frame if left over
    const oldFrame = document.getElementById('isolated-print-frame');
    if (oldFrame) {
      oldFrame.remove();
    }

    // Create an isolated invisible iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'isolated-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    iframe.style.zIndex = '-99999';
    document.body.appendChild(iframe);

    const frameDoc = iframe.contentWindow?.document;
    if (!frameDoc) {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
      return;
    }

    // Collect all stylesheets and font links from head
    const styleTags = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((tag) => tag.outerHTML)
      .join('\n');

    frameDoc.open();
    frameDoc.write(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Cetak Naskah Dinas</title>
  ${styleTags}
  <style>
    @page {
      margin: 0 !important;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      width: 100% !important;
      height: auto !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    #print-content-root {
      margin: 0 auto !important;
      padding: 0 !important;
      width: 100% !important;
      display: block !important;
    }
    .sheet-page {
      box-shadow: none !important;
      border: none !important;
      margin: 0 auto !important;
    }
    .no-print {
      display: none !important;
    }
  </style>
</head>
<body>
  <div id="print-content-root">
    ${printableElement.outerHTML}
  </div>
</body>
</html>`);
    frameDoc.close();

    // Small delay to ensure all CSS and fonts finish layout
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          iframe.remove();
        }, 2000);
      } catch (err) {
        console.warn('Iframe print failed, falling back to window.print():', err);
        iframe.remove();
        if (typeof window !== 'undefined' && typeof window.print === 'function') {
          window.print();
        }
      }
    }, 280);
  } catch (err) {
    console.warn('safePrint fallback to window.print():', err);
    try {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
    } catch {
      // Ignore in sandbox
    }
  }
};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore quota / security restrictions in sandbox
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
