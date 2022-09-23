import IProject from "./IProject";

export default interface Task {
  duration: number;
  description: string;
  project: IProject;
}
