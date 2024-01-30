<script setup>
import { useCmsStore } from '../../../js/cmsStore'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import blocks_image from '../../blocks/image.vue'
import blocks_text from '../../blocks/text.vue'
import blocks_quelle from '../../blocks/quelle.vue'

const cmsStore = useCmsStore()
const route = useRoute()
let content = {}
onBeforeMount(() => {
  if (route.params.id) {
    content = cmsStore.getInfoSites.find((place) => {
      const cleandId = place.id.split('/').pop()
      return cleandId === route.params.id
    })
  }
})

const components = {
  image: blocks_image,
  text: blocks_text,
  quelle: blocks_quelle
}
</script>

<template>
  <div class="PersonPanel">
    <div class="Name">
      {{ content.name }}
    </div>
    <component
      v-for="block in content.blocks"
      :is="components[block.type]"
      :key="block.id"
      :content="block"
    />

    <div class="addSpace" />
  </div>
</template>

<style scoped>
.PersonPanel {
}

.Name {
  color: var(--middleGrey);
  padding: 1rem;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  max-width: calc(100% - 5rem);
  letter-spacing: 0.065rem;
}
</style>
