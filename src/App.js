import './App.css'
import { useState } from 'react'
import SingleCard from './component/SingleCard/SingleCard'
import { useEffect } from 'react'



const cardImages = [
  { "src": "/img/lebron-1.gif", matched: false},
  { "src": "/img/lebron-2.gif", matched: false},
  { "src": "/img/lebron-3.gif", matched: false},
  { "src": "/img/lebron-4.gif", matched: false},
  { "src": "/img/lebron-5.gif", matched: false},
  { "src": "/img/lebron-6.gif", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))


      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle a choice by the user 
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // Compare two selected cards 
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)

        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() =>  resetTurn(), 1500)
        }
      }
    }, [choiceOne, choiceTwo])

    console.log(cards)

    // reset choices and increases turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    // start game automatically on page load
    useEffect(() => {
      shuffleCards()
    }, [])

  return (
    <div className="App">
      <h1>GIF Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App