import React, { useState, useMemo } from 'react';

export default function Quiz({
  question,
  answers,
  handleClick,
  correctAnswer,
}) {
  const [lastClickedButton, setLastClickedButton] = useState('');
  function eventHandler(answer, isCorrect) {
    setLastClickedButton(answer);
    handleClick(question, isCorrect);
  }

  const shufledArray = useMemo(
    () => [...answers].sort(() => (Math.random() > 0.5 ? 1 : -1)),
    [question]
  );

  const answerElements = shufledArray.map((element) => {
    const isAnswerSelected = element === lastClickedButton;
    return (
      <button
        type="button"
        onClick={() => eventHandler(element, element === correctAnswer)}
        key={element}
        style={{ backgroundColor: isAnswerSelected ? '#8497ff' : '' }}
      >
        {element}
      </button>
    );
  });

  return (
    <>
      <div>{question}</div>

      <div className="answer-buttons-container">{answerElements}</div>
    </>
  );
}
