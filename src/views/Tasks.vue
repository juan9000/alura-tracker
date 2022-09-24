<template>
  <section>
    <TaskForm @saveTask="saveTask" />
    <div class="list">
      <TaskBox v-if="noTask"> Any task to display ;-; </TaskBox>

      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Search Tasks"
            v-model="filter"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>

      <TaskCard
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @taskClicked="selectTask"
      />

      <Modal :show="selectedTask != null">
        <template v-slot:header>
          <p class="modal-card-title">Edit Task</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </template>

        <template v-slot:section>
          <div class="field">
            <label for="taskDescription" class="label">
              Task Description
            </label>
            <input
              v-if="selectedTask"
              type="text"
              class="input"
              v-model="selectedTask.description"
            />
          </div>
        </template>

        <template v-slot:footer>
          <button class="button is-success" @click="editTask">Save Task</button>
          <button class="button" @click="closeModal">Cancel</button>
        </template>
      </Modal>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

import TaskForm from "../components/TaskForm.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskBox from "../components/TaskBox.vue";
import Modal from "../components/Modal.vue";
import { useStore } from "@/store";
import {
  GET_PROJECTS,
  GET_TASKS,
  POST_TASK,
  PUT_TASK,
} from "@/store/type-actions";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "Tasks",

  components: {
    TaskForm,
    TaskCard,
    TaskBox,
    Modal
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
    editTask() {
      this.store
        .dispatch(PUT_TASK, this.selectedTask)
        .then(() => this.closeModal());
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

    const filter = ref("");

    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value);
      console.log(filter.value);
    });

    return {
      tasks: computed(() => store.state.tasks),
      store,
      filter,
    };
  },
});
</script>
