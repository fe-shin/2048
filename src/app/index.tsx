import { Game } from './game'

function App() {
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold underline">2048!</h1>
      <Game className="mt-10" />
    </div>
  )
}

export default App
