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

      const myDistances = []
      let iter = recordTime % 2 === 0 ? recordTime / 2 : (recordTime - 1) / 2
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
  const [recordTime, recordDistance] = input
    .split(/\n/)
    .map((r) => Number(r.match(/\d+/g).join("")))

  const record = {
    recordTime,
    recordDistance,
    maxTime: 0,
    maxDistance: 0,
    splitTime: 0,
    splitDistance: 0,
    step: 0,
  }

  record.maxTime =
    record.recordTime % 2 === 0
      ? record.recordTime / 2
      : (record.recordTime - 1) / 2

  record.maxDistance = (record.recordTime - record.maxTime) * record.maxTime

  record.splitTime = record.maxTime
  record.splitDistance = record.maxDistance

  record.step =
    record.splitTime % 2 === 0
      ? record.splitTime / 2
      : (record.splitTime - 1) / 2

  while (record.step > 0) {
    record.splitDistance =
      (record.recordTime - record.splitTime) * record.splitTime

    const nextStep =
      record.splitDistance > record.recordDistance
        ? -1 * record.step
        : record.step

    record.splitTime = record.splitTime + nextStep

    record.step =
      record.step % 2 === 0 ? record.step / 2 : (record.step - 1) / 2
  }

  return (
    (record.maxTime - record.splitTime) * 2 +
    (record.recordTime % 2 === 0 ? 1 : 0)
  )
}

/* Results */

console.time("Time")
// const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

// console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
