import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createTable } from "../../common/pdfTableGenerator";
import { createLetterhead } from "../../common/letterhead";
import { centerText, drawMultilineText, placeSeal } from "../../common/helpers";
import { format } from "date-fns";

// Define A4 size in PDF points
const A4_WIDTH = 595.276;
const A4_HEIGHT = 841.89;

export const generateDirectorListPdf = async (
  tableData,
  corporateData,
  sealData
) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  createLetterhead(page, regularFont, boldFont, corporateData);

  const currentDate = format(new Date(), "dd-MM-yyyy");
  page.drawText(`Date: ${currentDate}`, {
    x: A4_WIDTH - 150,
    y: A4_HEIGHT - 125,
    size: 12,
    font: regularFont,
  });

  centerText(page, "List of Directors", A4_HEIGHT - 150, 14, boldFont);

  const headers = [
    "S. No.",
    "Name of Director",
    "Designation",
    "Date of Birth",
    "PAN",
    "DIN",
  ];
  const fields = ["sno", "name", "designation", "dob", "pan", "din"];

  const cellWidths = [40, 140, 80, 80, 80, 80];
  const tableEndY = createTable(
    page,
    regularFont,
    boldFont,
    headers,
    tableData,
    fields,
    50,
    A4_HEIGHT - 200,
    cellWidths,
    40,
    30
  );

  const companyBehalfY = tableEndY - 30;
  page.drawText(
    `On Behalf Of ${corporateData.value.corporateName} [Name of Company]`,
    {
      x: 50,
      y: companyBehalfY,
      size: 10,
      font: regularFont,
    }
  );

  const sealY = companyBehalfY - 30;

  const sealEndY = placeSeal(page, sealY, regularFont, sealData);
  page.drawText(`(Sign & Seal of the Company)`, {
    x: 50,
    y: sealEndY - 20,
    size: 10,
    font: regularFont,
  });

  page.drawText(`Name of Director:`, {
    x: 50,
    y: sealEndY - 40,
    size: 10,
    font: regularFont,
  });

  page.drawText(`Designation:`, {
    x: 50,
    y: sealEndY - 60,
    size: 10,
    font: regularFont,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
