import { create } from 'zustand';
import { mockNotifications, Notification } from '../services/notificationService';

interface NotificationStore {
    notifications: Notification[];
    isNotificationOpen: boolean;
    setNotifications: (notifications: any[]) => void;
    setIsNotificationOpen: (isOpen: boolean) => void;
    handleMarkAsRead: (id: string) => void;
    handleMarkAllAsRead: () => void;
    handleDeleteNotification: (id: string) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: mockNotifications,
    isNotificationOpen: false,
    
    setNotifications: (notifications) => set({ notifications }),
    setIsNotificationOpen: (isOpen) => set({ isNotificationOpen: isOpen }),
    
    handleMarkAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    })),
    
    handleMarkAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
    })),
    
    handleDeleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
    })),
}));

export default useNotificationStore;
