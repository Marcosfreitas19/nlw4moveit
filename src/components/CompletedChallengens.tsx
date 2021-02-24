
import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallengens(){

    const { ChallengesCompleted } = useContext(ChallengesContexts);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <span>{ChallengesCompleted}</span>
        </div>
    );
}