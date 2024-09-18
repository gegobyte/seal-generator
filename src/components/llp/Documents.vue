<script setup>
import { ref, watch, onMounted } from "vue";

const DocumentsType = Object.freeze({
  Equity: "Equity",
  Fatca: "FATCA",
  Commodity: "Commodity",
  BoardResolution: "Board Resolution",
  Shareholders: "Shareholding Pattern",
  AnnexureA: "Annexure A",
  Kyc: "KYC",
  Ubo: "UBO",
});

const selectedDocuments = ref([
  DocumentsType.Equity,
  DocumentsType.Fatca,
  DocumentsType.BoardResolution,
  DocumentsType.Shareholders,
  DocumentsType.AnnexureA,
  DocumentsType.Kyc,
  DocumentsType.Ubo,
]);

const formGenerationPreference = ref("together");

const emit = defineEmits([
  "update:selectedDocuments",
  "update:formGenerationPreference",
]);

onMounted(() => {
  emit("update:selectedDocuments", selectedDocuments.value);
  emit("update:formGenerationPreference", formGenerationPreference.value);
});

watch(
  selectedDocuments,
  (newValue) => {
    emit("update:selectedDocuments", newValue);
  },
  { deep: true }
);

watch(formGenerationPreference, (newValue) => {
  emit("update:formGenerationPreference", newValue);
});
</script>

<template>
  <div class="corporate-documents">
    <h2>Documents</h2>
    <div class="checkbox-container">
      <label class="checkbox-label">
        <input type="checkbox" value="Equity" v-model="selectedDocuments" />
        Equity
      </label>
      <label class="checkbox-label">
        <input type="checkbox" value="FATCA" v-model="selectedDocuments" />
        FATCA
      </label>
      <label class="checkbox-label">
        <input type="checkbox" value="Commodity" v-model="selectedDocuments" />
        Commodity
      </label>
      <label class="checkbox-label">
        <input
          type="checkbox"
          value="Board Resolution"
          v-model="selectedDocuments"
        />
        Board Resolution
      </label>
      <label class="checkbox-label">
        <input
          type="checkbox"
          value="Shareholding Pattern"
          v-model="selectedDocuments"
        />
        Shareholding Pattern
      </label>
      <label class="checkbox-label">
        <input type="checkbox" value="Annexure A" v-model="selectedDocuments" />
        Annexure A
      </label>
      <label class="checkbox-label">
        <input type="checkbox" value="KYC" v-model="selectedDocuments" />
        KYC
      </label>
      <label class="checkbox-label">
        <input type="checkbox" value="UBO" v-model="selectedDocuments" />
        UBO
      </label>
    </div>

    <div class="form-generation-preference">
      <h3>Form Generation Preference</h3>
      <div class="radio-container">
        <label class="radio-label">
          <input
            type="radio"
            value="together"
            v-model="formGenerationPreference"
          />
          Together
        </label>
        <label class="radio-label">
          <input
            type="radio"
            value="separate"
            v-model="formGenerationPreference"
          />
          Separately
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.corporate-documents :deep(.checkbox-container) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: start;
}

.corporate-documents :deep(.checkbox-label) {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.corporate-documents :deep(.checkbox-label) input {
  margin-right: 5px;
}

.corporate-documents {
  margin-top: 20px;
}

.corporate-documents h2 {
  margin-bottom: 10px;
}

.form-generation-preference {
  margin-top: 20px;
}

.form-generation-preference h3 {
  margin-bottom: 10px;
}

.radio-container {
  display: flex;
  gap: 20px;
}

.radio-label {
  display: flex;
  align-items: center;
}

.radio-label input {
  margin-right: 5px;
}
</style>
