import React from 'react';
import { nanoid } from 'nanoid';

export default function QuizButtons({ answers, handleClick }) {
  const answerElements = answers.map((element) => (
    <button type="button" onClick={handleClick} key={nanoid()}>
      {element}
    </button>
  ));

  return <div>{answerElements}</div>;
}
