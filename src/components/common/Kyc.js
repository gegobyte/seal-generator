import { PDFDocument, StandardFonts } from "pdf-lib";

export const generateKycPdf = async (directors) => {
  try {
    const pdfPath = `/kyc.pdf`;
    const templatePdfBytes = await fetch(pdfPath).then((res) =>
      res.arrayBuffer()
    );

    const mergedPdf = await PDFDocument.create();

    for (const director of directors) {
      const pdfDoc = await PDFDocument.load(templatePdfBytes);
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page = pdfDoc.getPages()[0];

      page.drawText(director.name, {
        x: 180,
        y: 667,
        size: 9,
        font: regularFont,
      });

      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const modifiedPdfBytes = await mergedPdf.save();
    return modifiedPdfBytes;
  } catch (error) {
    console.error("Error generating KYC documents: ", error);
    throw error;
  }
};
