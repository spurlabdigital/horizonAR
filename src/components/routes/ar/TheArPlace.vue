<script setup>
import RedPanel from '../../base/ARedPanel.vue'
import APanelHeader from '../../base/ARedPanelHeader.vue'
import AViewMore from './AViewMore.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCmsStore } from '../../../js/cmsStore'
import ADropDownContainer from './ADropDownContainer.vue'
import ALinkPersonButtons from './ALinkPersonButtons.vue'

const route = useRoute()

const activePlace = computed(() => {
  return route.params.id
})

const cms = useCmsStore()
const placeName = cms.getPlacesBySubID(activePlace.value).name

const router = useRouter()
function doClose() {
  router.push({ name: 'horizon' })
}
</script>

<template>
  <RedPanel class="SinglePlace" @close="doClose">
    <APanelHeader :text="placeName" />
    <AViewMore :to="'/place/' + activePlace" />
    <ADropDownContainer>
      <ALinkPersonButtons :placeID="activePlace" link="horizon-biography" />
    </ADropDownContainer>
  </RedPanel>
</template>

<style scoped>
.SinglePlace {
  align-items: start;
}
</style>
