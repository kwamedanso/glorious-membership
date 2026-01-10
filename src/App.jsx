import { Route, Routes } from 'react-router-dom'
import './App.css'
import EditMember from './pages/EditMember'
import Login from './pages/Login'
import IDPage from './pages/IDPage'
import CreateMember from './pages/CreateMember'

function App() {

  return (
    <>
      <Routes>
        <Route path='/edit-member/:id' element={<EditMember />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/id' element={<IDPage />} />
        <Route path='/create-new' element={<CreateMember />} />
      </Routes>
    </>
  )
}

export default App
