// import React, { useState} from 'react';
import styles from './tabsFiltro.module.css';

function TabsFiltro({ tabs, activeTab, onTabClick, /*showTitle = true */}) {
    // const [visible, setVisible] = useState(false);

    return (
        <div className={styles.tabsGeneralContainer}>
            {/* <button
                className={styles.toggleTabsButton}
                onClick={() => setVisible(v => !v)}
                type="button"
            >
                {visible ? 'Ocultar secciones' : 'Mostrar secciones'}
            </button> */}
            {/* <div className={`${styles.tabsContent} ${!visible ? styles.tabsContentHidden : ''}`}> */}
                {/* {showTitle && <h3 className={styles.tabsTitle}>Apartados Principales</h3>} */}
                <div className={styles.tabsContainer}>
                    {tabs.map((tab, idx) => (
                        <button
                            key={`${tab.key}-${idx}`}
                            className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
                            onClick={() => onTabClick(tab)}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            {/* </div> */}
        </div>
    );
}

export default TabsFiltro;