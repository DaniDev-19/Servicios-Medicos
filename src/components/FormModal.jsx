import React from "react";
import styles from "../styles/modal.module.css";

function FormModal({
  isOpen,
  onClose,
  title = "",
  children,
  animation = "fade",
  width = "",
  showClose = true,
  className = "",
  size = "normal"
}) {
  if (!isOpen) return null;

  const contentClass = size === "pdf" ? styles["modal-pdf"] : (className || styles["modal-content"]);

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={`${contentClass} ${styles[animation] || ""}`}
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          {showClose && (
            <button className="btn btn-xs btn-outline" onClick={onClose}>
              ✖
            </button>
          )}
        </div>
        <div className={styles["modal-body"]}>{children}</div>
      </div>
    </div>
  );
}

export default FormModal;