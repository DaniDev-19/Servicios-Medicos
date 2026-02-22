import React, { useState } from 'react';
import api from '../utils/instanceSesion';
import { useToast } from '../components/userToasd';
import icon from '../components/icon';
import styles from '../styles/valoracion.module.css';

function Valoracion() {
    const showToast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        puntuacion: 5,
        comentario: ''
    });

    const handleRating = (val) => {
        setFormData({ ...formData, puntuacion: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('valoracion/enviar', formData);
            showToast?.(res.data.message, "success");
            setFormData({ nombre: '', puntuacion: 5, comentario: '' });
        } catch (error) {
            console.error("Error enviando valoración:", error);
            showToast?.(error.response?.data?.message || "Error al enviar la valoración", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.valoracionPage}>
            {/* Sección Hero / Promo */}
            <section className={styles.promoCard}>
                <div className={styles.promoContent}>
                    <h1 className={styles.promoTitle}>Cuidarte Yutong</h1>
                    <p className={styles.promoText}>
                        Impulsando la salud y el bienestar de nuestra comunidad.
                        <strong> Cuidarte Yutong</strong> es más que un sistema, es nuestro compromiso con la excelencia médica y el cuidado humano.
                    </p>
                    <p className={styles.promoText} style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                        "Tu salud es nuestro motor, tu bienestar nuestro destino."
                    </p>
                </div>
                <img src={icon.pulso2} alt="Logo" className={styles.promoIcon} />
            </section>

            <div className={styles.contentGrid}>
                {/* Sección de Información / Beneficios */}
                <section className={styles.infoSection}>
                    <h2>¿Por qué Cuidarte Yutong?</h2>
                    <ul className={styles.featureList}>
                        <li className={styles.featureItem}>
                            <img src={icon.doctor} className={styles.featureIcon} alt="" />
                            <div>
                                <strong>Seguridad y Confianza</strong>
                                <p>Protegemos tus datos y los de tus pacientes con los más altos estándares.</p>
                            </div>
                        </li>
                        <li className={styles.featureItem}>
                            <img src={icon.cv3} className={styles.featureIcon} alt="" />
                            <div>
                                <strong>Atención Integral</strong>
                                <p>Desde consultas hasta seguimiento post-reposo, todo en un solo lugar.</p>
                            </div>
                        </li>
                        <li className={styles.featureItem}>
                            <img src={icon.bus2} className={styles.featureIcon} alt="" />
                            <div>
                                <strong>Eficiencia Operativa</strong>
                                <p>Optimizamos el tiempo de los doctores para que se enfoquen en lo que importa: Curar.</p>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Sección de Formulario */}
                <section className={styles.formSection}>
                    <h3>Valora el Proyecto</h3>
                    <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
                        Tu opinión es fundamental para seguir mejorando esta herramienta.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tu Nombre</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Ej. Dr. Rodriguez"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Calificación</label>
                            <div className={styles.ratingGroup}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={styles.starBtn}
                                        onClick={() => handleRating(star)}
                                        style={{ color: star <= formData.puntuacion ? '#FFD700' : '#ddd' }}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Comentarios o Sugerencias</label>
                            <textarea
                                className={styles.textarea}
                                rows="4"
                                placeholder="¿Qué te ha parecido el sistema? ¿En qué podemos mejorar?"
                                value={formData.comentario}
                                onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Valoración'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Valoracion;
