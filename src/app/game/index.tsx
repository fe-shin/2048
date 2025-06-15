import { useCallback, useEffect, useState } from 'react'
import { Cube } from './cube'
import { tiltLeft, tiltRight } from '../../utils/array/tilt'

interface Props {
  className?: string
}

function Game({ className }: Props) {
  const [cubes, setCubes] = useState(
    Array.from({ length: 4 }, () => [0, 0, 0, 0]),
  )

  const fillARandomEmptyCube = useCallback(() => {
    let rowRand, colRand
    do {
      rowRand = Math.floor(Math.random() * 4)
      colRand = Math.floor(Math.random() * 4)
    } while (cubes[rowRand][colRand] !== 0)

    setCubes((prevCubes) => {
      const newCubes = [...prevCubes]
      newCubes[rowRand][colRand] = Math.random() < 0.9 ? 2 : 4
      return newCubes
    })
  }, [cubes])

  useEffect(() => {
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

        if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
          setCubes((prevCubes) => {
            const newCubes = [...prevCubes]

            for (let colIndex = 0; colIndex < newCubes.length; colIndex++) {
              const colValues = []
              for (let rowIndex = 0; rowIndex < newCubes.length; rowIndex++) {
                colValues.push(newCubes[rowIndex][colIndex])
              }
              const newColValues =
                event.key === 'ArrowUp'
                  ? tiltLeft({
                      value: [...colValues],
                    })
                  : tiltRight({
                      value: [...colValues],
                    })

              for (let rowIndex = 0; rowIndex < newCubes.length; rowIndex++) {
                newCubes[rowIndex][colIndex] = newColValues[rowIndex]
              }
            }

            return newCubes
          })
        }

        if (event.key == 'ArrowLeft' || event.key == 'ArrowRight') {
          setCubes((prevCubes) => {
            const newCubes = [...prevCubes]

            for (let rowIndex = 0; rowIndex < newCubes.length; rowIndex++) {
              const rowValues = [...newCubes[rowIndex]]

              const newRowValues =
                event.key === 'ArrowLeft'
                  ? tiltLeft({
                      value: [...rowValues],
                    })
                  : tiltRight({
                      value: [...rowValues],
                    })

              newCubes[rowIndex] = newRowValues
            }

            return newCubes
          })
        }

        fillARandomEmptyCube()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cubes, fillARandomEmptyCube])

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
