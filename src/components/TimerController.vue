<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerFormater :time-seconds="timeSeconds" />

    <button class="button" @click="start" :disabled="counting">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>

    <button class="button" @click="stop" :disabled="!counting">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TimerFormater from "./TimerFormater.vue";

export default defineComponent({
  name: "TimerController",

  emits: ["timerStoped"],

  components: {
    TimerFormater,
  },

  data() {
    return {
      timeSeconds: 0,
      timer: 0,
      counting: false,
    };
  },

  methods: {
    start() {
      this.counting = true;
      this.timer = setInterval(() => {
        this.timeSeconds++;
      }, 1000);
    },

    stop() {
      this.counting = false;
      clearInterval(this.timer);
      this.$emit("timerStoped", this.timeSeconds);
      this.timeSeconds = 0;
    },
  },
});
</script>
