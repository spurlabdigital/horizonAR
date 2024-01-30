<template>
  <div class="quelle" v-html="text" />
</template>

<script>
export default {
  name: 'blocks_quelle',
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
.quelle {
  color: var(--middleGrey);
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: normal;
  max-width: 90%;
  line-break: anywhere;
  line-height: 140.523%; /* 1.22956rem */
}
</style>
