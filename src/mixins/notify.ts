import { TypeNotification } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/type-mutations";
import { store } from "@/store";

export const notificationMixin = {
  methods: {
    notify(type: TypeNotification, title: string, text: string): void {
      store.commit(NOTIFY, {
        title,
        text,
        type,
      });
    },
  },
};
