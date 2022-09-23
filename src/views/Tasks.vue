<template>
  <section>
    <TaskForm @saveTask="saveTask" />
    <div class="list">
      <TaskBox v-if="noTask"> Any task to display ;-; </TaskBox>

      <TaskCard v-for="(task, index) in tasks" :key="index" :task="task" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TaskForm from "../components/TaskForm.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskBox from "../components/TaskBox.vue";

import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "Tasks",

  components: {
    TaskForm,
    TaskCard,
    TaskBox,
  },

  data() {
    return {
      tasks: [] as ITask[],
    };
  },

  computed: {
    noTask(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task);
    },
  },
});
</script>
