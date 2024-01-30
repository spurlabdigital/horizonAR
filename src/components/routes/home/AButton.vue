<script setup>
//add props
const props = defineProps({
  text: String
})
</script>

<template>
  <div class="AButton">
    <span>{{ props.text }}</span>
    <img class="arrow" src="../../../assets/icons/arrow.svg" />
  </div>
</template>

<style scoped>
.AButton {
  width: fit-content;
  margin: 2rem auto;
  padding: 1rem 2rem;
  height: 3.25rem;
  background: #ff9c7a;
  position: relative;
  color: #4b4b4b;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.075rem;
  border-radius: 0.9375rem;
  display: flex;
  justify-items: center;
  align-items: center;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
}

.arrow {
  margin-left: 2rem;
  height: 1rem;
}
</style>
