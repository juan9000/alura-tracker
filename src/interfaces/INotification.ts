export enum TypeNotification {
  SUCESS,
  DANGER,
  WARN,
}

export interface INotification {
  title: string;
  text: string;
  type: TypeNotification;
  id: number;
}
