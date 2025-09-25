import { Route, Routes } from 'react-router-dom'
import './App.css'
import EditMember from './pages/EditMember'
import Login from './pages/Login'
import IDPage from './pages/IDPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/edit-member' element={<EditMember />} />
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Login />} />
        <Route path='/id' element={<IDPage />} />
      </Routes>
    </>
  )
}

export default App
