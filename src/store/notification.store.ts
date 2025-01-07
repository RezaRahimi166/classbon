import { Notification } from "@/types/notification.interface";
import { generateID } from "@/utils/string";
import { create } from "zustand";

type NotificationState = {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, "id">) => void;
  dissmissNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  showNotification: (notification) => {
    const id = generateID();
    set((state) => ({
      notifications: [...state.notifications, { id: id, ...notification }],
    }));

    setTimeout(() => {
      get().dissmissNotification(id);
    }, notification.duration);
  },
  dissmissNotification: (id) => {
    set((stata) => ({
      notifications: stata.notifications.filter((p) => p.id !== id),
    }));
  },
}));
