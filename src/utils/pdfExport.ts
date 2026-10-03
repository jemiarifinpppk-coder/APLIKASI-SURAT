import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PaperSize } from '../types/letter';

interface PdfExportOptions {
  elementId?: string;
  fileName?: string;
  paperSize?: PaperSize;
}

export async function exportLetterToPdf({
  elementId = 'document-printable',
  fileName = 'Surat_Dinas_Madrasah',
  paperSize = 'a4',
}: PdfExportOptions): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Elemen naskah tidak ditemukan untuk ekspor PDF.');
  }

  // Paper dimensions in mm (standard format)
  const dimensions: Record<PaperSize, { width: number; height: number; format: string | [number, number] }> = {
    a4: { width: 210, height: 297, format: 'a4' },
    f4: { width: 215, height: 330, format: [215, 330] },
    letter: { width: 215.9, height: 279.4, format: 'letter' },
  };

  const selectedSize = dimensions[paperSize] || dimensions.a4;

  const zoomWrapper = element.closest<HTMLElement>('.preview-zoom-wrapper');
  const prevTransform = zoomWrapper ? zoomWrapper.style.transform : '';
  const prevTransition = zoomWrapper ? zoomWrapper.style.transition : '';

  try {
    if (zoomWrapper) {
      zoomWrapper.style.transition = 'none';
      zoomWrapper.style.transform = 'none';
    }

    const pageElements = Array.from(element.querySelectorAll<HTMLElement>('.pdf-page'));
    const exportTargets = pageElements.length > 0 ? pageElements : [element];

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: selectedSize.format,
      compress: true,
    });

    const pageWidth = selectedSize.width;
    const pageHeight = selectedSize.height;

    for (let i = 0; i < exportTargets.length; i++) {
      const target = exportTargets[i];
      if (i > 0) {
        pdf.addPage(selectedSize.format, 'portrait');
      }

      const canvas = await html2canvas(target, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png', 0.98);
      const contentAspectRatio = canvas.width / canvas.height;
      let renderWidth = pageWidth;
      let renderHeight = pageWidth / contentAspectRatio;

      if (renderHeight > pageHeight) {
        renderHeight = pageHeight;
        renderWidth = pageHeight * contentAspectRatio;
      }

      const offsetX = Math.max(0, (pageWidth - renderWidth) / 2);
      const offsetY = 0;

      pdf.addImage(imgData, 'PNG', offsetX, offsetY, renderWidth, renderHeight, undefined, 'FAST');
    }

    const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(cleanFileName);
  } catch (err) {
    console.error('Error generating PDF with html2canvas:', err);
    throw err;
  } finally {
    if (zoomWrapper) {
      zoomWrapper.style.transform = prevTransform;
      zoomWrapper.style.transition = prevTransition;
    }
  }
}
