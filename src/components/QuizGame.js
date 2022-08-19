import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';

export default function QuizApp() {
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswer] = useState({});
  const [score, setScore] = useState(0);
  const [replay, setReplay] = useState(false);

  function handleQuestionAnswered(question, isCorrect) {
    setUserAnswer((prevAnswers) => ({ ...prevAnswers, [question]: isCorrect }));
  }

  function questionsMap(data, callBack) {
    return data.map((question) => (
      <div key={question.question} className="question">
        <Quiz
          question={question.question}
          answers={[...question.incorrect_answers, question.correct_answer]}
          correctAnswer={question.correct_answer}
          userAnswers={userAnswers}
          handleClick={callBack}
          gameIsFinished={gameIsFinished}
        />
      </div>
    ));
  }

  useEffect(
    () =>
      async function fetchData() {
        try {
          const response = await fetch('https://opentdb.com/api.php?amount=5');
          const data = await response.json();

          setQuestions(data.results);
        } catch (error) {
          console.log(error);
        }
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

    setScore(correctAnswers);
    setGameIsFinished(true);
  }

  function playAgain() {
    setGameIsFinished(false);
    setUserAnswer({});

    setReplay((prevState) => !prevState);
  }

  const questionsElements = questionsMap(questions, handleQuestionAnswered);

  return (
    <div className="questions-container ">
      {questionsElements}

      {gameIsFinished ? (
        <div className="game-results">
          <div>{`You scored ${score}/5 correct answers`}</div>
          <button type="button" onClick={playAgain} className="btn-play-again">
            {' '}
            play again
          </button>
        </div>
      ) : (
        Object.keys(userAnswers).length >= 5 && (
          <div className="game-results">
            <button
              type="button"
              onClick={gameResult}
              className="btn-check-answers"
            >
              {' '}
              Check answers
            </button>
          </div>
        )
      )}
    </div>
  );
}
