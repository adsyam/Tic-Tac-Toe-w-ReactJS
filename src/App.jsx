import { useRef, useState } from "react"
import "./index.css"

export default function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])

  const [count, setCount] = useState(0)
  const [lock, setLock] = useState(false)
  const gameWinner = useRef(null)

  const toggle = (i) => {
    if (lock) {
      return true
    }
    if (count % 2 === 0) {
      board[i] = "x"
      setCount(count + 1)
    } else {
      board[i] = "o"
      setCount(count + 1)
    }
    checkWinner()
  }

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const condition of winConditions) {
      const [a, b, c] = condition
      if (board[a] === board[b] && board[b] === board[c] && board[c] !== "") {
        won(board[c])
        return
      }
    }

    if (count === 8) {
        gameWinner.current.innerHTML = "It's a tie"
        setLock(true)
    }
  }

  const won = (winner) => {
    setLock(true)
    if (winner === "x") {
      gameWinner.current.innerHTML = `Player X wins!`
    } else if (winner === "o") {
      gameWinner.current.innerHTML = `Player O wins!`
    }
  }

  const resetBoard = () => {
    setBoard(["", "", "", "", "", "", "", "", ""])
    setCount(0)
    setLock(false)
    gameWinner.current.innerHTML = `WHO WILL WIN?`
  }

  return (
    <section className="h-screen grid place-items-center">
      <div className="flex flex-col">
        <h1 className="font-bold text-center mb-5 text-xl">TIC TAC TOE</h1>
        <h2 ref={gameWinner} className="text-center mb-3">
          WHICH PLAYER WILL WIN?
        </h2>
        <div className="grid grid-cols-3 place-items-center gap-2">
          {board.map((move, i) => (
            <div
              key={i}
              role="button"
              className="border w-[7vw] h-[15vh] flex items-center justify-center rounded-md shadow-md text-2xl"
              onClick={() => toggle(i)}
            >
              {move}
            </div>
          ))}
        </div>
        <button className="font-bold" onClick={resetBoard}>
          RESET
        </button>
      </div>
    </section>
  )
}
