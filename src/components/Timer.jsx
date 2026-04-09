import { useEffect, useRef, useState } from "react";
import "../App.css";

function Timer({ running = true }) {
    const STORAGE_KEY = 'mini-crossword-timer';
    const [seconds, setSeconds] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const n = stored ? parseInt(stored, 10) : 0;
            return isNaN(n) ? 0 : n;
        } catch (e) {
            return 0;
        }
    });
    const counterRef = useRef(null);

    // detect page reload and clear stored timer when reloading the page
    useEffect(() => {
        let isReload = false;
        try {
            if (performance && typeof performance.getEntriesByType === 'function') {
                const entries = performance.getEntriesByType('navigation');
                if (entries && entries.length > 0) {
                    isReload = entries[0].type === 'reload';
                }
            } else if (performance && performance.navigation) {
                // fallback (deprecated API)
                // performance.navigation.type === 1 indicates reload in some browsers
                isReload = performance.navigation.type === performance.navigation.TYPE_RELOAD;
            }
        } catch (e) {
            // ignore
        }

        if (isReload) {
            try {
                localStorage.setItem(STORAGE_KEY, '0');
                setSeconds(0);
            } catch (e) {
                // ignore
            }
        }

    }, []);

    useEffect(() => {
        // stop interval if not running
        if (!running) {
            if (counterRef.current) {
                clearInterval(counterRef.current);
                counterRef.current = null;
            }
            return;
        }

        // start interval when running
        if (!counterRef.current) {
            counterRef.current = setInterval(() => {
                try {
                    const stored = localStorage.getItem(STORAGE_KEY);
                    const n = stored ? parseInt(stored, 10) : 0;
                    const next = isNaN(n) ? 1 : n + 1;
                    localStorage.setItem(STORAGE_KEY, String(next));
                    setSeconds(next);
                } catch (e) {
                    // ignore storage errors
                }
            }, 1000);
        }

        return () => {
            if (counterRef.current) {
                clearInterval(counterRef.current);
                counterRef.current = null;
            }
        };
    }, [running]);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainderSeconds = seconds - 60 * minutes - 3600 * hours;

    let timeString = "";
    if (hours > 0) {
        timeString += String(hours) + ":";
    }
    if (minutes < 10) {
        timeString += "0" + String(minutes) + ":";
    } else {
        timeString += String(minutes) + ":";
    }
    if (remainderSeconds < 10) {
        timeString += "0" + String(remainderSeconds);
    } else {
        timeString += String(remainderSeconds);
    }

    return (
        <div className="timer">
            {timeString}
        </div>
    );
}

export default Timer;