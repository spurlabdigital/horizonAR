<script setup>
import { ref } from 'vue'
import arrowIcon from '../../../assets/icons/arrow.svg'
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Verknüpfte Personen'
  }
})

const showList = ref(false)
function toggleList() {
  showList.value = !showList.value
}
</script>

<template>
  <div class="personenListe" v-if="true" :class="{ showList: showList }">
    <div class="headBar" @click="toggleList">
      <span>{{ props.name }}</span>
      <div class="arrow">
        <img :src="arrowIcon" alt="" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.personenListe {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.625rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  position: relative;
  max-height: 2.5rem;
  overflow: hidden;
  transition: all 250ms ease-in-out;
}
.headBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  min-height: 2.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  letter-spacing: 0.0525rem;
}
.showList {
  max-height: 20rem;
  overflow-y: scroll;
  transition: all 500ms ease-in-out;
}
.arrow {
  margin-right: 0.5rem;
  rotate: 90deg;
  opacity: 0.5;
  transition: all 250ms ease-in-out;
}
.showList .arrow {
  rotate: 270deg;
  transition: all 250ms ease-in-out;
}
</style>
