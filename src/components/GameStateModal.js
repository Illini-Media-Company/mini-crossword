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
        borderRadius: "1rem",
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        padding: '20px',
        transform: 'translateY(0)',
        transition: 'transform 240ms ease-out, opacity 200ms ease-out',
        overflowY: 'auto',
        maxHeight: "80vh",
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
            <div style={sheetStyle} >
                <div className="modal">
                    <p>You completed the Illini Mini in</p>
                    <p className="timer">{displayTime}</p>
                    <p>RELATED TO THIS PUZZLE: </p>
                    <a href={link}>{article}</a>
                    <p>{date}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button onClick={closeModal} style={{ borderRadius: 8, border: '1px solid #ccc', background: '#f7f7f7', cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameStateModal;