import React from 'react'
import LearningJournalGrid from '../../Layout/Learning-Journal/LearningJournalGrid'
import Navbar from '../../Components/Dashboard/Navbar'

const LearningJournal = () => {
    return (
        <>
            <Navbar />
            <div className="mt-15">
                <LearningJournalGrid />
            </div>
        </>
    )
}

export default LearningJournal