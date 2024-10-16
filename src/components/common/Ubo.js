import { PDFDocument, StandardFonts } from "pdf-lib";
import { placeSeal } from "./helpers";

export const generateUboPdf = async (shareholders, sealData) => {
  try {
    const pdfPath = `/ubo.pdf`;
    const templatePdfBytes = await fetch(pdfPath).then((res) =>
      res.arrayBuffer()
    );

    const mergedPdf = await PDFDocument.create();

    for (const shareholder of shareholders) {
      if (!("percentage" in shareholder) || shareholder.percentage >= 10) {
        const pdfDoc = await PDFDocument.load(templatePdfBytes);

        // Add seal to the third page of each individual UBO document
        if (pdfDoc.getPageCount() >= 3) {
          const thirdPage = pdfDoc.getPage(2); // 0-base
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          placeSeal(thirdPage, 400, font, sealData, 300);
        }

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
