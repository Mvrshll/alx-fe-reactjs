import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'

function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-500">Welcome to the Recipe Sharing Platform!</h1>
      <HomePage />
    </div>
    
  );
}

export default App
