<template>
  <span ref="editable" contenteditable="true" v-on="listeners" />
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component('editable-span', {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (e: InputEvent) => this.$emit('input', e.target.innerText)
      };
    },
  },
  mounted() {
    (this.$refs.editable as HTMLSpanElement).innerText = this.value;
  },
});
</script>
