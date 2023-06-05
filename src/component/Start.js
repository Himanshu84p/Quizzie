import React from "react";

export default function Start(props){
    return (
        <div className="start-quiz">
            <h1 className="start-title">Quizzie</h1>
            <h2 className="start-info">Play Quizzie and gain Knowledge</h2>
            {props.questions && <button className="btn" onClick={props.onChange}>Play Quiz</button>}
        </div>
    )
}