import { TypeNotification } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/type-mutations";

type Noticator = {
  notify: (type: TypeNotification, title: string, text: string) => void;
};

export default (): Noticator => {
  const notify = (
    type: TypeNotification,
    title: string,
    text: string
  ): void => {
    store.commit(NOTIFY, {
      title,
      text,
      type,
    });
  };

  return {
    notify,
  };
};
