<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Track">
    </h1>
    <button class="button" @click="changeTheme()">
      {{ buttonText }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  emits: ['onChangeTheme'],

  data () {
    return {
      darkModeActive: false
    }
  },

  computed: {
    buttonText () {
      if (this.darkModeActive) {
        return 'White Mode'
      }
      return 'Dark Mode'
    }
  },

  methods: {
    changeTheme () {
      console.log('test')
      this.darkModeActive = !this.darkModeActive
      this.$emit('onChangeTheme',  this.darkModeActive)
    }
  }
})

</script>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
