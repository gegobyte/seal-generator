<script setup>
import Seal from "../common/Seal.vue";
import Shareholders from "./Shareholders.vue";
import Directors from "./Directors.vue";
import Documents from "./Documents.vue";
import CorporateBasicDetails from "./CorporateBasicDetails.vue";
import { ref, computed, watch } from "vue";

const submitForm = () => {};
</script>

<template>
  <div class="corporate-form">
    <h1>Corporate Form Generator</h1>
    <form @submit.prevent="submitForm">
      <CorporateBasicDetails />

      <div class="grid-layout">
        <Shareholders />
        <Directors />
      </div>

      <div class="grid-layout">
        <Seal />
        <Documents />
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
