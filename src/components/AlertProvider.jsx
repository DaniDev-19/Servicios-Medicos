import { createContext, useContext, useState, useCallback, useRef } from 'react';
import '../styles/alert.css';

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([]);
    const timers = useRef({});

    const showAlert = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        setAlerts(prev => [...prev, { id, message, type }]);

        const t = setTimeout(() => {
            setAlerts(prev => prev.filter(alert => alert.id !== id));
            delete timers.current[id];
        }, duration);
        timers.current[id] = t;
        return id;
    }, []);

    const closeAlert = useCallback((id) => {
        clearTimeout(timers.current[id]);
        setAlerts(prev => prev.filter(a => a.id !== id));
        delete timers.current[id];
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, closeAlert }}>
            {children}
            <div className="alert-container">
                {alerts.map(alert => (
                    <div key={alert.id} className={`alert alert-${alert.type}`}>
                        {alert.message}
                        <button className="alert-close" onClick={() => closeAlert(alert.id)}>×</button>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
}

export const useAlertContext = () => useContext(AlertContext);