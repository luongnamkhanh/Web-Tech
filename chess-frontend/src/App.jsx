import { useState } from 'react'
import './App.css'
import ChessBoard from "./components/ChessBoard/ChessBoard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app">
        <ChessBoard />
      </div>
    </>
  )
}

export default App
