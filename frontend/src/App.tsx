import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/not-found/NotFoundPage'
import MainPage from './pages/main/MainPage'
import AddNote from './pages/form/AddNote'
import EditNote from './pages/form/EditNote'
import AllNotesPage from './pages/main/AllNotesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/form' element={<AddNote />} />
        <Route path='/allNotes' element={<AllNotesPage/>} />
        <Route path='/edit/:id' element={<EditNote/>} />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
