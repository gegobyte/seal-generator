<script setup>
import html2canvas from "html2canvas";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";

const firstLine = ref("");
const secondLine = ref("");

const sealPlacements = [
  { page: 4, x: 400, y: 205 },
  { page: 5, x: 75, y: 75 },
  // { page: 8, x: 450, y: 545 },
  // { page: 9, x: 465, y: 80 },
  { page: 8, x: 430, y: 545 },
  // { page: 9, x: 445, y: 80 },
  { page: 9, x: 435, y: 80 },
  { page: 10, x: 50, y: 75 },
  { page: 12, x: 50, y: 75 },
  { page: 13, x: 50, y: 320 },
  { page: 13, x: 50, y: 75 },
  { page: 14, x: 50, y: 580 },
  { page: 14, x: 50, y: 75 },
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

const printSeal = (pdfDoc, font) => {
  const fontSize = 12;
  const lineSpacing = 40;

  sealPlacements.forEach((placement) => {
    const page = pdfDoc.getPages()[placement.page - 1];

    page.drawText(firstLine.value, {
      x: placement.x,
      y: placement.y,
      size: fontSize,
    });

    // Measure the width of the first line of text
    const widthOfFirstLine = font.widthOfTextAtSize(firstLine.value, fontSize);

    // Calculate the x-coordinate for the start of the second line of text
    const xStartSecondLine =
      placement.x +
      widthOfFirstLine -
      font.widthOfTextAtSize(secondLine.value, fontSize);

    // Draw the second line of text aligned with the end of the first line
    page.drawText(secondLine.value, {
      x: xStartSecondLine,
      y: placement.y - lineSpacing, // Adjust Y-coordinate for the second line
      size: fontSize,
    });
  });
};

const generateSealImage = async () => {
  const sealElement = document.getElementById("seal-container");
  const canvas = await html2canvas(sealElement, { scale: 1 });

  const hufPdfUrl = "/huf_form.pdf";
  const existingPdfBytes = await fetch(hufPdfUrl).then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the fifth page of the document (zero-based index)
  const page = pdfDoc.getPages()[4];

  printSeal(pdfDoc, font);

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Create a blob and trigger download
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  // Open the PDF in a new tab
  window.open(url, "_blank");
};
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
    </template>
    <template #seal-preview>
      <p>{{ firstLine }}</p>
      <br /><br />
      <p>{{ secondLine }}</p>
    </template>
    <template #generate-button>
      <button @click="generateSealImage">Generate</button>
    </template>
  </WelcomeItem>
</template>
