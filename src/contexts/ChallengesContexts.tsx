import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json'


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
    
    
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [CurrentExperience, setCurrentExperience] = useState(0);
    const [ChallengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
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
            completeChallenge
             }}
             >
            {children}
        </ChallengesContexts.Provider>
    );
}