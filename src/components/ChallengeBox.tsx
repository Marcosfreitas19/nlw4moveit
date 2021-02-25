import styles from '../styles/components/ChallengeBox.module.css';
import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';


export function ChallengeBox(){
   const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContexts);

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={resetChallenge}
                        >
                            Falhei</button>
                        <button
                        type="button"
                        className={styles.challengeSucceededButton}
                        onClick={completeChallenge}
                        >
                        Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Inicie um ciclo
                    para receber desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level-up"/>
                        Avance de level completando desafios.
                    </p>
            </div>
            )}
        </div>
    )
}