export const usePermiso = () => {
    const permisos =
        typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('user'))?.permisos || {})
        : {};

        return (pantalla, accion) => {
            if(!permisos[pantalla]) return false;
            return !!permisos[pantalla][accion];
        };
};