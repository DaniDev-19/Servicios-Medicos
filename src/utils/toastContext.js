import { createContext, useContext } from 'react';

export const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);
