import "../App.css"

function GameStateModal({ showModal, setShowModal, article, link }) {
    function closeModal() {
        setShowModal(false);
    }

    if (!showModal) return null;

    const overlayStyle = {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center', // center vertically
        justifyContent: 'center', // center horizontally
        zIndex: 1000,
        padding: '20px',
    };

    const sheetStyle = {
        width: '100%',
        maxWidth: 680,
        background: '#fff',
        borderRadius: "1rem",
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        padding: '20px',
        transform: 'translateY(0)',
        transition: 'transform 240ms ease-out, opacity 200ms ease-out',
        maxHeight: '80vh',
        overflowY: 'auto',
    };

    return (
        <div style={overlayStyle} onClick={closeModal} role="dialog" aria-modal="true">
            <div style={sheetStyle} >
                <div className="modal">
                    <p>You Win!</p>
                    <p>RELATED TO THIS PUZZLE: </p>
                    <a  href={link}>{article}</a>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button onClick={closeModal} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #ccc', background: '#f7f7f7', cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameStateModal;