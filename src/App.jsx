import { useRef, useState, useEffect } from "react";
import './App.css';
import Crossword from '@jaredreisinger/react-crossword';
import GameStateModal from "./components/GameStateModal";
import Timer from "./components/Timer";

function App() {
    const crosswordStyles = {
        focusBackground: '#FF6400',
        highlightBackground: '#f4c19f',
        columnBreakpoint: '768px',
    };

    // State Management
    const [crosswordData, setCrosswordData] = useState(null);
    const [articleInfo, setArticleInfo] = useState({ title: "", link: "" });
    const [dateStr, setDateStr] = useState("LOADING...");
    const [createdBy, setCreatedBy] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalAgain, setShowModalAgain] = useState(true);
    const [loading, setLoading] = useState(true);

    const crossword = useRef(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://app.dailyillini.com/mini/today');
                const result = await response.json();

                // Map API response to state
                setCrosswordData(result.data);
                setArticleInfo({
                    title: result.story_title,
                    link: result.story_link
                });
                setDateStr(result.datestr);
                setCreatedBy(result.created_by);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching crossword:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function onCrosswordCorrect(correct) {
        if (correct && showModalAgain) {
            setShowModal(true);
            setShowModalAgain(false);
        }
    }

    if (loading) {
        return <div className="loading" style={{ textAlign: 'center', marginTop: '50px' }}>Loading Crossword...</div>;
    }

    return (
        <div className="App">
            <GameStateModal 
                showModal={showModal}
                setShowModal={setShowModal} 
                article={articleInfo.title} 
                link={articleInfo.link}
                date={dateStr} 
            />
            
            {/* New Two-Line Header */}
            <header className="app-header">
                <span className="subtitle">The Daily Illini</span>
                <h1 className="title">Mini Crossword</h1>
            </header>
            
            <div className="header-info">
                <div className="meta-info">
                    <h2>Week of {dateStr}</h2>
                    {createdBy && (
                        <p className="creator-info">Created by {createdBy}</p>
                    )}
                </div>
                <Timer running={showModalAgain} />
            </div>
            
            <div className="crossword-container">
                {crosswordData && (
                    <Crossword 
                        data={crosswordData} 
                        theme={crosswordStyles} 
                        onCrosswordCorrect={onCrosswordCorrect} 
                        ref={crossword}
                    />
                )}
            </div>
        </div>
    );
}

export default App;