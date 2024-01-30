<template>
  <img :src="imageSrc" :alt="imageAlt" v-if="imageSrc" />
</template>

<script>
export default {
  name: 'blocks_image',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageSrc() {
      if (this.content.content.image) {
        const imageID = this.content.content.image[0].split('/').pop()
        const magicPath = globalSettings.cmsURL + '@/file/'
        return magicPath + imageID
      } else {
        return null
      }
    },
    imageAlt() {
      return this.content.content.alt
    }
  }
}
</script>

<style scoped>
img {
  width: calc(100% + 2rem);
  max-width: calc(100% + 2rem);
  margin-left: -1rem;
  height: auto;
}
</style>
