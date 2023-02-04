import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Creating states
  const [question, setQuestion] = useState("");
  const [rightAnswer, setRightAnswer] = useState("")
  const [selectedValue, setSelectedValue] = useState(null);
  const [finalValue, setFinalValue] = useState("");
  const [score, setScore] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Fetching the api Data
  useEffect(() => {

    async function getData() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=boolean");
        const data = await response.json();
        // console.log(data.results[0]);
        setRightAnswer(data.results[0].correct_answer);
        setQuestion(data.results[0].question);
      } catch (error) {
        console.error(error);
      }
    }

    getData();

  }, [gameStarted])



  console.log(question);
  console.log(rightAnswer);

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
      setGameStarted(false);
    } else {
      setFinalValue(selectedValue);
      setFormSubmitted(true);
      setGameStarted(false);

    }
  }

  const DisplayBox = () => {
    return (
      <div>
        {finalValue ? <DisplayBox2 /> : <h1>Waiting for your answer...</h1>}
        {/* {finalValue === rightAnswer ? <h1>Right</h1> : <h1>Wrong</h1>} */}
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
    setRightAnswer("");
    setSelectedValue("");
    setFinalValue("");
    setFormSubmitted(false);
    setGameStarted(true);
    

  };

  // const handleReset = () => {
  //   setSelectedValue(null);
  //   setFormSubmitted(false);
  // };

  // Temp Components
  const testComponent = () => <h1>TEST</h1>;

  console.log(finalValue);

  return (
    <div className="App">
      <h1> Trivia Question</h1>
      <button onClick={startNewGame}>Start New Game</button>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='trueOption'>True</label>
        <input type="radio" id='trueOption' name='quizBoolean' value='True' onChange={handleChange} />
        <label htmlFor='falseOption'>False</label>
        <input type="radio" id='falseOption' name='quizBoolean' value='False' onChange={handleChange} />
        <br></br>
        <button type='submit' disabled={formSubmitted}>Answer</button>
      </form>
      <DisplayBox />
      <br></br>
      {score}

    </div>
  );
}

export default App;
