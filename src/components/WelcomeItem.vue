<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h2>
        <slot name="heading"></slot>
      </h2>
      <div class="content-wrapper">
        <slot name="content"></slot>
      </div>
      <div class="seal-preview-wrapper">
        <div id="seal-container"><slot name="seal-preview"></slot></div>
      </div>
      <div class="account-type-wrapper">
        <slot name="account-type"></slot>
      </div>
      <div class="documents-wrapper">
        <slot name="documents"></slot>
      </div>
      <div class="generate-button-wrapper">
        <slot name="generate-button"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h2 {
  margin-bottom: 15px;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.content-wrapper,
.generate-button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the space between items */
}

.generate-button-wrapper {
  margin-top: 30px;
}

.generate-button-wrapper :deep(button) {
  font-size: 1.1em;
  width: 30%;
  padding: 10px 20px;
  display: inline-block;
  background-color: #283b49;
  color: white;
  border: 1px solid transparent; /* Adjusts the border */
  box-shadow: none;
}

.content-wrapper :deep(input) {
  font-size: 1.1em;
  padding: 10px 20px;
  display: inline-block;
  box-shadow: none;
}

.seal-preview-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px dotted black;
  padding: 10px;
  display: inline-block;
}

.seal-preview-wrapper :deep(p) {
  text-align: right;
  font-weight: bold;
  line-height: normal;
}

.account-type-wrapper :deep(h3) {
  margin-bottom: 8px;
}

.account-type-wrapper :deep(.radio-buttons-container) {
  display: flex; /* Align radio buttons in a row */
  align-items: center; /* Center-align items vertically */
}

.account-type-wrapper :deep(.radio-button-label) {
  margin-right: 20px; /* Add some space between the radio buttons */
}

.documents-wrapper {
  margin-top: 20px;
}

.documents-wrapper :deep(h3) {
  margin-bottom: 8px;
}

.documents-wrapper :deep(.checkbox-container) {
  display: flex; /* Align radio buttons in a row */
  align-items: center; /* Center-align items vertically */
}

.documents-wrapper :deep(.checkbox-label) {
  margin-right: 20px; /* Add some space between the radio buttons */
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
