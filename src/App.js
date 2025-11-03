import { useState, useEffect } from "react";
import './App.css';
import Crossword from '@jaredreisinger/react-crossword';

function App() {
    const crosswordStyles = {
        focusBackground: '#fa8f41',
        highlightBackground: '#f7caa8',
    };

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

    function onCrosswordComplete(correct) {
        if (correct) {
            alert("WIN!");
        } else {
            alert("LOSE");
        }
    }

    return (
        <div className="App">
            <div className="crossword-container">
                <Crossword data={data} theme={crosswordStyles} onCrosswordComplete={onCrosswordComplete} />
            </div>
        </div>
    );
}

export default App;
