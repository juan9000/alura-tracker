import { INotification } from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  GET_PROJECTS,
  POST_PROJECT,
  PUT_PROJECT,
  DELETE_PROJECT,
  GET_TASKS,
  POST_TASK,
} from "./type-actions";
import {
  ADD_PROJECT,
  ADD_PROJECTS,
  EDIT_PROJECT,
  DEL_PROJECT,
  NOTIFY,
  ADD_TASKS,
  ADD_TASK,
} from "./type-mutations";
import http from "@/http";

interface State {
  tasks: ITask[];
  projects: IProject[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    tasks: [],
    projects: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName,
      } as IProject;
      state.projects.push(project);
    },
    [ADD_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((proj) => proj.id == project.id);
      state.projects[index] = project;
    },
    [DEL_PROJECT](state, id: string) {
      state.projects = state.projects.filter((proj) => proj.id != id);
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [ADD_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
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
    [GET_PROJECTS]({ commit }) {
      http.get("projects").then((res) => commit(ADD_PROJECTS, res.data));
    },
    [POST_PROJECT](context, projectName: string) {
      return http.post("/projects", {
        name: projectName,
      });
    },
    [PUT_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [DELETE_PROJECT]({ commit }, id: string) {
      return http.delete(`/projects/${id}`).then(() => {
        commit(DEL_PROJECT, id);
      });
    },
    [GET_TASKS]({ commit }) {
      http.get("tasks").then((res) => commit(ADD_TASKS, res.data));
    },
    [POST_TASK]({ commit }, task: ITask) {
      return http.post("/tasks", task).then((res) => {
        commit(ADD_TASK, res.data);
      });
    },
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
