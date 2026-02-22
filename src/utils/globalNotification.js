// Bus de eventos simple para notificaciones globales fuera de React
const listeners = new Set();

export const notifyGlobal = (message, type = 'info', duration = 4000) => {
    listeners.forEach(listener => listener(message, type, duration));
};

export const subscribeToGlobalNotifications = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};
