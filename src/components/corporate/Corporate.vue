<script setup>
import { PDFDocument } from "pdf-lib";
import Seal from "../common/Seal.vue";
import Shareholders from "./Shareholders.vue";
import Directors from "./Directors.vue";
import Documents from "./Documents.vue";
import CorporateBasicDetails from "./CorporateBasicDetails.vue";
import { generateShareholdingPatternPdf } from "./annexures/ShareholdingPattern";
import { generateDirectorListPdf } from "./annexures/DirectorList";
import { generateAnnexureAPdf } from "./annexures/AnnexureA";
import { generateBoardResolutionPdf } from "./annexures/BoardResolution";
import { generateEquityPdf } from "../common/Equity";
import { generateFatcaPdf } from "../common/Fatca";
import { generateCommodityPdf } from "../common/Commodity";
import { generateKycPdf } from "../common/Kyc";
import { generateUboPdf } from "../common/Ubo";
import { ref } from "vue";

const shareholdingPatternData = ref([]);
const directorListData = ref([]);
const sealData = ref(null);
const corporateData = ref(null);

const corporateSelectedDocuments = ref([]);
const corporateFormGenerationPreference = ref("together");

const handleSelectedDocumentsUpdate = (newValue) => {
  corporateSelectedDocuments.value = newValue;
};

const handleFormGenerationPreferenceUpdate = (newValue) => {
  corporateFormGenerationPreference.value = newValue;
};

const handleSealDataUpdate = (newSealData) => {
  sealData.value = newSealData;
};

const handleCorporateDataUpdate = (newCorporateData) => {
  corporateData.value = newCorporateData;
};

const submitForm = async () => {
  try {
    const pdfFunctions = {
      "Shareholding Pattern": generateShareholdingPatternPdf,
      "List of Directors": generateDirectorListPdf,
      "Annexure A": generateAnnexureAPdf,
      "Board Resolution": generateBoardResolutionPdf,
      Equity: generateEquityPdf,
      FATCA: generateFatcaPdf,
      Commodity: generateCommodityPdf,
      KYC: generateKycPdf,
      UBO: generateUboPdf,
    };

    // Define the desired order of documents
    const documentOrder = [
      "Equity",
      "FATCA",
      "Commodity",
      "Board Resolution",
      "List of Directors",
      "Shareholding Pattern",
      "Annexure A",
      "KYC",
      "UBO",
    ];

    // Filter and sort the selected documents according to the defined order
    const selectedPdfs = corporateSelectedDocuments.value
      .filter((doc) => pdfFunctions[doc])
      .sort((a, b) => documentOrder.indexOf(a) - documentOrder.indexOf(b));

    if (corporateFormGenerationPreference.value === "together") {
      const mergedPdf = await PDFDocument.create();

      for (const docType of selectedPdfs) {
        let pdfBytes;
        switch (docType) {
          case "Shareholding Pattern":
            pdfBytes = await generateShareholdingPatternPdf(
              shareholdingPatternData.value,
              corporateData,
              sealData
            );
            break;
          case "List of Directors":
            pdfBytes = await generateDirectorListPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Annexure A":
            pdfBytes = await generateAnnexureAPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Board Resolution":
            pdfBytes = await generateBoardResolutionPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Equity":
            pdfBytes = await generateEquityPdf(sealData);
            break;
          case "FATCA":
            pdfBytes = await generateFatcaPdf(sealData);
            break;
          case "Commodity":
            pdfBytes = await generateCommodityPdf(sealData);
            break;
          case "KYC":
            pdfBytes = await generateKycPdf(directorListData.value);
            break;
          case "UBO":
            pdfBytes = await generateUboPdf(
              shareholdingPatternData.value,
              sealData.value
            );
            break;
        }
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      for (const docType of selectedPdfs) {
        let pdfBytes;
        switch (docType) {
          case "Shareholding Pattern":
            pdfBytes = await generateShareholdingPatternPdf(
              shareholdingPatternData.value,
              corporateData,
              sealData
            );
            break;
          case "List of Directors":
            pdfBytes = await generateDirectorListPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Annexure A":
            pdfBytes = await generateAnnexureAPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Board Resolution":
            pdfBytes = await generateBoardResolutionPdf(
              directorListData.value,
              corporateData,
              sealData
            );
            break;
          case "Equity":
            pdfBytes = await generateEquityPdf(sealData);
            break;
          case "FATCA":
            pdfBytes = await generateFatcaPdf(sealData);
            break;
          case "Commodity":
            pdfBytes = await generateCommodityPdf(sealData);
            break;
          case "KYC":
            pdfBytes = await generateKycPdf(directorListData.value);
            break;
          case "UBO":
            pdfBytes = await generateUboPdf(shareholdingPatternData.value);
            break;
        }
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    }
  } catch (error) {
    console.log("Error generating PDFs:", error);
  }
};
</script>

<template>
  <div class="corporate-form">
    <h1>Corporate Form Generator</h1>
    <form @submit.prevent="submitForm">
      <CorporateBasicDetails
        @update:corporateData="handleCorporateDataUpdate"
      />

      <div class="grid-layout">
        <Shareholders v-model:shareholders="shareholdingPatternData" />
        <Directors v-model:directors="directorListData" />
      </div>

      <div class="grid-layout">
        <Seal @update:sealData="handleSealDataUpdate" />
        <Documents
          @update:selectedDocuments="handleSelectedDocumentsUpdate"
          @update:formGenerationPreference="
            handleFormGenerationPreferenceUpdate
          "
        />
      </div>

      <button type="submit" class="submit-button">Generate</button>
    </form>
  </div>
</template>

<style scoped>
.corporate-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #283b49;
  margin-bottom: 20px;
}

.add-button,
.submit-button {
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

.add-button:hover,
.submit-button:hover {
  background-color: #1a2832;
}

.submit-button {
  margin-top: 30px;
  font-size: 18px;
  width: 50%;
  margin: 0 auto;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
