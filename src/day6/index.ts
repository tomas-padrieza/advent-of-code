import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const records = input
    .split(/\n/)[0]
    .match(/\d+/g)
    .map((t, idx) => {
      const distances = input.split(/\n/)[1].match(/\d+/g)

      const recordTime = Number(t)
      const recordDistance = Number(distances[idx])

      const maxHolds =
        recordTime % 2 === 0
          ? [recordTime / 2]
          : [(recordTime - 1) / 2, (recordTime + 1) / 2]

      const myDistances = []
      let iter = maxHolds[0]
      while (iter > 0) {
        myDistances.unshift((recordTime - iter) * iter)
        iter--
      }

      const winningDistances = myDistances.filter(
        (myDistance) => myDistance > recordDistance,
      )

      const totalWinningDistances =
        winningDistances.length > 0
          ? recordTime % 2 === 0
            ? winningDistances.length * 2 - 1
            : winningDistances.length * 2
          : 0

      return {
        recordTime,
        recordDistance,
        maxHolds,
        myDistances,
        winningDistances,
        totalWinningDistances,
      }
    })

  const winningTotal = records.reduce((acc, record) => {
    return acc * record.totalWinningDistances
  }, 1)

  return winningTotal
}

const goB = (input: string) => {
  return
}

/* Results */

console.time("Time")
const resultA = goA(input)
// const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
// console.log("Solution to part 2:", resultB)
