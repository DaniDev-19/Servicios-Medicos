import icon from "../components/icon";
import styles from "../styles/error.module.css";
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className={styles.errorContainer}>
            <img src={icon.error} alt="Error 404" className={styles.errorImage} />
            <h1 className={styles.errorTitle}>404 -- Página no encontrada</h1>
            <p className={styles.errorMessage}>
                lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <Link to="/admin" className={styles.homeButton}>
                Volver al inicio
            </Link>
        </div>
    );
}

export default Error;