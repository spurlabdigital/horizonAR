<template>
  <div class="text" v-html="text" />
</template>

<script>
export default {
  name: 'blocks_text',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    text() {
      return this.content.content.text
    }
  }
}
</script>

<style scoped>
.text {
  padding: 1rem;
  margin-bottom: 1rem;
  color: var(--middleGrey);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140.523%; /* 1.22956rem */
  letter-spacing: 0.0525rem;
}
</style>
