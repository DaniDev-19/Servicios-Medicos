import { useState, useCallback, useEffect } from 'react';
import '../styles/toasd.css';
import { subscribeToGlobalNotifications } from '../utils/globalNotification';
import { ToastContext } from '../utils/toastContext';

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, duration);
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToGlobalNotifications((message, type, duration) => {
            showToast(message, type, duration);
        });
        return () => unsubscribe();
    }, [showToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        <span>{toast.message}</span>
                        <div
                            className="toast-progress"
                            style={{ animationDuration: `${toast.duration}ms` }}
                        ></div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export default ToastProvider;
