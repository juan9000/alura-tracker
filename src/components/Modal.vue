<template>
  <div v-if="show" class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" />
    <div class="modal-card">
      <header name="header" class="modal-card-head">
        <slot name="header" />
      </header>
      <section name="section" class="modal-card-body">
        <slot name="section" />
      </section>
      <footer name="footer" class="modal-card-foot">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
