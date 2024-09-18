<script setup>
import { ref, watch } from "vue";
const shareholders = ref([]);

const emit = defineEmits(["update:shareholders"]);

const addShareholder = () => {
  shareholders.value.push({
    name: "",
    shares: 0,
    faceValue: 0,
    totalValue: 0,
    percentage: 0,
    isPercentageManual: false,
  });
  emit("update:shareholders", shareholders.value);
};

const calculateShareholderValues = () => {
  const total = shareholders.value.reduce(
    (sum, shareholder) => sum + Number(shareholder.shares),
    0
  );

  if (total > 0) {
    let remainingPercentage = 100;
    shareholders.value.forEach((shareholder, index) => {
      shareholder.totalValue = shareholder.shares * shareholder.faceValue;

      if (!shareholder.isPercentageManual) {
        if (index === shareholders.value.length - 1) {
          shareholder.percentage = Number(remainingPercentage.toFixed(2));
        } else {
          const exactPercentage = (shareholder.shares / total) * 100;
          shareholder.percentage = Number(exactPercentage.toFixed(2));
          remainingPercentage -= shareholder.percentage;
        }
      }
    });
  } else {
    shareholders.value.forEach((shareholder) => {
      shareholder.totalValue = 0;
      if (!shareholder.isPercentageManual) {
        shareholder.percentage = 0;
      }
    });
  }
};

const deleteShareholder = (index) => {
  shareholders.value.splice(index, 1);
  calculateShareholderValues();
  emit("update:shareholders", shareholders.value);
};

const handlePercentageChange = (index) => {
  shareholders.value[index].isPercentageManual = true;
  emit("update:shareholders", shareholders.value);
};

watch(
  shareholders,
  () => {
    calculateShareholderValues();
    emit("update:shareholders", shareholders.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="shareholders-section">
    <h2 class="shareholder-heading">Shareholders</h2>
    <div
      v-for="(shareholder, index) in shareholders"
      :key="`shareholder-${index}`"
      class="shareholder-form"
    >
      <h3>Shareholder {{ index + 1 }}</h3>
      <div class="form-group">
        <label :for="`shareholderName-${index}`">Name:</label>
        <input
          type="text"
          :id="`shareholderName-${index}`"
          v-model="shareholder.name"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`shareholderShares-${index}`"
          >Number of Equity Shares:</label
        >
        <input
          type="number"
          :id="`shareholderShares-${index}`"
          v-model="shareholder.shares"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`shareholderFaceValue-${index}`"
          >Face Value per Share:</label
        >
        <input
          type="number"
          :id="`shareholderFaceValue-${index}`"
          v-model="shareholder.faceValue"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`shareholderTotalValue-${index}`">Total Value:</label>
        <input
          type="number"
          :id="`shareholderTotalValue-${index}`"
          v-model="shareholder.totalValue"
          readonly
        />
      </div>
      <div class="form-group">
        <label :for="`shareholderPercentage-${index}`"
          >Percentage of Holding:</label
        >
        <input
          type="number"
          step="0.01"
          :id="`shareholderPercentage-${index}`"
          v-model="shareholder.percentage"
          @input="handlePercentageChange(index)"
        />
      </div>
      <button
        type="button"
        @click="deleteShareholder(index)"
        class="delete-button"
      >
        Delete Shareholder
      </button>
    </div>
    <button type="button" @click="addShareholder" class="add-button">
      Add Shareholder
    </button>
  </div>
</template>

<style scoped>
.shareholder-form {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.add-button {
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

.add-button:hover {
  background-color: #1a2832;
}

.shareholder-heading {
  margin-top: 30px;
}

h1,
h2 {
  color: #283b49;
  margin-bottom: 20px;
}

h3 {
  color: #283b49;
  margin-top: 15px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #283b49;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

textarea {
  height: 100px;
  resize: vertical;
}
</style>
