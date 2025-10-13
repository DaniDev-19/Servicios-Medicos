import '../styles/card.css';

function BaseCard({ children, onClick, color, title }) {
    return (
        <section className='card-container'>
            <div className="card" onClick={onClick} style={{ backgroundColor: color}} title={title}>
                {children}
            </div>
        </section>
    );
}

export default BaseCard;
