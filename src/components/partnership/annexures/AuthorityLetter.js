import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createTable } from "../../common/pdfTableGenerator";
import { createLetterhead } from "../../common/letterhead";
import {
  centerText,
  drawMultilineText,
  placeSeal,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
  getCurrentTime,
} from "../../common/helpers";

// Define A4 size in PDF points
const A4_WIDTH = 595.276;
const A4_HEIGHT = 841.89;
const columnWidth = A4_WIDTH / 3;

const drawPage1 = (page, regularFont, boldFont, corporateData, tableData) => {
  createLetterhead(page, regularFont, boldFont, corporateData);

  centerText(
    page,
    "AUTHORITY LETTER IN FAVOUR OF AUTHORIZED PARTNERS TO ZERODHA BROKING LIMITED (Annexure 1A)",
    A4_HEIGHT - 100,
    10,
    regularFont
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

  page.drawText("#153/154 4th Cross, Dollars Colony,", {
    x: 50,
    y: A4_HEIGHT - 200,
    size: 10,
    font: regularFont,
  });

  page.drawText("Opp. Clarence Public School, J.P Nagar 4th Phase,", {
    x: 50,
    y: A4_HEIGHT - 215,
    size: 10,
    font: regularFont,
  });

  page.drawText("Bangalore - 560078", {
    x: 50,
    y: A4_HEIGHT - 230,
    size: 10,
    font: regularFont,
  });

  page.drawText("Dear Sir/Ma'am,", {
    x: 50,
    y: A4_HEIGHT - 255,
    size: 10,
    font: regularFont,
  });

  const introText = `We, the partners of M/S ${corporateData.value.corporateName} (“The Partnership”), a partnership firm having it's office at ${corporateData.value.address} (“Registered Office”) in ${corporateData.value.city} (“City of Registered Office”) in the state of ${corporateData.value.state} (“State of Registered Office”) hereby authorize:`;

  const introY = A4_HEIGHT - 280;
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

  page.drawText(`1) ${tableData[0].name} (Name of Authorized Partner);`, {
    x: 50,
    y: introY - introHeight - 30,
    size: 10,
    font: regularFont,
  });

  page.drawText(
    "(Please Note: There can be only 1 (One) single Authorized Partner named above)",
    {
      x: 50,
      y: introY - introHeight - 50,
      size: 10,
      font: boldFont,
    }
  );

  const secondPara =
    "To open: (1) a trading account with Zerodha Broking limited, a broking entity and having membership with NSE & BSE, with SEBI Registration number INZ000031633; (2) a demat account with Zerodha Broking Limited , which uses CDSL as the Depository, having SEBI Registration Number INZ000038238; (3) a commodities account with Zerodha Commodities Private Limited, being a member of MCX (Membership no. 46025) and having SEBI registration number INZ000038238";

  const secondParaY = introY - introHeight - 75;
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
    "The above named Authorized Partner ('s) are hereby authorized jointly or severally to sign all documents pertaining to opening and closing of the trading, demat and commodities account soopened on behalf of The Partnership. The account would be a beneficiary account with CDSL being the depository.";

  const thirdParaY = secondParaY - secondParaHeight - 30; // 30 is extra spacing below the table
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

  const fourthPara =
    "The above named Authorized Partner('s) shall be authorized on behalf of The Partnership to deal in equities, derivatives, debt products, mutual funds and the said Trading Member is hereby authorized to honour all the instructions oral/written, given on behalf of The Partnership by the Authorized Partner('s).";

  const fourthParaY = thirdParaY - thirdParaHeight - 30; // 30 is extra spacing below the table
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
    "The above named Authorized Partner('s) shall be authorized on behalf of The Partnership to sell, purchase, transfer, endorse, execute, submit applications/undertakings/agreements regarding KYC application with any applicable KRA and negotiate documents AND/OR otherwise deal through Zerodha Broking Limited AND/OR Zerodha Commodities Private Limited on behalf of The Partnership.";

  const fifthParaY = fourthParaY - fourthParaHeight - 30; // 30 is extra spacing below the table
  const fifthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const fifthParaHeight = drawMultilineText(
    page,
    fifthPara,
    50,
    fifthParaY,
    fifthParaWidth,
    14,
    regularFont,
    10
  );

  const sixthPara =
    "However, any authorized signatory/Partner of The Partnership can issue cheques or authorize payments from the bank account of The Partnership to credit money into the trading and demat account of The Partnership held with Zerodha Broking Limited AND/OR";

  const sixthParaY = fifthParaY - fifthParaHeight - 30; // 30 is extra spacing below the table
  const sixthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const sixthParaHeight = drawMultilineText(
    page,
    sixthPara,
    50,
    sixthParaY,
    sixthParaWidth,
    14,
    regularFont,
    10
  );
};

const drawPage2 = (
  page,
  regularFont,
  boldFont,
  corporateData,
  tableData,
  sealData
) => {
  createLetterhead(page, regularFont, boldFont, corporateData);

  const sixthPara =
    "Zerodha Commodities Private Limited even though his/her signature('s) may not be available on the records of the Zerodha Broking Limited AND/OR Zerodha Commodities Private Limited. These cheques may be either from the bank account of The Partnership or of the individual Partner, as and whichever account is linked to the trading and demat account maintained with Zerodha Broking Limited AND/OR Zerodha Commodities Private Limited.";

  const sixthParaY = A4_HEIGHT - 100; // 30 is extra spacing below the table
  const sixthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const sixthParaHeight = drawMultilineText(
    page,
    sixthPara,
    50,
    sixthParaY,
    sixthParaWidth,
    14,
    regularFont,
    10
  );

  const finalParaEndY = sixthParaY - sixthParaHeight - 30;
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
    y: sealEndY - 60,
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
    y: secondSealEndY - 60,
    font: regularFont,
    size: 10,
  });

  page.drawText(
    "NOTE: Should be signed by all partners of the firm (Please add space/pages for more partners, if required)",
    {
      x: 50,
      y: secondSealEndY - 120,
      font: regularFont,
      size: 10,
    }
  );

  page.drawText("CC: (1) Zerodha Commodities Private Limited", {
    x: 50,
    y: secondSealEndY - 170,
    font: regularFont,
    size: 10,
  });

  page.drawText("(2) Zerodha Broking Limited", {
    x: 70,
    y: secondSealEndY - 200,
    font: regularFont,
    size: 10,
  });
};

export const generateAuthorityLetterPdf = async (
  tableData,
  corporateData,
  sealData
) => {
  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page1 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const page2 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  drawPage1(page1, regularFont, boldFont, corporateData, tableData);
  drawPage2(page2, regularFont, boldFont, corporateData, tableData, sealData);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
