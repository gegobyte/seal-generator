import { PDFDocument, StandardFonts } from "pdf-lib";
import { placeSeal } from "./helpers";

const sealPlacements = {
  corporateFatca: [
    { page: 4, x: 250, y: 60 },
    { page: 7, x: 240, y: 330 },
  ],
};

export const generateFatcaPdf = async (sealData) => {
  try {
    const pdfPath = `/corporate_fatca.pdf`;
    const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const placements = sealPlacements.corporateFatca;

    placements.forEach((placement) => {
      const page = pdfDoc.getPages()[placement.page - 1];
      placeSeal(page, placement.y, regularFont, sealData, placement.x);
    });

    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
  } catch (error) {
    console.log("Error generating documents: ", error);
  }
};
