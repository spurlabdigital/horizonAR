<script setup>
import { useCmsStore } from '../../../js/cmsStore'
import AListEntry from '../../base/AListEntry.vue'

const cmsStore = useCmsStore()
const sites = cmsStore.getInfoSites
</script>

<template>
  <div class="list">
    <AListEntry key="hilfe" name="hilfe" :link="'hilfe'">Hilfe</AListEntry>
    <AListEntry
      v-for="infoSite in sites"
      :key="infoSite.id"
      :name="infoSite.name"
      :link="'info/' + infoSite.id.split('/').pop()"
      >{{ infoSite.name }}</AListEntry
    >
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 1rem;
  overflow: hidden;
  min-height: calc(100vh - 6rem);
}
</style>
