import { useCallback, useEffect, useState } from 'react'
import { Cube } from './cube'

interface Props {
  className?: string
}

function Game({ className }: Props) {
  const [cubes, SetCubes] = useState(
    Array.from({ length: 4 }, () => [0, 0, 0, 0]),
  )

  const fillARandomEmptyCube = useCallback(() => {
    let rowRand, colRand
    do {
      rowRand = Math.floor(Math.random() * 4)
      colRand = Math.floor(Math.random() * 4)
    } while (cubes[rowRand][colRand] !== 0)

    SetCubes((prevCubes) => {
      const newCubes = [...prevCubes]
      newCubes[rowRand][colRand] = Math.random() < 0.9 ? 2 : 4
      return newCubes
    })
  }, [cubes])

  useEffect(() => {
    console.log('Filling a random empty cube')
    fillARandomEmptyCube()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault()

        if (event.key == 'ArrowUp') {
          SetCubes((prevCubes) => {
            const newCubes = [...prevCubes]

            for (let colIndex = 0; colIndex < 4; colIndex++) {
              const colValues = []
              for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
                colValues.push(newCubes[rowIndex][colIndex])
              }
            }

            return newCubes
          })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={className}>
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {cubes.map((row, rowIndex) => {
          return row.map((value, colIndex) => (
            <Cube key={`${rowIndex}-${colIndex}`} value={value} />
          ))
        })}
      </div>
    </div>
  )
}

export { Game }
