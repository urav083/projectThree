import { useEffect, useState } from 'react';
import './App.scss';
import ship from './assets/ship.png';

import image100 from './assets/image100.png';
import image200 from './assets/image200.png';
import image300 from './assets/image300.png';
import image400 from './assets/image400.png';
import image500 from './assets/image500.png';


function App() {
  // Creating states
  const [question, setQuestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("")
  const [selectedValue, setSelectedValue] = useState(null);
  const [finalValue, setFinalValue] = useState("");
  const [score, setScore] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameStarted, setGameStarted] = useState(0);

  // Fetching the api Data
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=boolean");
        const data = await response.json();
        setRightAnswer(data.results[0].correct_answer);
        setQuestion(data.results[0].question);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [gameStarted])

  // Functions
  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedValue === null) {
      alert("Please select either true or false");
      // return;
    } else if (selectedValue === rightAnswer) {
      setFinalValue(selectedValue);
      setScore(score + 100)
      setFormSubmitted(true);
      event.target.reset();
    } else {
      setFinalValue(selectedValue);
      setFormSubmitted(true);
      event.target.reset();
    }
  }

  const DisplayBox = () => {
    return (
      <div>
        {finalValue ? <DisplayBox2 /> : <h1>Waiting for your answer...</h1>}
      </div>
    )
  }

  const DisplayBox2 = () => {
    return (
      <div>
        <p>Your answer is:</p>
        {finalValue === rightAnswer ? <h1>Right</h1> : <h1>Wrong</h1>}
      </div>
    )
  }

  const startNewGame = () => {
    setQuestion("");
    setFinalValue("");
    setFormSubmitted(false);
    setGameStarted(gameStarted + 1);
  };

  return (
    <div className="App">
      <div className='wrapper'>
        <div class="tile"></div>
        <div className={`shipDiv ${score >= 500 ? 'shipLift' : ''}`}>
          <img src={ship} alt="a ship" />
        </div>
        <header>
          <h1 className='topHeader'>Space Trivia</h1>
        </header>
        <div className='bodyDiv'>
          <button onClick={startNewGame} className={`questionButton ${finalValue !== '' || gameStarted === 0 ? 'glow' : ''} `}>New Question</button>
          {/* Ternary that displays a welcome message when game first states, and displays the question box when the player begins the game. */}
          {gameStarted === 0 ? <div className='questionDiv'><p className='introText'> Greetings, traveler! We seem to have run out of fuel on our voyage and need your help. Answer trivia questions correctly and help us earn the credits to re-fuel at five friendly planets. Get us to 500 and we'll be able to make the journey home!</p></div> :

            <div className='questionDiv'>
              <p dangerouslySetInnerHTML={{ __html: question }}></p>
              <form onSubmit={handleSubmit} className='form'>
                <label htmlFor='trueOption'>True</label>
                <input type="radio" id='trueOption' name='quizBoolean' value='True' onChange={handleChange} />
                <label htmlFor='falseOption'>False</label>
                <input type="radio" id='falseOption' name='quizBoolean' value='False' onChange={handleChange} />
                <br></br>
                <button type='submit' disabled={formSubmitted} className='answerButton'>Answer</button>
              </form>
            </div>
          }
          {gameStarted === 0 ? null : <DisplayBox />}

          <div className='scoreDiv'>
            <p>
              SCORE
              <br></br>
              {score}/500
            </p>
          </div>
        </div>

        {score < 500 ? null : <div className='finalMessage'>Thanks for playing! Enjoy your return journey or keep working on your trivia skills!</div>}

        <div className="planetDiv">

          <div className={`image-container ${score >= 100 ? 'animate1' : ''}`}>
            <img src={image100}
              style={{
                display: score >= 100 && score < 200 ? "block" : "none",

              }}
              alt="Planet 1" />
          </div>
          <div className={`image-container ${score >= 200 ? 'animate1' : ''}`}>
            <img src={image200}
              style={{
                display: score >= 200 ? "block" : "none",

              }}
              alt="Planet 2" />
          </div>
          <div className={`image-container ${score >= 300 ? 'animate1' : ''}`}>
            <img src={image300}
              style={{
                display: score >= 300 ? "block" : "none",

              }}
              alt="Planet 3" />
          </div>
          <div className={`image-container ${score >= 400 ? 'animate1' : ''}`}>
            <img src={image400}
              style={{
                display: score >= 400 ? "block" : "none",

              }}
              alt="Planet 4" />
          </div>
          <div className={`image-container ${score >= 500 ? 'animate1' : ''}`}>
            <img src={image500}
              style={{
                display: score >= 500 ? "block" : "none",
              }}
              alt="Planet 5" />
          </div>
        </div>

      </div>
      <div class="text"><span>Created by Umai Rav at Juno College. <br></br> All images AI-generated. 2023.</span></div>

    </div>
  );
}

export default App;
