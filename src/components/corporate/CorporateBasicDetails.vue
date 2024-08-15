<script setup>
import { ref, computed, watch } from "vue";
const corporateName = ref("");
const address = ref("");
const mobileNumber = ref("");
const email = ref("");

const corporateData = computed(() => ({
  corporateName: corporateName.value,
  address: address.value,
  mobileNumber: mobileNumber.value,
  email: email.value,
}));

const emit = defineEmits(["update:corporateData"]);

watch(
  [corporateName, address, mobileNumber, email],
  () => {
    emit("update:corporateData", corporateData.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="corporate-details">
    <div class="grid-layout">
      <div class="form-group">
        <label for="corporateName">Corporate Name:</label>
        <input
          type="text"
          id="corporateName"
          v-model="corporateName"
          required
        />
      </div>

      <div class="form-group">
        <label for="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" v-model="mobileNumber" required />
      </div>
    </div>

    <div class="grid-layout">
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
