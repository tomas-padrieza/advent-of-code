import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const rankedCards = {
    A: "a",
    K: "b",
    Q: "c",
    J: "d",
    T: "e",
    "9": "f",
    "8": "g",
    "7": "h",
    "6": "i",
    "5": "j",
    "4": "k",
    "3": "l",
    "2": "m",
  }

  const games = {
    five_of_a_kind: [],
    four_of_a_kind: [],
    full_house: [],
    three_of_a_kind: [],
    two_pair: [],
    one_pair: [],
    high_card: [],
  }

  const biddings = {}

  input.split(/\n/).forEach((line, idx) => {
    const [hand, bid] = line.split(/\s/)

    const cards = hand.split("").map((card) => rankedCards[card])
    biddings[cards.join("")] = Number(bid)

    const paired = {}

    cards.forEach((card) => {
      paired[card] = paired[card] ? [...paired[card], card] : [card]
    })

    const occurences = Object.values(paired)
      .map((pair: number[]) => pair.length)
      .sort()
      .reverse()

    let type = "high_card"

    if (occurences[0] === 5) type = "five_of_a_kind"
    if (occurences[0] === 4) type = "four_of_a_kind"
    if (occurences[0] === 3 && occurences[1] === 2) type = "full_house"
    if (occurences[0] === 3 && occurences[1] === 1) type = "three_of_a_kind"
    if (occurences[0] === 2 && occurences[1] === 2) type = "two_pair"
    if (occurences[0] === 2 && occurences[1] === 1) type = "one_pair"

    // console.log({
    //   hand,
    //   cards: cards.join(""),
    //   paired,
    //   occurences,
    //   type,
    //   bid: Number(bid),
    // })

    games[type].push(cards.join(""))
  })

  const keys = Object.keys(games)

  const ranks = []
  for (let key of keys) {
    ranks.push(...games[key].sort().map((card) => biddings[card]))
  }

  return ranks.reverse().reduce((acc, bid, idx) => acc + bid * (idx + 1), 0)
}

const goB = (input: string) => {
  return
}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
