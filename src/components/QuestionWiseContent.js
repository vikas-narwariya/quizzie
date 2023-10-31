import React, { useState, useEffect } from "react";
import axios from "axios";

function QuestionWiseContent() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const quizId = window.location.pathname.split("/")[2];
    console.log(quizId);
    // Make an API request to your backend when the component mounts
    axios
      .get(`http://localhost:5000/api/quizzes/read/${quizId}`) // Replace with your actual API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, []);
  console.log(data);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    axios
      .get(`http://localhost:5000/api/questions/${data._id}`) // Replace with your actual API endpoint
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API request failed", error);
        setLoading(false);
      });
  }, [data]);
  console.log(questions);

  const questionData = [
    {
      title: "Quiz 2 Question Analysis",
      createdOn: "04 Sep, 2023",
      impressions: 667,
      questions: [
        {
          questionText: "Q.1 Question place holder for analysis?",
          attempts: 60,
          correctAnswers: 38,
          incorrectAnswers: 22,
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          attempts: 60,
          correctAnswers: 38,
          incorrectAnswers: 22,
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          attempts: 60,
          correctAnswers: 38,
          incorrectAnswers: 22,
        },
        {
          questionText: "Q.1 Question place holder for analysis?",
          attempts: 60,
          correctAnswers: 38,
          incorrectAnswers: 22,
        },
        // Add more questions here if needed
      ],
    },
    // Add more quizzes here if needed
  ];

  return (
    <div className="content">
      <div className="q-title4-wrap">
        <div className="q-title4">{data.title}</div>
        <div className="q-text4">
          Created on: {data.createdAt}
          <br />
          Impressions: {data.impressionCount}
        </div>
      </div>
      <div className="q-questions-container">
        {questions.map((question, index) => (
          <div key={index + 1}>
            <>
              <div className="q-question1">{question.text}</div>
              <div className="q-question-cards1">
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.attempts}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Attempted the question
                  </span>
                </div>
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.correctAnswers}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Answered correctly
                  </span>
                </div>
                <div className="q-question-card1">
                  <span className="q-question-card-num">
                    {question.incorrectAnswers}
                  </span>
                  <br />
                  <span className="q-question-card-text">
                    people Answered Incorrectly
                  </span>
                </div>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionWiseContent;
