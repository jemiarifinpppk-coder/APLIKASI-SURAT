/**
 * Utility to export the rendered letter as an official Microsoft Word (.doc) compatible document
 * with precise A4 margins, Bookman/Times fonts, tables, and centered Kop.
 */

import { PaperSize } from '../types/letter';

interface WordExportOptions {
  paperSize?: PaperSize;
  marginPreset?: 'standar' | 'kompak' | 'lebar';
}

export const exportLetterToWord = (
  elementId: string,
  filename: string,
  options: WordExportOptions = {}
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Dokumen tidak ditemukan untuk ekspor Word.');
    return;
  }

  const { paperSize = 'a4', marginPreset = 'standar' } = options;

  // Paper dimensions in points (1 pt = 1/72 inch, 1 mm = 2.83465 pt)
  // A4: 210 x 297 mm = 595.3pt x 841.9pt
  // F4: 215 x 330 mm = 609.5pt x 935.4pt
  // Letter: 215.9 x 279.4 mm = 612pt x 792pt
  let pageSizeCss = '595.3pt 841.9pt;';
  if (paperSize === 'f4') {
    pageSizeCss = '609.5pt 935.4pt;';
  } else if (paperSize === 'letter') {
    pageSizeCss = '612.0pt 792.0pt;';
  }

  // Margin settings
  // Standar: Atas 20mm (56.7pt), Kiri 25mm (70.9pt), Bawah 20mm (56.7pt), Kanan 20mm (56.7pt)
  // Kompak: Atas 15mm (42.5pt), Kiri 20mm (56.7pt), Bawah 15mm (42.5pt), Kanan 15mm (42.5pt)
  // Lebar: Atas 25mm (70.9pt), Kiri 30mm (85.0pt), Bawah 25mm (70.9pt), Kanan 25mm (70.9pt)
  let marginCss = '56.7pt 56.7pt 56.7pt 70.9pt;'; // top right bottom left
  if (marginPreset === 'kompak') {
    marginCss = '42.5pt 42.5pt 42.5pt 56.7pt;';
  } else if (marginPreset === 'lebar') {
    marginCss = '70.9pt 70.9pt 70.9pt 85.0pt;';
  }

  // Clean print-hide elements from cloned or copied HTML
  const clone = element.cloneNode(true) as HTMLElement;
  const hideEls = clone.querySelectorAll('.no-print');
  hideEls.forEach((el) => el.remove());
  const htmlContent = clone.innerHTML;

  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      <style>
        @page Section1 {
          size: ${pageSizeCss}
          margin: ${marginCss}
          mso-header-margin: 35.4pt;
          mso-footer-margin: 35.4pt;
          mso-paper-source: 0;
        }
        div.Section1 {
          page: Section1;
        }
        body {
          font-family: 'Bookman Old Style', 'Times New Roman', serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #000000;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 6pt;
          margin-bottom: 6pt;
        }
        th, td {
          border: 1px solid #000000;
          padding: 3pt 5pt;
          font-size: 9.5pt;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-justify { text-align: justify; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .underline { text-decoration: underline; }
        .border-b-2 { border-bottom: 2px solid #000; }
        .border-b-4 { border-bottom: 3.5px double #000; }
      </style>
    </head>
    <body>
      <div class="Section1">
  `;

  const footer = `
      </div>
    </body>
    </html>
  `;

  const sourceHTML = header + htmlContent + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement('a');
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${filename || 'surat-madrasah'}.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
};
