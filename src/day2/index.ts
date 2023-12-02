import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string): number => {
  const validation: Record<string, number> = { red: 12, green: 13, blue: 14 }

  const lines = input.split("\n")

  let total = 0

  lines.forEach((line) => {
    let valid = true

    const [gameNum, gameLine] = line.split(": ")
    const num = Number(gameNum.split(" ")[1])

    const gameDraws = gameLine.split("; ").map((draw) => draw.split(", "))

    gameDraws.forEach((gameDraw) => {
      gameDraw.forEach((draw) => {
        const key = draw.split(" ")[1]
        const total = Number(draw.split(" ")[0])

        if (total > validation[key]) valid = false
      })
    })

    if (valid) {
      total += num
    }
  })

  return total
}

const goB = (input: string) => {
  const lines = input.split("\n")

  let total = 0

  const checkLines = lines.map((line) => line.split(": ")[1])

  checkLines.forEach((checkLine) => {
    const mins: Record<string, number> = { red: 1, green: 1, blue: 1 }

    const draws = checkLine.split("; ")

    draws.forEach((draw) => {
      const colors = draw.split(", ")

      colors.forEach((color) => {
        const colorVal = color.split(" ")

        mins[colorVal[1]] =
          mins[colorVal[1]] < Number(colorVal[0])
            ? Number(colorVal[0])
            : mins[colorVal[1]]
      })
    })

    const multi = mins.red * mins.green * mins.blue

    total += multi
  })

  return total
}

/* Tests */

// test<number>(goA(input), 8)

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
