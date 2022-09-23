<template>
  <section class="projects">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>
            {{ project.id }}
          </td>
          <td>
            {{ project.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "Projects", 
  setup() {
    const store = useStore();

    return {
      projects: computed(() => store.state.projects)
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
