<template>
  <section>
    <strong class="display">{{ formattedTime }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerFormater",
  props: {
    timeSeconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedTime(): string {
      return new Date(this.timeSeconds * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>

<style scoped>
.display {
  color: var(--text-primary);
}
</style>
