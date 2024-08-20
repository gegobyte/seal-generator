<script setup>
import { ref, watch } from "vue";

const directors = ref([]);

const emit = defineEmits(["update:directors"]);

const addDirector = () => {
  directors.value.push({
    name: "",
    designation: "",
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
    <h2 class="directors-heading">Partners</h2>
    <div
      v-for="(director, index) in directors"
      :key="`director-${index}`"
      class="director-form"
    >
      <h3>Partner {{ index + 1 }}</h3>
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
        Delete Partner
      </button>
    </div>
    <button type="button" @click="addDirector" class="add-button">
      Add Partner
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
