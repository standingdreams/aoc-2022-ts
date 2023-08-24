import { getText } from "../utils/general"

function findDuplicateItem(firstHalf: string, secondHalf: string): string {
  const setA = new Set(firstHalf)
  const setB = new Set(secondHalf)
  return [...setA].filter((x) => setB.has(x))[0]
}

function findDuplicateItem2(first: string, second: string, third: string): string {
  const setA = new Set(first)
  const setB = new Set(second)
  const setC = new Set(third)
  return [...setA].filter((x) => setB.has(x) && setC.has(x))[0]
}

function calculatePriority (duplicateItem: string) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const indexOfDuplicateItem = alphabet.indexOf(duplicateItem) + 1
  return indexOfDuplicateItem
}

function getTeamOfThree (rucksacks: string[]) {
  const teamOfThree: string[][] = []
  let teamNum = 0
  let tempTeam: string[] = []

  for (const rucksack of rucksacks) {
    tempTeam.push(rucksack)
    teamNum++
    console.log(teamNum, { rucksack })

    if (teamNum === 3) {
      teamOfThree.push(tempTeam)
      tempTeam = []
      teamNum = 0
    }
  }

  return teamOfThree
}

function start() {
  const data = getText(__dirname, '/day_3_input.txt')
  const rucksacks = data.trim().split('\n');
  let priority = 0;
  let teamPriority = 0;
  const teamOfThree = getTeamOfThree(rucksacks)

  for (const rucksack of rucksacks) {
    const length = rucksack.length
    const firstHalf = rucksack.slice(0, length / 2)
    const secondHalf = rucksack.slice(length / 2, length)

    const duplicateItem = findDuplicateItem(firstHalf, secondHalf)

    const indexOfDuplicateItem = calculatePriority(duplicateItem)
    priority += indexOfDuplicateItem
  }

  for (const team of teamOfThree) {
    const duplicateItem = findDuplicateItem2(team[0], team[1], team[2])
    const indexOfDuplicateItem = calculatePriority(duplicateItem)
    teamPriority += indexOfDuplicateItem
  }

  // Part 1 Answer: 8298
  // Part 2 Answer: 2708
  console.log({ 'Part 1': priority })
  console.log({ 'Part 2': teamPriority })
}

start()