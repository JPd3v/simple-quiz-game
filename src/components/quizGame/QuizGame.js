import React, { useState, useEffect } from 'react';

import Quiz from '../Quiz';

export default function QuizApp() {
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [userAnswers, setUserAnswer] = useState({});
  const [score, setScore] = useState(0);
  const [replay, setReplay] = useState(false);

  function handleQuestionAnswered(question, isCorrect) {
    console.log(question);
    setUserAnswer((prevAnswers) => ({ ...prevAnswers, [question]: isCorrect }));
  }

  function questionsMap(data, callBack) {
    return data.map((question) => (
      <div key={question.question}>
        <Quiz
          question={question.question}
          answers={[...question.incorrect_answers, question.correct_answer]}
          correctAnswer={question.correct_answer}
          userAnswers={userAnswers}
          handleClick={callBack}
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

  function gameResult() {
    let correctAnswers = 0;
    for (const key in userAnswers) {
      if (userAnswers[key] === true) {
        correctAnswers += 1;
      }
    }

    console.log(correctAnswers);
    setScore(correctAnswers);
    setGameIsFinished(true);
  }

  function playAgain() {
    setGameIsFinished(false);
    setUserAnswer(['', '', '', '', '']);

    setReplay((prevState) => !prevState);
  }

  const questionsElements = questionsMap(questions, handleQuestionAnswered);

  return (
    <div>
      {questionsElements}

      {gameIsFinished ? (
        <div>
          <button type="button" onClick={playAgain}>
            {' '}
            play again
          </button>
          <div>{score}</div>
        </div>
      ) : (
        <button type="button" onClick={gameResult}>
          {' '}
          see result
        </button>
      )}
    </div>
  );
}
