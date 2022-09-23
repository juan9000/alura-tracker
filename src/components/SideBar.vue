<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Track" />
    </h1>
    <button class="button" @click="changeTheme()">
      {{ buttonText }}
    </button>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"> Tasks </i>
          </router-link>
        </li>

        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram"> Projects </i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["onChangeTheme"],

  data() {
    return {
      darkModeActive: false,
    };
  },

  computed: {
    buttonText() {
      if (this.darkModeActive) {
        return "White Mode";
      }
      return "Dark Mode";
    },
  },

  methods: {
    changeTheme() {
      console.log("test");
      this.darkModeActive = !this.darkModeActive;
      this.$emit("onChangeTheme", this.darkModeActive);
    },
  },
});
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

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
