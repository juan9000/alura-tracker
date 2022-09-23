<template>
  <TaskBox>
    <div class="columns">
      <div class="column is-7">
        {{ task.description || "Task without description." }}
      </div>
      <div class="column is-4">
        {{ task.project?.name || 'No project' }}
      </div>
      <div class="column">
        <TimerFormater :time-seconds="task.duration" />
      </div>
    </div>
  </TaskBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TimerFormater from "./TimerFormater.vue";
import TaskBox from "./TaskBox.vue";

import ITask from "../interfaces/ITask";

export default defineComponent({
  name: "TaskCard",

  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },

  components: {
    TimerFormater,
    TaskBox,
  },
});
</script>
