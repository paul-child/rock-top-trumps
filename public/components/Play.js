import React, { Component } from 'react'

// import actions
import * as actions from '../actions'

// import components
import GameSetup from './GameSetup'
import NumPlayers from './NumPlayers'
import StartRound from './StartRound'
import LeaderCard from './LeaderCard'
import Fight from './Fight'
import CardReveal from './CardReveal'

// import utility
import shuffle from '../util/shuffle'

export default class Play extends Component {

// To Do:

// ** HIGHLIGHT THE STAT OF THE WINNING CHIP (HOW??)
// ** The final screen lists the cards and all their stats so people know what they've won/lost

// 1. Consider tie results.
// handleDistribute() -->
// 3. Final function: RESET ACTIVECARDS AND ACTIVEATTRIBUTE,
// 4. Make initial shuffled deck IMMUTABLE (it currently is not)

   // 1 --> 2
   handleActiveCard = () => {
      // dispatch all player objects to reducer to gather top card of each hand, plus player ID
      let {p1, p2, p3, p4} = this.props.playerInfo
      this.props.gatherCards(p1, p2, p3, p4)
      this.props.changeStage(2)
   }
   // 2 --> 3
   selectAttribute = (attribute) => {
      this.props.submitAttribute(attribute)
      this.props.changeStage(3)
   }
   // 3 --> 4
   handleReveal = () => {
      this.props.changeStage(4)
   }
   // 4 --> 5
   handleDistribute = (winnerId, playedCards) => {
      // all players lose active card, winner gains all active cards at back of hand
      this.props.switchCards(winnerId, playedCards)
      this.props.changeStage(5)
   }
   // 5 --> 1
   handleNextRound = () => {
      // reset ACTIVE CARDS and ACTIVE ATTRIBUTE
      this.props.roundReset()
      this.props.nextPlayer(this.props.players)
      this.props.changeStage(1)
   }

   render() {

      console.log('this.props.activePlayerArr: ', this.props.activePlayerArr)

      const {players, deck, changeNumPlayers, addNames, deal, stage, changeStage, activePlayer, activeCards, activeAttribute, playerInfo} = this.props

      const cloneDeck = deck.slice(0)

      let onPlayer;
      const {p1, p2, p3, p4} = this.props.playerInfo
      switch(activePlayer) {
         case 1:
            onPlayer = p1
            break;
         case 2:
            onPlayer = p2
            break;
         case 3:
            onPlayer = p3
            break;
         case 4:
            onPlayer = p4
            break;
         default:
            null
      }

      switch(stage) {

         case 0:
            return <GameSetup {...this.props} />

         case 1:
            return (
               <StartRound
                  onPlayer={onPlayer}
                  handleActiveCard={this.handleActiveCard}
               />
            )

         case 2:
            return (
               <LeaderCard
                  onPlayer={onPlayer}
                  selectAttribute={this.selectAttribute}
                  activeCards={this.props.activeCards}
               />
            )

         case 3:
            return <Fight handleReveal={this.handleReveal} />

         case 4:
            return (
               <CardReveal
                  activeCards={activeCards}
                  activeAttribute={activeAttribute}
                  players={players}
                  playerInfo={playerInfo}
                  handleDistribute={this.handleDistribute}
               />
            )

         case 5:
            return (
               <div className='centered'>
                  <h1>Declare winner here</h1>
                  <h3>Cards won:</h3>
                  <p>(List cards won from other players)</p>
                  <button className='btn btn-primary' onClick={this.handleNextRound}>Next Round</button>
               </div>
            )
      }

   }
}
