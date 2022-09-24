import IProject from "./IProject";

export default interface Task {
  id: number;
  duration: number;
  description: string;
  project: IProject;
}
