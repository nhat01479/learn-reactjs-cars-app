
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import CarList from './components/Car/CarList';

function App() {

  return (
    <>
      <MainLayout>
        <Routes>
            <Route path='/' element={<CarList />} />
            <Route path='/car/list' element={<CarList />} />
            <Route path='/car/:carId' element={<CarList />} />
      </Routes>
      </MainLayout>
    </>
  )
}

export default App
