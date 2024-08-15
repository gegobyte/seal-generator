import { PDFDocument, StandardFonts } from "pdf-lib";
import { placeSeal } from "./helpers";

const sealPlacements = {
  corporateEquity: [
    { page: 4, x: 400, y: 205 },
    { page: 5, x: 75, y: 75 },
    { page: 8, x: 430, y: 545 },
    { page: 9, x: 435, y: 80 },
    { page: 10, x: 30, y: 75 },
    { page: 12, x: 40, y: 75 },
    { page: 13, x: 40, y: 320 },
    { page: 13, x: 40, y: 75 },
    { page: 14, x: 40, y: 580 },
    { page: 14, x: 40, y: 75 },
    { page: 17, x: 40, y: 68 },
    { page: 18, x: 40, y: 300 },
    { page: 18, x: 40, y: 68 },
    { page: 19, x: 40, y: 420 },
    { page: 19, x: 40, y: 130 },
    { page: 21, x: 250, y: 500 },
    { page: 21, x: 250, y: 400 },
    { page: 21, x: 250, y: 310 },
    { page: 21, x: 250, y: 250 },
    { page: 21, x: 40, y: 120 },
    { page: 23, x: 450, y: 760 },
    { page: 24, x: 440, y: 325 },
  ],
};

const applySealOffset = (placements, offset) => {
  return placements.map((placement) => {
    if (placement.page === 21 && placement.x === 250) {
      return { ...placement, x: placement.x + offset };
    }
    return placement;
  });
};

const getAdjustedEquityPlacements = (sealData) => {
  const offset = Number(sealData.value.ddpiOffset);
  return applySealOffset(sealPlacements.corporateEquity, offset);
};

export const generateEquityPdf = async (sealData) => {
  try {
    const pdfPath = `/corporate_equity.pdf`;
    const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const placements = getAdjustedEquityPlacements(sealData);

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
