<script setup>
import html2canvas from "html2canvas";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";

const AccountType = Object.freeze({
  HUF: "HUF",
  Corporate: "Corporate",
});

const DocumentsType = Object.freeze({
  Equity: "Equity",
  Annexures: "Annexures",
  Commodity: "Commodity",
});

const firstLine = ref("");
const secondLine = ref("");
const fontSize = ref(12);

const accountTypeSelectedOption = ref(AccountType.HUF);
const selectedDocuments = ref([DocumentsType.Equity, DocumentsType.Annexures]);

/*
const sealPlacements = [
  { page: 4, x: 400, y: 205 },
  { page: 5, x: 75, y: 75 },
  // { page: 8, x: 450, y: 545 },
  // { page: 9, x: 465, y: 80 },
  { page: 8, x: 430, y: 545 },
  // { page: 9, x: 445, y: 80 },
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
  // { page: 21, x: 300, y: 500 },
  // { page: 21, x: 300, y: 400 },
  // { page: 21, x: 300, y: 310 },
  // { page: 21, x: 300, y: 250 },
  { page: 21, x: 250, y: 500 },
  { page: 21, x: 250, y: 400 },
  { page: 21, x: 250, y: 310 },
  { page: 21, x: 250, y: 250 },
  { page: 21, x: 40, y: 120 },
  // { page: 23, x: 465, y: 760 },
  { page: 23, x: 450, y: 760 },
];
*/

const sealPlacements = {
  hufEquity: [
    { page: 4, x: 400, y: 205 },
    { page: 5, x: 75, y: 75 },
    // { page: 8, x: 450, y: 545 },
    // { page: 9, x: 465, y: 80 },
    { page: 8, x: 430, y: 545 },
    // { page: 9, x: 445, y: 80 },
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
    // { page: 21, x: 300, y: 500 },
    // { page: 21, x: 300, y: 400 },
    // { page: 21, x: 300, y: 310 },
    // { page: 21, x: 300, y: 250 },
    { page: 21, x: 250, y: 500 },
    { page: 21, x: 250, y: 400 },
    { page: 21, x: 250, y: 310 },
    { page: 21, x: 250, y: 250 },
    { page: 21, x: 40, y: 120 },
    // { page: 23, x: 465, y: 760 },
    { page: 23, x: 450, y: 760 },
  ],
  hufAnnexures: [
    { page: 1, x: 80, y: 195 },
    { page: 3, x: 80, y: 230 },
  ],
  hufCommodity: [
    { page: 6, x: 430, y: 285 },
    { page: 8, x: 450, y: 585 },
    { page: 9, x: 450, y: 250 },
    { page: 10, x: 450, y: 525 },
    { page: 10, x: 450, y: 145 },
    { page: 11, x: 450, y: 145 },
  ],
  corporateEquity: [
    { page: 4, x: 400, y: 205 },
    { page: 5, x: 75, y: 75 },
    // { page: 8, x: 450, y: 545 },
    // { page: 9, x: 465, y: 80 },
    { page: 8, x: 430, y: 545 },
    // { page: 9, x: 445, y: 80 },
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
    // { page: 21, x: 300, y: 500 },
    // { page: 21, x: 300, y: 400 },
    // { page: 21, x: 300, y: 310 },
    // { page: 21, x: 300, y: 250 },
    { page: 21, x: 250, y: 500 },
    { page: 21, x: 250, y: 400 },
    { page: 21, x: 250, y: 310 },
    { page: 21, x: 250, y: 250 },
    { page: 21, x: 40, y: 120 },
    // { page: 23, x: 465, y: 760 },
    { page: 23, x: 450, y: 760 },
  ],
  corporateAnnexures: [],
  corporateCommodity: [
    { page: 6, x: 430, y: 285 },
    { page: 8, x: 450, y: 585 },
    { page: 9, x: 450, y: 250 },
    { page: 10, x: 450, y: 525 },
    { page: 10, x: 450, y: 145 },
    { page: 11, x: 450, y: 145 },
  ],
  // Continue for other document types as needed
};

/*
const printSeal = (pdfDoc, font) => {
  const lineSpacing = 40;

  sealPlacements.forEach((placement) => {
    const page = pdfDoc.getPages()[placement.page - 1];

    page.drawText(firstLine.value, {
      x: placement.x,
      y: placement.y,
      size: fontSize.value,
    });

    // Measure the width of the first line of text
    const widthOfFirstLine = font.widthOfTextAtSize(
      firstLine.value,
      fontSize.value
    );

    // Calculate the x-coordinate for the start of the second line of text
    const xStartSecondLine =
      placement.x +
      widthOfFirstLine -
      font.widthOfTextAtSize(secondLine.value, fontSize.value);

    // Draw the second line of text aligned with the end of the first line
    page.drawText(secondLine.value, {
      x: xStartSecondLine,
      y: placement.y - lineSpacing, // Adjust Y-coordinate for the second line
      size: fontSize.value,
    });
  });
};
*/

