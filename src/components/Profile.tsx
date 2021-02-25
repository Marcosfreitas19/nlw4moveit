import styles from '../styles/components/Profile.module.css'
import { ChallengesContexts } from '../contexts/ChallengesContexts'
import { useContext } from 'react';

export function Profile(){
    const { level } = useContext(ChallengesContexts);

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Marcosfreitas19.png" alt="MarcosFreitas"/>
            <div>
                <strong>Marcos Freitas</strong>
                <p>
                <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
                
            </div>
        </div>
        
    );
}