import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
    const { CurrentExperience, experienceToNextLevel } = useContext(ChallengesContexts);
 
    const percentToNextLevel = Math.round(CurrentExperience * 100) / experienceToNextLevel;
     

    return(
        <header className={styles.experienceBar}>
         <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}/>

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                {CurrentExperience > 0 && (
                <span>{CurrentExperience} xp</span>
                    )}
                </span>
            </div>
         <span>{experienceToNextLevel} xp</span>
        </header>
    );
}

