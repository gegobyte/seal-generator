<script setup>
import { ref, watch } from "vue";

const directors = ref([]);

const emit = defineEmits(["update:directors"]);

const formatDateForInput = (date) => {
  if (!date) return "";
  const [day, month, year] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const formatDateForStorage = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
};

const addDirector = () => {
  directors.value.push({
    name: "",
    designation: "",
    dob: "",
    pan: "",
    din: "",
    isAuthorizedSignatory: false,
  });
  emit("update:directors", directors.value);
};

const deleteDirector = (index) => {
  directors.value.splice(index, 1);
  if (directors.value[index]?.isAuthorizedSignatory) {
    directors.value.forEach(
      (director) => (director.isAuthorizedSignatory = false)
    );
  }
  emit("update:directors", directors.value);
};

const setAuthorizedSignatory = (index) => {
  directors.value.forEach((director, i) => {
    director.isAuthorizedSignatory = i === index;
  });
  emit("update:directors", directors.value);
};

const updateDob = (index, value) => {
  directors.value[index].dob = value ? formatDateForStorage(value) : "";
};

watch(
  directors,
  (newValue) => {
    emit("update:directors", newValue);
  },
  { deep: true }
);
</script>

<template>
  <div class="directors-section">
    <h2 class="directors-heading">Directors</h2>
    <div
      v-for="(director, index) in directors"
      :key="`director-${index}`"
      class="director-form"
    >
      <h3>Director {{ index + 1 }}</h3>
      <div class="form-group">
        <label :for="`directorName-${index}`">Name:</label>
        <input
          type="text"
          :id="`directorName-${index}`"
          v-model="director.name"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`directorDesignation-${index}`">Designation:</label>
        <input
          type="text"
          :id="`directorDesignation-${index}`"
          v-model="director.designation"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`directorDOB-${index}`">Date of Birth:</label>
        <input
          type="date"
          :id="`directorDOB-${index}`"
          :value="formatDateForInput(director.dob)"
          @input="updateDob(index, $event.target.value)"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`directorPAN-${index}`">PAN Number:</label>
        <input
          type="text"
          :id="`directorPAN-${index}`"
          v-model="director.pan"
          required
        />
      </div>
      <div class="form-group">
        <label :for="`directorDIN-${index}`">DIN Number:</label>
        <input
          type="text"
          :id="`directorDIN-${index}`"
          v-model="director.din"
          required
        />
      </div>
      <div class="form-group authorized-signatory-radio">
        <label :for="`directorIsAuthorizedSignatory-${index}`"
          >Is Authorized Signatory:</label
        >
        <input
          type="radio"
          :id="`directorIsAuthorizedSignatory-${index}`"
          :name="'authorizedSignatory'"
          :checked="director.isAuthorizedSignatory"
          @change="setAuthorizedSignatory(index)"
        />
      </div>

      <button
        type="button"
        @click="deleteDirector(index)"
        class="delete-button"
      >
        Delete Director
      </button>
    </div>
    <button type="button" @click="addDirector" class="add-button">
      Add Director
    </button>
  </div>
</template>

<style scoped>
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

.director-form {
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

.directors-heading {
  margin-top: 30px;
}

.authorized-signatory-radio {
  display: flex;
  align-items: center;
}
</style>
