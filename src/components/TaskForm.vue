<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-8" role="forn" aria-label="Form to create a new task">
        <input
          type="text"
          class="input"
          placeholder="Which task do you whant to start?"
          v-model="description"
        >
      </div>

      <div class="column">
        <TimerController @timerStoped="finishTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts"> 
import { defineComponent } from 'vue'

import TimerController from './TimerController.vue'

export default defineComponent({
  name: 'TaskForm',

  emits: ['saveTask'],

  components: {
    TimerController
  },

  data () {
    return {
      description: ''
    }
  },

  methods: {
    finishTask (time: number) : void {
      this.$emit('saveTask', {
        duration: time,
        description: this.description
      })

      this.description = ''
    }
  }
})

</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
