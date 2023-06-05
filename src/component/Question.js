import React from "react";
import {decode} from 'html-entities';

export default function Question(props) {
  //object destructuring of props data
  const {options, submit, correctanswer, handleOptionChange, question} = props;

  //store optios in variable
  const answersElement = options.map((option, optionIndex) => {
    // set id to show whether answer is right or wrong
    let id = null
    if(submit) {
      if(correctanswer === option){
        id = "correct"
      } else  {
        id = "incorrect"
      }
    }
    
    return (
      <div className="option" key={optionIndex}>
        <input
          id={id}
          type="radio"
          value={decode(option)}
          name={decode(correctanswer)}
          onChange = {() => handleOptionChange(decode(option), question.id)}
        />
        {decode(option)}
      </div>
    );
  })
  
  // console.log(options);
  return (
    <div className="question-container">
      <h1 className="question">{decode(question.question)}</h1>
      <div className="answers">
        {answersElement}
      </div>
    </div>
  );
}
