<script setup>
import { ref, computed, watch } from "vue";

const firstLine = ref("");
const secondLine = ref("");
const fontSize = ref(12);
const ddpiOffset = ref(0);

const sealData = computed(() => ({
  firstLine: firstLine.value,
  secondLine: secondLine.value,
  fontSize: fontSize.value,
  ddpiOffset: ddpiOffset.value,
}));

const emit = defineEmits(["update:sealData"]);

watch(
  [firstLine, secondLine, fontSize, ddpiOffset],
  () => {
    emit("update:sealData", sealData.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="seal-component">
    <h2>Seal Text</h2>
    <div class="content">
      <input type="text" v-model="firstLine" placeholder="Seal Line #1" />
      <input type="text" v-model="secondLine" placeholder="Seal Line #2" />
      <label for="fontSizeInput">Font Size:</label>
      <input
        id="fontSizeInput"
        type="number"
        v-model.number="fontSize"
        min="8"
        max="14"
        step="1"
        placeholder="Font Size"
      />
      <label for="ddpiOffsetInput">DDPI Offset:</label>
      <input
        id="ddpiOffsetInput"
        type="number"
        v-model.number="ddpiOffset"
        min="0"
        max="200"
        step="10"
        placeholder="DDPI Offset"
      />
    </div>
    <div class="seal-preview">
      <p>{{ firstLine }}</p>
      <br /><br />
      <p>{{ secondLine }}</p>
    </div>
  </div>
</template>

<style scoped>
.seal-component {
  margin-top: 20px;
}

.seal-component h2 {
  margin-bottom: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content input {
  font-size: 1.1em;
  padding: 10px 20px;
  display: inline-block;
  box-shadow: none;
}

.seal-preview {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px dotted black;
  padding: 10px;
  display: inline-block;
}

.seal-preview :deep(p) {
  text-align: right;
  font-weight: bold;
  line-height: normal;
}

input {
  padding: 5px;
}
</style>
