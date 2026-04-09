import "../App.css"

function GameStateModal({ showModal, setShowModal, article, link, date }) {
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
        background: '#fff',
        borderRadius: "16px",
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        padding: '30px',
        transform: 'translateY(0)',
        transition: 'transform 240ms ease-out, opacity 200ms ease-out',
        overflowY: 'auto',
        maxHeight: "80vh",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        borderRadius: '8px', 
        border: 'none', 
        background: '#FF6400', 
        color: '#fff',
        cursor: 'pointer',
        padding: '12px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '20px',
        width: '100%',
        transition: 'background 0.2s ease-in-out'
    };
    
    let displayTime = '';
    try {
        const stored = localStorage.getItem('mini-crossword-timer');
        const n = stored ? parseInt(stored, 10) : 0;
        const secs = isNaN(n) ? 0 : n;
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs - hours * 3600) / 60);
        const remainderSeconds = secs - 60 * minutes - 3600 * hours;

        let timeString = "";
        if (hours > 0) timeString += String(hours) + ":";
        timeString += (minutes < 10 ? "0" + minutes : minutes) + ":";
        timeString += (remainderSeconds < 10 ? "0" + remainderSeconds : remainderSeconds);
        displayTime = timeString;
    } catch (e) {
        displayTime = null;
    }

    return (
        <div style={overlayStyle} onClick={closeModal} role="dialog" aria-modal="true">
            <div style={sheetStyle} onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>Puzzle Complete!</h2>
                    <p style={{ margin: '0 0 5px 0', color: '#555' }}>You completed the Illini Mini in</p>
                    <p className="timer" style={{ fontSize: '36px', fontWeight: 'bold', color: '#FF6400', margin: '15px 0', justifyContent: 'center' }}>{displayTime}</p>
                    {article && link && (
                        <div style={{ marginTop: '25px', padding: '15px', background: '#f9f9f9', borderRadius: '12px', border: '1px solid #eaeaea', boxSizing: 'border-box' }}>
                            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Related to this puzzle</p>
                            <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#FF6400', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'block', lineHeight: '1.4' }}>{article}</a>
                        </div>
                    )}
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '20px', marginBottom: 0 }}>Week of {date}</p>
                </div>

                <button onClick={closeModal} style={buttonStyle}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default GameStateModal;