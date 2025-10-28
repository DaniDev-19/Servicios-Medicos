import React, { useState } from 'react';
import styles from './ayudatooltip.module.css';
import icon from '../iconos/iconos'; 

function AyudaTooltip({ descripcion }) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className={styles.ayudaContainer}
            tabIndex={0}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={() => setVisible(v => !v)}
            onBlur={() => setVisible(false)}
        >
            <img src={icon.question} alt="Ayuda" className={styles.iconoAyuda} />
            {visible && (
                <div className={styles.tooltip}>
                    {descripcion}
                </div>
            )}
        </div>
    );
}

export default AyudaTooltip;