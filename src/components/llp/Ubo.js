import { PDFDocument } from "pdf-lib";

export const generateUboPdf = async (shareholders) => {
  try {
    const pdfPath = `/ubo.pdf`;
    const templatePdfBytes = await fetch(pdfPath).then((res) =>
      res.arrayBuffer()
    );

    const mergedPdf = await PDFDocument.create();

    for (const shareholder of shareholders) {
      if (!("percentage" in shareholder) || shareholder.percentage >= 15) {
        const pdfDoc = await PDFDocument.load(templatePdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
    }

    const modifiedPdfBytes = await mergedPdf.save();
    return modifiedPdfBytes;
  } catch (error) {
    console.error("Error generating UBO documents: ", error);
    throw error;
  }
};
