import { PDFDocument, StandardFonts } from "pdf-lib";
import { placeSeal } from "./helpers";

const sealPlacements = {
  corporateCommodity: [{ page: 1, x: 120, y: 220 }],
};

export const generateCommodityPdf = async (sealData) => {
  try {
    const pdfPath = `/corporate_commodity.pdf`;
    const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const placements = sealPlacements.corporateCommodity;

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
