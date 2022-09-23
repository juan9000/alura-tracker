<template>
  <section>
    <TaskForm @saveTask="saveTask" />
    <div class="list">
      <TaskBox v-if="noTask"> Any task to display ;-; </TaskBox>

      <TaskCard
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @taskClicked="selectTask"
      />

      <div
        v-if="selectedTask"
        class="modal"
        :class="{ 'is-active': selectedTask }"
      >
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Task</p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal"
            ></button>
          </header>

          <section class="modal-card-body">
            <div class="field">
              <label for="taskDescription" class="label">
                Task Description
              </label>
              <input
                type="text"
                class="input"
                v-model="selectedTask.description"
              />
            </div>
          </section>

          <footer class="modal-card-foot">
            <button class="button is-success">Save Task</button>
            <button class="button" @click="closeModal">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import TaskForm from "../components/TaskForm.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskBox from "../components/TaskBox.vue";
import { useStore } from "@/store";
import { GET_PROJECTS, GET_TASKS, POST_TASK } from "@/store/type-actions";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "Tasks",

  components: {
    TaskForm,
    TaskCard,
    TaskBox,
  },

  data() {
    return {
      selectedTask: null as ITask | null,
    };
  },

  computed: {
    noTask(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    saveTask(task: ITask): void {
      this.store.dispatch(POST_TASK, task);
    },
    selectTask(task: ITask) {
      this.selectedTask = task;
    },
    closeModal() {
      this.selectedTask = null;
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    return {
      tasks: computed(() => store.state.tasks),
      store,
    };
  },
});
</script>
