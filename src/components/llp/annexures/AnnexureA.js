import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createLetterhead } from "../../common/letterhead";
import { centerText, drawMultilineText, placeSeal } from "../../common/helpers";

const A4_WIDTH = 595.276;
const A4_HEIGHT = 841.89;

const drawDirector = (
  page,
  director,
  index,
  y,
  regularFont,
  boldFont,
  sealData
) => {
  const lineHeight = 20;
  const columnWidth = A4_WIDTH / 4;

  // Number
  page.drawText(`${index + 1}.`, { x: 20, y, font: regularFont, size: 10 });

  // Name
  page.drawText(`Name: ${director.name}`, {
    x: 50,
    y,
    font: regularFont,
    size: 10,
  });

  // Designation
  page.drawText("Designation: PARTNER", {
    x: 50,
    y: y - lineHeight,
    font: regularFont,
    size: 10,
  });

  const sealEndY = placeSeal(
    page,
    y + 10,
    regularFont,
    sealData,
    columnWidth * 2 - 25
  );

  // Seal area
  page.drawText("(Specimen signature)", {
    x: columnWidth * 2 - 25,
    y: sealEndY - 20,
    font: regularFont,
    size: 10,
  });

  // Photo area
  page.drawText("Photograph", {
    x: columnWidth * 3 + 50,
    y: y - 15,
    font: regularFont,
    size: 10,
  });

  return y - 150; // Return the next Y position
};

export const generateAnnexureAPdf = async (
  directors,
  corporateData,
  sealData
) => {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let currentPage = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  let currentY = A4_HEIGHT - 150;
  let directorsOnCurrentPage = 0;

  const noteText =
    "NOTE: Should contain photographs of all Partners of the Firm (Please add by copy and pastingor request for more space/pages for more Partners, if required)";

  const addNewPage = () => {
    currentPage = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
    createLetterhead(currentPage, regularFont, boldFont, corporateData);
    centerText(
      currentPage,
      "ANNEXURE A: LIST OF ALL PARTNERS OF THE FIRM WITH PHOTOGRAPHS AND SIGNATURES",
      A4_HEIGHT - 100,
      10,
      regularFont
    );
    currentY = A4_HEIGHT - 150;
    directorsOnCurrentPage = 0;
  };

  const addNoteToPage = () => {
    const noteY = 50; // Position the note at the bottom of the page
    const noteWidth = A4_WIDTH - 100; // 50 padding on each side
    drawMultilineText(
      currentPage,
      noteText,
      50,
      noteY,
      noteWidth,
      14,
      regularFont,
      10
    );
  };

  createLetterhead(currentPage, regularFont, boldFont, corporateData);
  centerText(
    currentPage,
    "ANNEXURE A: LIST OF ALL PARTNERS OF THE FIRM WITH PHOTOGRAPHS AND SIGNATURES",
    A4_HEIGHT - 100,
    10,
    regularFont
  );

  directors.forEach((director, index) => {
    if (directorsOnCurrentPage >= 4) {
      addNoteToPage(); // Add note to the current page before creating a new one
      addNewPage();
    }

    currentY = drawDirector(
      currentPage,
      director,
      index,
      currentY,
      regularFont,
      boldFont,
      sealData
    );
    directorsOnCurrentPage++;
  });

  // Add note to the last page
  addNoteToPage();

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
