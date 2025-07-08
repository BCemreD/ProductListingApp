import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Favorites from './pages/Favorites'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className='bg-gray-100 p-4'>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<ProductCard />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
