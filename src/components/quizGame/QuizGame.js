import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import QuizzButton from './subComponents/buttons';

export default function Quiz() {
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswer] = useState(['', '', '', '', '']);
  const [answersCounter, setAnswersCounter] = useState(0);
  const [allAnswersAreChosen, setallAnswersAreChosen] = useState(false);
  const [replay, setReplay] = useState(false);

  function questionsMap(data) {
    return data.map((question, index) => (
      <div key={nanoid()}>
        {question.question}
        <QuizzButton
          key={nanoid()}
          answers={[...question.incorrect_answers, question.correct_answer]}
          handleClick={(event) =>
            setUserAnswer((prevAnswers) => {
              prevAnswers.splice(index, 1, event.target.textContent);
              console.log(userAnswers);
              setallAnswersAreChosen(!userAnswers.includes(''));
              return prevAnswers;
            })
          }
        />
      </div>
    ));
  }
  useEffect(
    () =>
      async function fetchData() {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();

        setQuestions(data.results);
      },
    [replay]
  );

  function GameResult() {
    let counter = 0;
    for (let i = 0; i < questions.length; i += 1) {
      if (questions[i].correct_answer === userAnswers[i]) {
        counter += 1;
      }
    }
    setGameIsFinished((prevState) => !prevState);
    setAnswersCounter(counter);
  }

  function playAgain() {
    setGameIsFinished(false);
    setUserAnswer(['', '', '', '', '']);
    setAnswersCounter(0);
    setallAnswersAreChosen(false);
    setReplay((prevState) => !prevState);
  }

  const questionsElements = questionsMap(questions);

  return (
    <div>
      {questionsElements}

      {gameIsFinished ? (
        <div>
          <button type="button" onClick={playAgain}>
            {' '}
            play again
          </button>
          <div>{answersCounter}</div>
        </div>
      ) : (
        allAnswersAreChosen && (
          <button type="button" onClick={GameResult}>
            {' '}
            see result
          </button>
        )
      )}
    </div>
  );
}
