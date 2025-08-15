import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import { Analytics } from "@vercel/analytics/react";
import LoginForm from './components/User/LoginForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className='bg-[#F4F4F4] p-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<ProductPage />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
        </Routes>
      </main>
      <Analytics />
    </>
  )
}

export default App
