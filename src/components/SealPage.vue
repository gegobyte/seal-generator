<script setup>
import { ref } from "vue";
const isGenerating = ref(false);
const generateSealPage = () => {
  console.log("Button clicked");
};
</script>

<template>
  <div class="generate-button">
    <button @click="generateSealPage" :disabled="isGenerating">
      <span v-if="!isGenerating">Generate</span>
      <span v-else class="loader"></span>
    </button>
  </div>
</template>

<style scoped>
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
</style>
