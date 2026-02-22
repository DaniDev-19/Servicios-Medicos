import { useToastContext } from "../utils/toastContext";

export function useToast() {
    const { showToast } = useToastContext();
    return showToast;
}
