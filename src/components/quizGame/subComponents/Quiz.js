import React from 'react';
import Button from './buttons';

export default function Quiz({ question, key, answers, handleClick }) {
  return (
    <div>
      <div>{question}</div>
      <Button key={key} answers={answers} handleClick={handleClick} />
    </div>
  );
}
