import React from 'react'
import Dashboard from './Pages/Authentication/Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'
import CreateQuickNote from './Components/QuickNote/CreateQuickNote'
import CreateLearningJournal from './Components/Learning-Journal/CreateLearningJournal'
import Login from './Pages/Authentication/Login'
import Register from './Pages/Authentication/Register'
import ProtectRoute from './utils/ProtectRoute'
import LearningJournal from './Pages/Learning-Journal/LearningJournal'
import DisplayNote from './Pages/DisplayNotes'
import { Toaster } from "react-hot-toast";
import DisplayLearnignJournal from './Pages/DisplayLearningJournal.jsx'
const App = () => {
  return (
    <>
      {/* Correct place for Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />

        <Route element={<ProtectRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-quicknote' element={<CreateQuickNote />} />
          <Route path='/create-journal' element={<CreateLearningJournal />} />
          <Route path='/learning-journal' element={<LearningJournal />} />
          <Route path='/single-note/:noteId' element={<DisplayNote />} />
          <Route path='/viewJournal/:journalId' element={<DisplayLearnignJournal />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
