<script setup>
import Seal from "../common/Seal.vue";
import FormGeneratorLogo from "../FormGeneratorLogo.vue";
import { ref, computed } from "vue";
import { PDFDocument, StandardFonts } from "pdf-lib";

const AccountType = Object.freeze({
  HUF: "HUF",
  Corporate: "Corporate",
});

const DocumentsType = Object.freeze({
  Equity: "Equity",
  Annexures: "Annexures",
  Commodity: "Commodity",
});

const sealData = ref(null);
const isGenerating = ref(false);

const accountTypeSelectedOption = ref(AccountType.HUF);
const selectedDocuments = ref([DocumentsType.Equity, DocumentsType.Annexures]);

const formGenerationPreference = ref("together");

// Define the correct order of documents
const correctDocumentOrder = [
  DocumentsType.Equity,
  DocumentsType.Annexures,
  DocumentsType.Commodity,
];

// Compute the ordered documents based on the correct order
const orderedDocuments = computed(() => {
  return correctDocumentOrder.filter((doc) =>
    selectedDocuments.value.includes(doc)
  );
});

const handleSealDataUpdate = (newSealData) => {
  sealData.value = newSealData;
};

const applySealOffset = (placements, offset) => {
  return placements.map((placement) => {
    if (placement.page === 21 && placement.x === 250) {
      return { ...placement, x: placement.x + offset };
    }
    return placement;
  });
};

const getAdjustedHufEquityPlacements = () => {
  const offset = Number(sealData.value.ddpiOffset);
  return applySealOffset(sealPlacements.hufEquity, offset);
};

const getAdjustedCorporateEquityPlacements = () => {
  const offset = Number(sealData.value.ddpiOffset);
  return applySealOffset(sealPlacements.corporateEquity, offset);
};

const sealPlacements = {
  hufEquity: [
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
  hufAnnexures: [
    { page: 1, x: 80, y: 195 },
    { page: 3, x: 80, y: 230 },
  ],
  hufCommodity: [{ page: 1, x: 120, y: 220 }],
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
  corporateAnnexures: [
    { page: 4, x: 250, y: 60 },
    { page: 7, x: 240, y: 330 },
  ],
  corporateCommodity: [{ page: 1, x: 120, y: 220 }],
};

const printSeal = (pdfDoc, font, accountType, documentType) => {
  // Initialize an empty array for seal placements
  let placements = [];
  const lineSpacing = 40;

  // Example customization based on both account type and document type
  if (accountType === "HUF") {
    if (documentType === "Equity") {
      placements = getAdjustedHufEquityPlacements();
    } else if (documentType === "Annexures") {
      placements = sealPlacements.hufAnnexures;
    } else if (documentType === "Commodity") {
      placements = sealPlacements.hufCommodity;
    }
  } else if (accountType === "Corporate") {
    if (documentType === "Equity") {
      placements = getAdjustedCorporateEquityPlacements();
    } else if (documentType === "Annexures") {
      placements = sealPlacements.corporateAnnexures;
    } else if (documentType === "Commodity") {
      placements = sealPlacements.corporateCommodity;
    }
  } // Continue for other account types

  placements.forEach((placement) => {
    const page = pdfDoc.getPages()[placement.page - 1];
    page.drawText(sealData.value.firstLine, {
      x: placement.x,
      y: placement.y,
      size: sealData.value.fontSize,
    });

    // Measure the width of the first line of text
    const widthOfFirstLine = font.widthOfTextAtSize(
      sealData.value.firstLine,
      sealData.value.fontSize
    );

    // Calculate the x-coordinate for the start of the second line of text
    const xStartSecondLine =
      placement.x +
      widthOfFirstLine -
      font.widthOfTextAtSize(
        sealData.value.secondLine,
        sealData.value.fontSize
      );

    // Draw the second line of text aligned with the end of the first line
    page.drawText(sealData.value.secondLine, {
      x: xStartSecondLine,
      y: placement.y - lineSpacing, // Adjust Y-coordinate for the second line
      size: sealData.value.fontSize,
    });
  });
};

const generateHufDocuments = async () => {
  isGenerating.value = true;
  try {
    if (formGenerationPreference.value === "together") {
      const mergedPdf = await PDFDocument.create();

      for (const documentType of orderedDocuments.value) {
        const pdfPath = `/${accountTypeSelectedOption.value.toLowerCase()}_${documentType.toLowerCase()}.pdf`;
        const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        printSeal(pdfDoc, font, accountTypeSelectedOption.value, documentType);

        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      for (const documentType of orderedDocuments.value) {
        const pdfPath = `/${accountTypeSelectedOption.value.toLowerCase()}_${documentType.toLowerCase()}.pdf`;
        const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        printSeal(pdfDoc, font, accountTypeSelectedOption.value, documentType);

        const pdfBytesModified = await pdfDoc.save();
        const blob = new Blob([pdfBytesModified], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    }
  } catch (error) {
    console.error("Error generating documents:", error);
  } finally {
    isGenerating.value = false;
  }
};
</script>

<template>
  <div class="form-container">
    <div class="header">
      <h1>HUF Form Generator</h1>
      <nav class="form-nav">
        <a href="/" class="nav-link active">HUF</a>
        <a href="/partnership" class="nav-link">Partnership</a>
        <a href="/corporate" class="nav-link">Corporate</a>
        <a href="/llp" class="nav-link">LLP</a>
      </nav>
    </div>
    <div class="grid-layout">
      <FormGeneratorLogo />
      <div>
        <Seal @update:sealData="handleSealDataUpdate" />
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
          </div>
        </div>
        <div class="documents-container">
          <h3>Documents</h3>
          <div class="checkbox-container">
            <label
              class="checkbox-label"
              v-for="doc in Object.values(DocumentsType)"
              :key="doc"
            >
              <input type="checkbox" :value="doc" v-model="selectedDocuments" />
              {{ doc }}
            </label>
          </div>
        </div>
        <div class="form-generation-preference">
          <h3>Form Generation Preference</h3>
          <div class="radio-buttons-container">
            <label class="radio-button-label">
              <input
                type="radio"
                value="together"
                v-model="formGenerationPreference"
              />
              Together
            </label>
            <label class="radio-button-label">
              <input
                type="radio"
                value="separately"
                v-model="formGenerationPreference"
              />
              Separately
            </label>
          </div>
        </div>
        <div class="generate-button">
          <button @click="generateHufDocuments" :disabled="isGenerating">
            <span v-if="!isGenerating">Generate</span>
            <span v-else class="loader"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.radio-buttons-container,
.checkbox-container {
  display: flex;
  align-items: center;
}

.radio-button-label,
.checkbox-label {
  margin-right: 20px;
}

.documents-container {
  margin-top: 20px;
}

h3 {
  margin-bottom: 8px;
}

.generate-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.generate-button {
  margin-top: 30px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #283b49;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1a2832;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top: 2px solid #283b49;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-generation-preference {
  margin-top: 20px;
}

.form-nav {
  display: flex;
}

.nav-link {
  padding: 5px 10px;
  margin-left: 10px;
  text-decoration: none;
  color: #283b49;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #1a2832;
  text-decoration: underline;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
  color: #283b49;
}
</style>
