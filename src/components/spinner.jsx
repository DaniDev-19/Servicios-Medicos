import '../styles/loader.css';


function Spinner({
  size = 50,
  color = "",
  ariaLabel = "Cargando",
  label = "Procesando Solicitud...",
  inline = false,
  children
}) {
  const text = children ?? label;
  const px = (v) => (typeof v === "number" ? `${v}px` : v);
  const isColumn = !inline && !!text;

  return (
    <div
      className={`spinner-wrapper ${inline ? "spinner-inline" : ""} ${isColumn ? "spinner-column" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      style={{ gap: isColumn ? 8 : (text ? 10 : 0) }}
    >
      <div
        className="spinner"
        style={{
          width: px(size),
          height: px(size),
          borderTopColor: color
        }}
      />
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
}

export default Spinner;