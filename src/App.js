import { useRef, useState } from "react";
import './App.css';
import Crossword from '@jaredreisinger/react-crossword';
import GameStateModal from "./components/GameStateModal";

function App() {
    const crosswordStyles = {
        focusBackground: '#fa8f41',
        highlightBackground: '#f7caa8',
    };
    const [showModal, setShowModal] = useState(false);
    const [showModalAgain, setShowModalAgain] = useState(true);

    const crossword = useRef(null);
    const articlePreview = "Time to take the North and never give it back";
    const articleLink = "https://dailyillini.com/sports-stories/mens-sports/football/2025/11/08/column-take-the-north/";
    const data = {
        across: {
            1: {
            clue: 'one plus one',
            answer: 'TWO',
            row: 0,
            col: 0,
            },
        },
        down: {
            2: {
            clue: 'three minus two',
            answer: 'ONE',
            row: 0,
            col: 2,
            },
        },
    }

    function onCrosswordCorrect(correct) {
        if (correct && showModalAgain) {
            setShowModal(true);
            setShowModalAgain(false);
            // disable editing the crossword now
        }
    }

    return (
        <div className="App">
            <GameStateModal 
                showModal={showModal}
                setShowModal={setShowModal} 
                article={articlePreview} 
                link={articleLink} />
            <div className="crossword-container">
                <Crossword data={data} theme={crosswordStyles} onCrosswordCorrect={onCrosswordCorrect} ref={crossword}/>
            </div>
        </div>
    );
}

export default App;
