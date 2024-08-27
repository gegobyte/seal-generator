import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createTable } from "../../common/pdfTableGenerator";
import { createLetterhead } from "../../common/letterhead";
import { centerText, drawMultilineText, placeSeal } from "../../common/helpers";

// Define A4 size in PDF points
const A4_WIDTH = 595.276;
const A4_HEIGHT = 841.89;
const columnWidth = A4_WIDTH / 3;

const drawPage1 = (
  page,
  regularFont,
  boldFont,
  corporateData,
  tableData,
  sealData
) => {
  createLetterhead(page, regularFont, boldFont, corporateData);

  centerText(
    page,
    "UNDERTAKING TO OPEN DEMAT ACCOUNT (Annexure 4)",
    A4_HEIGHT - 100,
    10,
    boldFont
  );

  const currentDate = new Date().toLocaleDateString();
  page.drawText(`Date: ${currentDate}`, {
    x: A4_WIDTH - 150,
    y: A4_HEIGHT - 135,
    size: 10,
    font: regularFont,
  });

  page.drawText("To ZERODHA BROKING LIMITED", {
    x: 50,
    y: A4_HEIGHT - 185,
    size: 10,
    font: boldFont,
  });

  page.drawText(
    "153/154 JP Nagar 4th Phase Dollars Colony, Opp Clarence School",
    {
      x: 50,
      y: A4_HEIGHT - 200,
      size: 10,
      font: regularFont,
    }
  );

  page.drawText("Bangalore 560078", {
    x: 50,
    y: A4_HEIGHT - 215,
    size: 10,
    font: regularFont,
  });

  const introText =
    "1. I / We, have submitted an application for opening a single / joint account for opening a Beneficial Owner [BO] account in the category “individual” for holding and carrying out transactions in respect of securities belonging to our Partnership Firm, as per the clarification issued by the Department of Company Affairs vide its Circular No. 5/75 (8/18/75-CL-V) dated March 31, 1975, Partnership Firms are not capable of being a member within the meaning of Section 41 of The Companies Act, 1956.";

  const introY = A4_HEIGHT - 250;
  const introWidth = page.getSize().width - 100; // 20 padding on each side
  const introHeight = drawMultilineText(
    page,
    introText,
    50,
    introY,
    introWidth,
    14,
    regularFont,
    10
  );

  const secondPara = "2. I / we represent the firm";

  const secondParaY = introY - introHeight - 15;
  const secondParaWidth = page.getSize().width - 100; // 20 padding on each side
  const secondParaHeight = drawMultilineText(
    page,
    secondPara,
    50,
    secondParaY,
    secondParaWidth,
    14,
    regularFont,
    10
  );

  const thirdPara =
    "3. In consideration of you having agreed to accept the Permanent Account Number ___________________________ (“PAN of the Partnership Firm”) issued by the Income Tax Department [ITD] to the firm along with our individual identity documents.";

  const thirdParaY = secondParaY - secondParaHeight - 15; // 30 is extra spacing below the table
  const thirdParaWidth = page.getSize().width - 100; // 20 padding on each side
  const thirdParaHeight = drawMultilineText(
    page,
    thirdPara,
    50,
    thirdParaY,
    thirdParaWidth,
    14,
    regularFont,
    10
  );

  const fourthPara = "4. I / We acknowledge and undertake as under:";

  const fourthParaY = thirdParaY - thirdParaHeight - 15; // 30 is extra spacing below the table
  const fourthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const fourthParaHeight = drawMultilineText(
    page,
    fourthPara,
    50,
    fourthParaY,
    fourthParaWidth,
    14,
    regularFont,
    10
  );

  const fifthPara =
    "a) The acceptance of the PAN number of our firm, as mentioned above, does not amount to you having taken notice of trust or recognize our firm.";

  const fifthParaY = fourthParaY - fourthParaHeight - 15; // 30 is extra spacing below the table
  const fifthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const fifthParaHeight = drawMultilineText(
    page,
    fifthPara,
    60,
    fifthParaY,
    fifthParaWidth,
    14,
    regularFont,
    10
  );

  const sixthPara =
    "b) I/We shall continue to be responsible for complying with the relevant provisions of The Companies Act, 1956 and the Rules made there under and other applicable Laws failing which I / we shall be responsible for the consequences thereof.";

  const sixthParaY = fifthParaY - fifthParaHeight - 15; // 30 is extra spacing below the table
  const sixthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const sixthParaHeight = drawMultilineText(
    page,
    sixthPara,
    60,
    sixthParaY,
    sixthParaWidth,
    14,
    regularFont,
    10
  );

  const seventhPara =
    "c) The Partners have no objection to open the Demat Account in the name('s) of _____________________________________________________________________ Partner(s). (NOTE: Name of Demat account as per regulations cannot be opened in the name of a Partnership and would have to opened in the name of a Partner or maximum 3 Partners)";

  const seventhParaY = sixthParaY - sixthParaHeight - 15; // 30 is extra spacing below the table
  const seventhParaWidth = page.getSize().width - 100; // 20 padding on each side
  const seventhParaHeight = drawMultilineText(
    page,
    seventhPara,
    60,
    seventhParaY,
    seventhParaWidth,
    14,
    regularFont,
    10
  );

  const finalParaEndY = seventhParaY - seventhParaHeight - 30;
  page.drawText("Sincerely,", {
    x: 50,
    y: finalParaEndY,
    font: regularFont,
    size: 10,
  });

  page.drawText("Signature:", {
    x: 50,
    y: finalParaEndY - 30,
    font: regularFont,
    size: 10,
  });

  const sealEndY = placeSeal(
    page,
    finalParaEndY - 50,
    regularFont,
    sealData,
    columnWidth - 130
  );

  page.drawText(`Name: ${tableData[0].name}`, {
    x: 50,
    y: sealEndY - 30,
    font: regularFont,
    size: 10,
  });

  page.drawText(`Designation: ${tableData[0].designation}`, {
    x: 50,
    y: sealEndY - 45,
    font: regularFont,
    size: 10,
  });

  page.drawText("Signature:", {
    x: columnWidth + 120,
    y: finalParaEndY - 30,
    font: regularFont,
    size: 10,
  });

  const secondSealEndY = placeSeal(
    page,
    finalParaEndY - 50,
    regularFont,
    sealData,
    columnWidth + 135
  );

  page.drawText(`Name: ${tableData[1].name}`, {
    x: columnWidth + 120,
    y: secondSealEndY - 30,
    font: regularFont,
    size: 10,
  });

  page.drawText(`Designation: ${tableData[1].designation}`, {
    x: columnWidth + 120,
    y: secondSealEndY - 45,
    font: regularFont,
    size: 10,
  });

  page.drawText(
    "NOTE: Should be signed by all partners of the firm (Please add space/pages for more partners, if required)",
    {
      x: 50,
      y: secondSealEndY - 75,
      font: regularFont,
      size: 10,
    }
  );
};

export const generateAnnexure4Pdf = async (
  tableData,
  corporateData,
  sealData
) => {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page1 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  drawPage1(page1, regularFont, boldFont, corporateData, tableData, sealData);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
