import { INotification } from "@/interfaces/INotification";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { GET_TASKS, POST_TASK, PUT_TASK } from "./type-actions";
import { NOTIFY, ADD_TASKS, ADD_TASK, EDIT_TASK } from "./type-mutations";
import http from "@/http";
import { project, StateProject } from "./modules/project";

export interface State {
  tasks: ITask[];
  notifications: INotification[];
  project: StateProject;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    notifications: [],
    project: {
      projects: [],
    },
  },
  mutations: {
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [ADD_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((tas) => tas.id == task.id);
      state.tasks[index] = task;
    },
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (notifica) => notifica.id != notification.id
        );
      }, 3000);
    },
  },
  actions: {
    [GET_TASKS]({ commit }) {
      http.get("tasks").then((res) => commit(ADD_TASKS, res.data));
    },
    [POST_TASK]({ commit }, task: ITask) {
      return http.post("/tasks", task).then((res) => {
        commit(ADD_TASK, res.data);
      });
    },
    [PUT_TASK]({ commit }, task: ITask) {
      return http
        .put(`/tasks/${task.id}`, task)
        .then((res) => commit("EDIT_TASK", res.data));
    },
  },
  modules: {
    project
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
