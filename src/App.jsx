import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css'

const cardImages = [
  {"src": "../img/helmet-1.png", matched: false},
  {"src": "../img/potion-1.png", matched: false},
  {"src": "../img/ring-1.png", matched: false},
  {"src": "../img/scroll-1.png", matched: false},
  {"src": "../img/shield-1.png", matched: false},
  {"src": "../img/sword-1.png", matched: false},
];

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [choices, setChoices] = useState({choiceOne: null, choiceTwo: null})

  //Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages,...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id:Math.random()}))

    setChoices({choiceOne: null, choiceTwo: null})
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choices.choiceOne ? setChoices({...choices, choiceTwo: card}) : setChoices({...choices, choiceOne: card})
  }

  //compare 2 selected cards
  useEffect(() => {
    if(choices.choiceOne && choices.choiceTwo){
      setDisabled(true)
      if(choices.choiceOne.src === choices.choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choices.choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
    
  }, [choices.choiceOne, choices.choiceTwo])

  
  //reset choices & increase turns
  const resetTurn = () => {
    setChoices({choiceOne: null, choiceTwo: null})
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //Start a new game automatically
  useEffect(() => shuffleCards(), [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
           key={card.id} 
           card={card} handleChoice={handleChoice} 
           flipped={card === choices.choiceOne || card === choices.choiceTwo || card.matched}
           disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App