const printSeal = (pdfDoc, font, accountType, documentType) => {
  // Initialize an empty array for seal placements
  let placements = [];
  const lineSpacing = 40;

  // Example customization based on both account type and document type
  if (accountType === "HUF") {
    if (documentType === "Equity") {
      placements = sealPlacements.hufEquity;
    } else if (documentType === "Annexures") {
      placements = sealPlacements.hufAnnexures;
    } else if (documentType === "Commodity") {
      placements = sealPlacements.hufCommodity;
    }
  } else if (accountType === "Corporate") {
    if (documentType === "Equity") {
      placements = sealPlacements.corporateEquity;
    } else if (documentType === "Annexures") {
      placements = sealPlacements.corporateAnnexures;
    } else if (documentType === "Commodity") {
      placements = sealPlacements.corporateCommodity;
    }
  } // Continue for other account types

  placements.forEach((placement) => {
    const page = pdfDoc.getPages()[placement.page - 1];
    page.drawText(firstLine.value, {
      x: placement.x,
      y: placement.y,
      size: fontSize.value,
    });

    // Measure the width of the first line of text
    const widthOfFirstLine = font.widthOfTextAtSize(
      firstLine.value,
      fontSize.value
    );

    // Calculate the x-coordinate for the start of the second line of text
    const xStartSecondLine =
      placement.x +
      widthOfFirstLine -
      font.widthOfTextAtSize(secondLine.value, fontSize.value);

    // Draw the second line of text aligned with the end of the first line
    page.drawText(secondLine.value, {
      x: xStartSecondLine,
      y: placement.y - lineSpacing, // Adjust Y-coordinate for the second line
      size: fontSize.value,
    });
  });
};

const generateSealImage = async () => {
  for (const documentType of selectedDocuments.value) {
    const pdfPath = `/${accountTypeSelectedOption.value.toLowerCase()}_${documentType.toLowerCase()}.pdf`;
    const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Embed the font for adding text
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Apply the seal to the PDF, passing both selectedOption (account type) and documentType
    printSeal(pdfDoc, font, accountTypeSelectedOption.value, documentType);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytesModified = await pdfDoc.save();

    // Create a blob and trigger download/open in a new tab
    const blob = new Blob([pdfBytesModified], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(url, "_blank");
  }
};

/*
const generateSealImage = async () => {
  const hufEquityPdf = "/huf_equity.pdf";
  const hufEquityPdfBytes = await fetch(hufEquityPdf).then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(hufEquityPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  printSeal(pdfDoc, font);

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Create a blob and trigger download
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  // Open the PDF in a new tab
  window.open(url, "_blank");
};*/
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Seal Text</template>
    <template #content>
      <input type="text" v-model="firstLine" placeholder="Seal Line #1" />
      <input type="text" v-model="secondLine" placeholder="Seal Line #2" />
      <label for="fontSizeInput">Font Size:</label>
      <input
        id="fontSizeInput"
        type="number"
        v-model.number="fontSize"
        min="8"
        max="14"
        step="1"
        placeholder="Font Size"
      />
    </template>
    <template #seal-preview>
      <p>{{ firstLine }}</p>
      <br /><br />
      <p>{{ secondLine }}</p>
    </template>
    <template #account-type>
      <div>
        <h3>Account Type</h3>
        <div class="radio-buttons-container">
          <label class="radio-button-label">
            <input
              type="radio"
              :value="AccountType.HUF"
              v-model="accountTypeSelectedOption"
            />
            HUF
          </label>
          <label class="radio-button-label">
            <input
              type="radio"
              :value="AccountType.Corporate"
              v-model="accountTypeSelectedOption"
            />
            Corporate
          </label>
        </div>
      </div>
    </template>
    <template #documents
      ><div>
        <h3>Documents</h3>
        <div class="checkbox-container">
          <label class="checkbox-label">
            <input type="checkbox" value="Equity" v-model="selectedDocuments" />
            Equity
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              value="Annexures"
              v-model="selectedDocuments"
            />
            Annexures
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              value="Commodity"
              v-model="selectedDocuments"
            />
            Commodity
          </label>
        </div>
      </div></template
    >
    <template #generate-button>
      <button @click="generateSealImage">Generate</button>
    </template>
  </WelcomeItem>
</template>
