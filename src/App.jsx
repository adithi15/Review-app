import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Review from './components/Review.jsx'

function App() {

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-200 flex items-center justify-center p-4 md:p-8">
      <Review />
    </div>
  )
}

export default App
