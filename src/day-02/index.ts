import * as fs from 'fs';
import * as path from 'path';

const opponent = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
}

const you = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
}

const lostKey = {
  A: 'Z',
  B: 'X',
  C: 'Y',
}

const winKey = {
  A: 'Y',
  B: 'Z',
  C: 'X',
}

const scoring = {
  X: 1,
  Y: 2,
  Z: 3,
}

const result = {
  lost: 0,
  draw: 3,
  win: 6,
}

const youDraw = {
  rock: 'X',
  paper: 'Y',
  scissors: 'Z',
}

const desiredResultKey = {
  X: 'lost',
  Y: 'draw',
  Z: 'win',
}

const data = fs.readFileSync(path.join(__dirname, `${process.argv.includes('--test') ? '/test_input.txt' :  '/day_2_input.txt'}` ), 'utf8');
const battles = data.trim().split('\n').map((battle) => battle.split(' '));

let totalScore = 0;
let testScore = 0;
const testResults: number[] = []

switch (true) {
  case process.argv.includes('--test'):
    for (const battle of battles) {
      const result = getBattleScore(battle)
      testResults.push(result)
      testScore += result;
    }

    console.log({ testResults, testScore })
    break;

  default:
    for (const battle of battles) {
      const result = getBattleScore(battle)
      totalScore += result;
    }

    console.log({ totalScore })
    break;
}


function getBattleScore (battle: string[]) {
  const [opponentMove, yourMove] = battle;
  const neededMove = renderBattleMove(opponentMove, yourMove);
  const moveScore = yourScore(neededMove)
  const battleScore = battleResult(opponentMove, neededMove);

  return moveScore + battleScore;
}

// const desiredResultKey = {
//   X: 'lost',
//   Y: 'draw',
//   Z: 'win',
// }

// const youDraw = {
//   rock: 'X',
//   paper: 'Y',
//   scissors: 'Z',
// }

function renderBattleMove(opponentMove: string, desiredResult: string) {
  switch (true) {
    case desiredResult === 'Y':
      return youDraw[opponent[opponentMove as keyof typeof opponent] as keyof typeof youDraw];

    case desiredResult === 'X':
      return lostKey[opponentMove as keyof typeof lostKey];

    default:
      return winKey[opponentMove as keyof typeof winKey];
  }
}

function battleResult(opponentMove: string, yourMove: string) {
  if (
    opponent[opponentMove as keyof typeof opponent] ===
    you[yourMove as keyof typeof you]
  ) {
    return result.draw;
  }

  if (opponentMove === 'A' && yourMove === 'Z') {
    return result.lost;
  }

  if (opponentMove === 'B' && yourMove === 'X') {
    return result.lost;
  }

  if (opponentMove === 'C' && yourMove === 'Y') {
    return result.lost;
  }

  return result.win;
}

function yourScore(yourMove: string) {
  return scoring[yourMove as keyof typeof scoring];
}