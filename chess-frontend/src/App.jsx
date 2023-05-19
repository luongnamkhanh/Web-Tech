import { useState } from 'react'
import './App.css'
import IngamePage from './pages/IngamePage/IngamePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app">
        <IngamePage />
      </div>
    </>
  )
}

export default App
