import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  let total = 0

  const lines = input.split("\n")

  lines.forEach((line) => {
    let currentWin = 0

    const [_, numbers] = line.split(": ")

    const [winningNums, betNums] = [
      numbers
        .split(" | ")[0]
        .split(" ")
        .map((n) => Number(n)),
      numbers
        .split(" | ")[1]
        .split(" ")
        .map((n) => Number(n)),
    ]

    betNums.forEach((betNum) => {
      if (winningNums.indexOf(betNum) !== -1 && betNum !== 0) {
        currentWin += currentWin === 0 ? 1 : currentWin
      }
    })

    total += currentWin
  })

  return total
}

const goB = (input: string) => {
  let total = 0
  const initLines = input.split("\n")
  const lines = input.split("\n")

  const cardWins = (numbers: string) => {
    let wins = 0

    const [winningNums, betNums] = [
      numbers
        .split(" | ")[0]
        .split(" ")
        .map((n) => Number(n)),
      numbers
        .split(" | ")[1]
        .split(" ")
        .map((n) => Number(n)),
    ]

    betNums.forEach((betNum) => {
      if (winningNums.indexOf(betNum) !== -1 && betNum !== 0) {
        wins++
      }
    })

    return wins
  }

  const recProcess = (lines) => {
    lines.forEach((line) => {
      total++
      const [card, numbers] = line.split(": ")
      const cardNum = card.match(/\d+/g)[0]

      const cardwins = cardWins(numbers)
      const sliceTo = Number(cardNum) + cardwins

      if (cardwins > 0) {
        recProcess(initLines.slice(Number(cardNum), sliceTo))
      }
    })
  }

  recProcess(lines)
  return total
}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
