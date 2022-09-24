<template>
  <div class="box form">
    <div class="columns">
      <div
        class="column is-5"
        role="forn"
        aria-label="Form to create a new task"
      >
        <input
          type="text"
          class="input"
          placeholder="Which task do you whant to start?"
          v-model="description"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option value="">Select a project</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TimerController @timerStoped="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import TimerController from "./TimerController.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "TaskForm",
  emits: ["saveTask"],
  components: {
    TimerController,
  },

  setup(props, { emit }) {
    const store = useStore(key);
    const description = ref("");
    const idProject = ref("");

    const projects = computed(() => store.state.project.projects);

    const finishTask = (time: number): void => {
      emit("saveTask", {
        duration: time,
        description: description.value,
        project: projects.value.find(
          (project) => project.id === idProject.value
        ),
      });

      description.value = "";
    };

    return {
      description,
      idProject,
      projects,
      finishTask,
    };
  },
});
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
