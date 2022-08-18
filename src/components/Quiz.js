import React, { useState } from 'react';

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

  const answerElements = answers.map((element) => {
    const isAnswerSelected = element === lastClickedButton;
    return (
      <button
        type="button"
        onClick={() => eventHandler(element, element === correctAnswer)}
        key={element}
        style={{ backgroundColor: isAnswerSelected ? 'red' : '' }}
      >
        {element}
      </button>
    );
  });

  return (
    <div>
      <div>{question}</div>

      <div>{answerElements}</div>
    </div>
  );
}
