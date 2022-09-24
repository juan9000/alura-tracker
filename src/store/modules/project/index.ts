import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import {
  GET_PROJECTS,
  POST_PROJECT,
  PUT_PROJECT,
  DELETE_PROJECT,
} from "@/store/type-actions";
import {
  ADD_PROJECT,
  ADD_PROJECTS,
  EDIT_PROJECT,
  DEL_PROJECT,
} from "@/store/type-mutations";
import { Module } from "vuex";

export interface StateProject {
  projects: IProject[];
}

export const project: Module<StateProject, State> = {
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
  },
};
