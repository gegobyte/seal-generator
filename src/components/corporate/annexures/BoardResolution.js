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

  const introText = `CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS OF ${
    corporateData.value.corporateName
  } HELD AT THE REGISTERED OFFICE OF THE COMPANY AT ${
    corporateData.value.address
  } ON ${getCurrentDay()} (Date), ${getCurrentMonth()} (Month), ${getCurrentYear()} (Year) at ${getCurrentTime()} (Time).`;

  const introY = A4_HEIGHT - 100; // 30 is extra spacing below the table
  const introWidth = page.getSize().width - 100; // 20 padding on each side
  const introHeight = drawMultilineText(
    page,
    introText,
    50,
    introY,
    introWidth,
    14,
    boldFont,
    10
  );

  const secondPara = `“RESOLVED THAT, ${corporateData.value.corporateName} is authorized to invest into shares, mutual funds, stocks, bonds and securities.”`;

  const secondParaY = introY - introHeight - 30; // 30 is extra spacing below the table
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

  const thirdPara = `“RESOLVED THAT, ${corporateData.value.corporateName} shall be registered as a client with Zerodha Commodities Private Limited, being a member of MCX(Membership no. 46025), and having SEBI registration number INZ000038238.”`;

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

  const fourthPara = `“RESOLVED THAT, ${corporateData.value.corporateName} be registered as a client and open a trading & demat account with Zerodha Broking Limited, a broking entity and having membership with NSE & BSE, with SEBI Registration number INZ000031633 & membership with CDSL having DP Registration number IN-DP-431-2019.”`;

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

  const fifthPara = `“RESOLVED FURTHER THAT Zerodha Broking Limited and Zerodha Commodities Pvt Ltd are hereby authorized to honor instructions, oral or written; given on behalf of the Company by any of the under noted Authorized Signatories who is/are authorized to sell, purchase, transfer, endorse, negotiate documents and/or otherwise deal in securities and/or derivatives and/or commodities jointly or severally.”`;

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

  const headers = [
    "S. No.",
    "Name of Authorized Signatory",
    "Specimen Signature\n(Please do not put seal)",
  ];
  const fields = ["sno", "name", "signature"];

  const cellWidths = [40, 250, 150];

  const tableStartY = fifthParaY - fifthParaHeight - 30;
  const tableEndY = createTable(
    page,
    regularFont,
    boldFont,
    headers,
    tableData,
    fields,
    50,
    tableStartY,
    cellWidths,
    40,
    30
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

  const sixthPara = `“RESOLVED FURTHER THAT, the above named Authorized Signatories are hereby authorized severally or jointly, to sign, execute and submit all such forms, applications, undertakings, instructions, authorizations and other requisite documents, writings and deeds as may be deemed necessary or expedient to open, close and operate the said account and give effect to this resolution.”`;

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

  const seventhPara = `“RESOLVED FURTHER THAT, the above named Authorized Signatories shall be, severally or jointly, authorized to submit, sign and execute all such forms, applications, undertakings, authorizations and documents deemed necessary for the KYC application with an appropriate KRA.”`;

  const seventhParaY = sixthParaY - sixthParaHeight - 30; // 30 is extra spacing below the table
  const seventhParaWidth = page.getSize().width - 100; // 20 padding on each side
  const seventhParaHeight = drawMultilineText(
    page,
    seventhPara,
    50,
    seventhParaY,
    seventhParaWidth,
    14,
    regularFont,
    10
  );

  const eightPara = `“RESOLVED FURTHER THAT the above named Authorized Signatories be and are hereby authorized jointly or severally to furnish the certified true copy of the extract of the Board Resolution to Zerodha Broking Limited/Zerodha Commodities Pvt Ltd or wherever required.”`;

  const eightParaY = seventhParaY - seventhParaHeight - 30; // 30 is extra spacing below the table
  const eightParaWidth = page.getSize().width - 100; // 20 padding on each side
  const eightParaHeight = drawMultilineText(
    page,
    eightPara,
    50,
    eightParaY,
    eightParaWidth,
    14,
    regularFont,
    10
  );

  const ninthPara = `“RESOLVED FURTHER THAT the above named Authorized Signatories can issue cheques or authorize payments from the bank account of The Company to credit money into the trading, demat and commodities account of the Company held with Zerodha Broking Limited AND Zerodha Commodities Pvt Ltd., the trading member/’s, even though his/her signature(’s) may not be available on the records of Zerodha Broking Limited OR Zerodha Commodities Pvt Ltd.”`;

  const ninthParaY = eightParaY - eightParaHeight - 30; // 30 is extra spacing below the table
  const ninthParaWidth = page.getSize().width - 100; // 20 padding on each side
  const ninthParaHeight = drawMultilineText(
    page,
    ninthPara,
    50,
    ninthParaY,
    ninthParaWidth,
    14,
    regularFont,
    10
  );

  const finalParaEndY = ninthParaY - ninthParaHeight - 30;
  page.drawText(`For ${corporateData.value.corporateName}`, {
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
    "*Note: At least 2 Directors/Partners should sign this Board Resolution for approval of the same.",
    {
      x: 50,
      y: secondSealEndY - 120,
      font: boldFont,
      size: 10,
    }
  );
};

export const generateBoardResolutionPdf = async (
  tableData,
  corporateData,
  sealData
) => {
  var authorizedSignatoryData = tableData.filter(
    (row) => row.isAuthorizedSignatory === true
  );
  var reorderedTableData;

  // If no authorized signatory is found, handle this case
  if (authorizedSignatoryData.length === 0) {
    authorizedSignatoryData = tableData;
    reorderedTableData = tableData;
  } else {
    // Create a new array with authorized signatory at the start, followed by others
    reorderedTableData = [
      ...authorizedSignatoryData,
      ...tableData.filter((row) => !row.isAuthorizedSignatory),
    ];
  }

  const pdfDoc = await PDFDocument.create();
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const page1 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
  const page2 = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  drawPage1(
    page1,
    regularFont,
    boldFont,
    corporateData,
    authorizedSignatoryData
  );
  drawPage2(
    page2,
    regularFont,
    boldFont,
    corporateData,
    reorderedTableData,
    sealData
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
