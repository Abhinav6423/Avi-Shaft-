import React from 'react'
import LearningJournalGrid from '../../Layout/Learning-Journal/LearningJournalGrid'
import Navbar from '../../Components/Dashboard/Navbar'

const LearningJournal = () => {
    return (
        <>
            <Navbar />
            <div className="mt-15 bg-gradient-to-br from-[#C8F5E6] via-white to-[#A0EDD9]">
                <LearningJournalGrid />
            </div>
        </>
    )
}

export default LearningJournal