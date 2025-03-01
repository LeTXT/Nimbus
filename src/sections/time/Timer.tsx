import { useEffect, useRef, useState } from 'react'
import { handleScroll, handleInfiniteScroll, handleScrollPlay } from '../../utils/timer'
import './timer.scss'

const tensValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const unitsValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function Timer() {
    const [tensState, setTensState] = useState<number>(0);
    const [unitsState, setUnitsState] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

    
    const audio: HTMLAudioElement = new Audio('');

    const tensRef = useRef<HTMLInputElement>(null)
    const unitsRef = useRef<HTMLInputElement>(null)
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const tensElement = tensRef.current
        const unitsElement = unitsRef.current
        let isScrolling: number

        if (!tensElement || !unitsElement) return

        handleInfiniteScroll(tensElement)
        handleInfiniteScroll(unitsElement)
        
        const onScroll = () => {
            window.clearTimeout(isScrolling);

            handleInfiniteScroll(tensElement)
            handleInfiniteScroll(unitsElement)
    
            isScrolling = setTimeout(() => {
                handleScroll(tensElement, setTensState);
                handleScroll(unitsElement, setUnitsState);   
                
            }, 500);
        };

        tensElement.addEventListener("scroll", onScroll);
        unitsElement.addEventListener("scroll", onScroll);
  
        return () => {
            tensElement.removeEventListener("scroll", onScroll);
            unitsElement.removeEventListener("scroll", onScroll);
        };

    }, [tensState, unitsState]);

    const handleTimerButtonClick = () => {
        handleScrollPlay(tensRef.current, unitsRef.current, tensState, unitsState, intervalRef, setIsTimerRunning, audio)
    };

    return (
        <div className="timerContainer">
            <div className='overflowContainer' ref={tensRef}>
                {tensValues.map((value, id) => (
                    <div key={id} className='pContainer' >
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div className='overflowContainer' ref={unitsRef}>
                {unitsValues.map((value, id) => (
                    <div key={id} className='pContainer'>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <div>
                <button className={isTimerRunning ? 'pauseButton' : 'playButton'} onClick={handleTimerButtonClick}><div className='img'></div></button>
            </div>
        </div>
    )
}

export default Timer