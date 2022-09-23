<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{'dark-mode': darkModeActive}"
  >
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <TaskForm @saveTask="saveTask" />
      <div class="list">
        <TaskCard
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
        />
        <TaskBox v-if="noTask">
          Any task to display ;-;
        </TaskBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

import SideBar from './components/SideBar.vue'
import TaskForm from './components/TaskForm.vue'
import TaskCard from './components/TaskCard.vue'
import TaskBox from './components/TaskBox.vue'

import ITask from './interfaces/ITask'

export default defineComponent({
  name: 'App',

  components: {
    SideBar,
    TaskForm,
    TaskCard,
    TaskBox
  },

  data () {
    return {
      tasks: [] as ITask[],
      darkModeActive: false
    }
  },

  computed: {
    noTask () : boolean {
      return this.tasks.length === 0
    }
  },

  methods:{
    saveTask (task: ITask) {
      this.tasks.push(task)
    },

    changeTheme (darkModeActive: boolean) {
      this.darkModeActive = darkModeActive
    }
  },
})
</script> 

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd
}

.content {
  background-color: var(--bg-primary)
}
</style>
