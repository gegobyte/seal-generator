<template>
  <header>
    <img
      alt="Form Generator logo"
      class="logo"
      src="../assets/form-generator-icon.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <div class="greetings">
        <h1 class="green">Non-Individual Form Generator</h1>
        <h3>
          Generate forms for equity, commodity, annexures for HUF, Corporate and
          other non-individual accounts with text based seal.
        </h3>
      </div>
    </div>
  </header>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  color: #283b49;
}

h3 {
  font-size: 1.2rem;
  color: #c89886;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
