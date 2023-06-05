import "./App.css";
import Start from "./component/Start";
import Question from "./component/Question";
import blob from "./images/blob.svg";
import blobs from "./images/blobs.svg";
import React from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

function App() {
  const [quiz, setQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState();
  const [score, setScore] = React.useState(0);
  const [submit, setSubmit] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [optionUpdate, setOptionUpdate] = React.useState(false);

  //shuffleArray for shuffling options randomly
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple"
        )
      ).json();

      // set state when the data received
      const q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          question: decode(question.question),
          correct: decode(question.correct_answer),
          answers: shuffleArray([
            ...question.incorrect_answers,
            decode(question.correct_answer),
          ]),
          selectedanswer: "",
        });
      });
      //setting questions in the state
      setQuestions(q);
    };

    dataFetch();
  }, [quiz]);

  //on answer change set selectedanswer property of question state
  const handleOptionChange = (option, id) => {
    setQuestions((questions) =>
      questions.map((question) => {
        return question.id === id
          ? { ...question, selectedanswer: option }
          : question;
      })
    );
    //if option changed then it will update state value
    setOptionUpdate(!optionUpdate);
  };

  //checking for all question attemted or not

  useEffect(() => {
    const checkedArray = questions
      ? questions.filter((question) => {
          if (question.selectedanswer === "") {
            return question;
          }
        })
      : [1];//passing 1 for length of array not to be 0

    if (checkedArray.length === 0) {
      setChecked(true);
    }

    
    
  }, [optionUpdate]);

  const handleCheck = () => {
    //if all question attempted then it will execute
    if (checked) {
      if (submit) {
        setQuiz(false);
      }
      questions.map((question) => {
        if (question.correct === question.selectedanswer) {
          setScore((score) => score + 1);
        }
      });
      setSubmit(true);
    }
  };
  //   console.log(score)
  // console.log(questions)

  //setting variable for all question on passing props to Question component
  const allQuestions = questions
    ? questions.map((question) => {
        const options = question.answers;
        return (
          <Question
            key={question.id}
            question={question}
            correctanswer={question.correct}
            options={options}
            submit={submit}
            handleOptionChange={handleOptionChange}
          />
        );
      })
    : [];

  //play quiz btn func
  function onChange() {
    setQuiz(true);
    setQuestions([]);
    setSubmit(false);
    setScore(0);
    setChecked(false);
    
  }
  return (
    <div className="main">
      <img className="start-image1 img" src={blob} alt="image" />
      <img className="start-image2 img" src={blobs} alt="image" />

      {quiz ? (
        <div>
          <h1 className="start-heading">Quizzie</h1>
          <div className="main-container">{allQuestions}</div>
          {checked ? (
            <p></p>
          ) : (
            <p className="bottom-text">
              please Attempt all questions To Submit
            </p>
          )}
          {submit ? (
            <p className="bottom-text">You have Scored {score} out of 5</p>
          ) : (
            <p></p>
          )}
          <button className="btn" type="submit" onClick={handleCheck}>
            {submit ? "Play Again" : "Submit"}
          </button>
        </div>
      ) : (
        <Start onChange={onChange} questions={questions} />
      )}
    </div>
  );
}

export default App;
