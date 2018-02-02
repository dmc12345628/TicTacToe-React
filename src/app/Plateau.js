import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";

import {demarrerLeJeu, clickCase, changeTour, increaseTime, setClearInterval, resetGame} from "./reducers";

import AppBar from './AppBar'
import ResetButton from './ResetButton'
import PlayButton from './PlayButton'
import Typography from 'material-ui/Typography'

// On importe les styles pour le plateau
import styles from "./plateau.css";

import Case from "./Case";

class Plateau extends React.Component {

    constructor(props) {
      super(props)
    }

    resetGame() {
      this.props.dispatch(resetGame())
    }

    startGame() {
      let self = this
      self.props.dispatch(setClearInterval(setInterval(function() {self.onIncreaseTime()}, 1000)))
    }

    onCaseClick(x, y) {
        let {player} = this.props
        this.props.dispatch(clickCase(player, x, y))
    }

    onChangeTour() {
      this.props.dispatch(changeTour())
    }

    onIncreaseTime() {
      this.props.dispatch(increaseTime())
    }

    render() {
        let {states, player, winner, interval, time, scores} = this.props

        let actualPlayerLabel = interval !== 0 ?
          'Cest a ' + player + ' pendant ' + time + ' secondes'
          : ''
        let winnerLabel = interval !== 0 ?
          'Vainqueur : ' + winner
          : ''

        return <div>
            <AppBar title={'Le super jeu du morpion'}/>

            <table className="plateau">
                <tbody>
                <tr>
                    <td>
                        <Case state={states[0][0]} onClick={() => this.onCaseClick(0, 0)}/>
                    </td>
                    <td>
                        <Case state={states[0][1]} onClick={() => this.onCaseClick(0, 1)}/>
                    </td>
                    <td>
                        <Case state={states[0][2]} onClick={() => this.onCaseClick(0, 2)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Case state={states[1][0]} onClick={() => this.onCaseClick(1, 0)}/>
                    </td>
                    <td>
                        <Case state={states[1][1]} onClick={() => this.onCaseClick(1, 1)}/>
                    </td>
                    <td>
                        <Case state={states[1][2]} onClick={() => this.onCaseClick(1, 2)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Case state={states[2][0]} onClick={() => this.onCaseClick(2, 0)}/>
                    </td>
                    <td>
                        <Case state={states[2][1]} onClick={() => this.onCaseClick(2, 1)}/>
                    </td>
                    <td>
                        <Case state={states[2][2]} onClick={() => this.onCaseClick(2, 2)}/>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="dialogs">
              <Typography type="headline" gutterBottom>
                {actualPlayerLabel}
              </Typography>
              <Typography type="headline" gutterBottom>
                {winnerLabel}
              </Typography>

              <div className="scores">
                <Typography type="title" gutterBottom>
                  Scores
                </Typography>
                <Typography type="subheading" gutterBottom>
                  X: {scores.X}
                </Typography>
                <Typography type="subheading" gutterBottom>
                  O: {scores.O}
                </Typography>
              </div>

              <div className="controls">
                <ResetButton onClick={() => this.resetGame()}/>
                <PlayButton onClick={() => this.startGame()}/>
              </div>
            </div>
        </div>
    }
}

function mapStateToProps(storeState, props) {
    return {
      states: storeState.states,
      player: storeState.player,
      winner: storeState.winner,
      interval: storeState.inverval,
      time: storeState.time,
      scores: storeState.scores,
    }
}

export default connect(
    mapStateToProps
)(Plateau)
