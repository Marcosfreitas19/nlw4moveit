import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/LevelUp.module.css';

export function LevelUpModal(){
    const { level, closeLevelUpModal } = useContext(ChallengesContexts);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ level }</header>

                <strong>Parabèns</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    )
}