import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallengesContexts = createContext({} as ChallengesContextsData);

interface challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextsData {
    level: number;
    CurrentExperience: number;
    ChallengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    activeChallenge: challenge;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export function ChallengesProvider({
     children, 
     ...rest
    }: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [CurrentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [ChallengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpem, setIsLevelModalOpem] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('CurrentExperience', String(CurrentExperience));
        Cookies.set('ChallengesCompleted', String(ChallengesCompleted));
    }, [level, CurrentExperience, ChallengesCompleted]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelModalOpem(true);
    }

    function closeLevelUpModal(){
        setIsLevelModalOpem(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission == 'granted') {
            new Notification( 'Novo desafio', {
               body: `Valendo ${challenge.amount}xp!` 
            } )
        }

    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = CurrentExperience + amount;

        if (finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        } 

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(ChallengesCompleted + 1);
    }

    return(
        <ChallengesContexts.Provider 
        value={{ 
            level, 
            CurrentExperience, 
            ChallengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal,
             }}
             >
            {children}

            {isLevelUpModalOpem && <LevelUpModal />}
        </ChallengesContexts.Provider>
    );
}