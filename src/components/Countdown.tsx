import { useState, useEffect, useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const { startNewChallenge } = useContext(ChallengesContexts);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    function startCountdown(){
        setIsActive(true);
    }
    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div>
            </div>

            {hasFinished ? (
                <button
                disabled
                className={styles.countdownButton}
                >
                   Ciclo encerrado &nbsp; <img src="icons/check-circle-solid.svg" alt="check-circle-solid" />
               </button>
            ) : (
                <>
                { isActive ? (
                <button type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
                >
                   Abandonar ciclo &nbsp;<img src="icons/times-solid.svg" alt="times-solid" />
               </button>
                ) : (
                <button type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
                >
                   Iniciar um ciclo &nbsp;<img src="icons/play-solid.svg" alt="play-solid" />
               </button>
                ) }
                </> 
               ) }
            
        </div>
    )}
