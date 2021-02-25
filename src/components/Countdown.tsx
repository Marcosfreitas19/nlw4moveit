import { useState, useEffect, useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown(){
   const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountdown,
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
    

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
