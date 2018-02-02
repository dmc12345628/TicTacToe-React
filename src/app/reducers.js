import Immutable from "seamless-immutable";

const DEMARRER_JEU = 'morpion/DEMARRER'
const CLICK_CASE = 'morpion/CLICK_CASE'
const CHANGE_TOUR = 'morpion/CHANGE_TOUR'
const INCREASE_TIME = 'morpion/INCREASE_TIME'
const SET_CLEAR_INTERVAL = 'morpion/SET_CLEAR_INTERVAL'
const RESET_GAME = 'morpion/RESET_GAME'

const initialState = {
  states: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ],
  player: 'X',
  winner: '',
  interval: 0,
  time: 0,
  scores: {
    X: 0,
    O: 0
  }
}

export function monReducer(currentState = Immutable(initialState), action) {
    switch (action.type) {
        case DEMARRER_JEU: {
            let newState = currentState.set('interval', aciton.interval);
            return newState;
        }
        case CLICK_CASE: {
            let {x, y} = action.case
            let {player} = action

            let newState = currentState
            if (currentState.winner === '' && currentState.states[x][y] === ''
                && currentState.interval !== 0) {
                newState = newState.setIn(['states', x, y], player)
                    .set('player', (player === 'X') ? 'O' : 'X')
                    .set('time', 0)

                if (isWinner(player, x, y, newState.states)) {
                  clearInterval(newState.interval)
                  newState = newState.set('winner', player)
                    .set('time', 0)
                    .set('interval', 0)
                    .setIn(['scores', player], (newState.scores[player] + 1))
                }
            }

            return newState
        }
        case CHANGE_TOUR: {
            let {player} = currentState
            let newState = currentState.set('player', (player === 'X') ? 'O' : 'X')
              .set('time', 0)
            return newState;
        }
        case INCREASE_TIME: {
          let {time, player} = currentState

          let newState = currentState
          if (time == 4) {
            newState = currentState.set('player', (player === 'X') ? 'O' : 'X')
              .set('time', 0)
          } else
            newState = newState.set('time', newState.time + 1)

          return newState
        }
        case SET_CLEAR_INTERVAL: {
          let {interval} = currentState

          let newState = currentState
          if (interval == 0)
            newState = newState.set('interval', action.interval)
              .set('time', 0)
          else {
            clearInterval(interval)
            clearInterval(action.interval)
            newState = newState.set('interval', 0)
          }

          return newState
        }
        case RESET_GAME: {
          let {states, player, winner, interval, time} = initialState

          let newState = currentState.set('states', states)
              .set('player', player)
              .set('winner', winner)
              .set('interval', interval)
              .set('time', time)

          return newState
        }
    }

    return currentState;
}

export function resetGame() {
  return {
    type: RESET_GAME
  }
}

export function setClearInterval(interval) {
    return {
        type: SET_CLEAR_INTERVAL,
        interval: interval
    };
}

export function clickCase(player, x, y) {
    return {
        type: CLICK_CASE,
        case: {
          x: x,
          y: y
        },
        player: player
    }
}

export function changeTour() {
  return {
    type: CHANGE_TOUR,
  }
}

export function increaseTime() {
  return {
    type: INCREASE_TIME,
  }
}

function isWinner(player, x, y, states) {
    let sum = x + y
    let concat = x + '' + y
    switch (sum) {
      case 0: {
        if (player === states[0][0] && player === states[0][1] && player === states[0][2])
          return true;
        else if (player === states[0][0] && player === states[1][0] && player === states[2][0])
          return true;
        else if (player === states[0][0] && player === states[1][1] && player === states[2][2])
          return true;
        else
          return false;
      }
      case 1: {
        if (player === states[0][0] && player === states[0][1] && player === states[0][2])
          return true;
        else if (player === states[1][0] && player === states[1][1] && player === states[2][1])
          return true;
        else if (player === states[0][0] && player === states[1][0] && player === states[2][0])
          return true;
        else if (player === states[1][0] && player === states[1][1] && player === states[1][2])
          return true;
        else
          return false;
      }
      case 2: {
        if (player === states[0][0] && player === states[0][1] && player === states[0][2])
          return true;
        else if (player === states[0][2] && player === states[1][2] && player === states[2][2])
          return true;
        else if (player === states[2][0] && player === states[1][1] && player === states[0][2])
          return true;
        else if (player === states[0][1] && player === states[1][1] && player === states[2][1])
          return true;
        else if (player === states[1][0] && player === states[1][1] && player === states[1][2])
          return true;
        else if (player === states[0][0] && player === states[1][0] && player === states[2][0])
          return true;
        else if (player === states[2][0] && player === states[1][1] && player === states[0][2])
          return true;
        else if (player === states[2][0] && player === states[2][1] && player === states[2][2])
          return true;
        else
          return false;
      }
      case 3: {
        if (player === states[1][0] && player === states[1][1] && player === states[1][2])
          return true;
        else if (player === states[0][2] && player === states[1][2] && player === states[2][2])
          return true;
        else if (player === states[0][1] && player === states[1][1] && player === states[2][1])
          return true;
        else if (player === states[2][0] && player === states[2][1] && player === states[2][2])
          return true;
        else
          return false;
      }
      case 4: {
        if (player === states[0][0] && player === states[1][1] && player === states[2][2])
          return true;
        else if (player === states[0][2] && player === states[1][2] && player === states[2][2])
          return true;
        else if (player === states[2][0] && player === states[2][1] && player === states[2][2])
          return true;
        else
          return false;
      }
      default:
        return false;
    }
}
