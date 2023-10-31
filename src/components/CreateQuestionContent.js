import React, { useState, useEffect } from "react";
import QuizPublish from "./QuizPublish";
import axios from "axios";

function CreateQuestionContent({
  isOpen,
  onClose,
  onContinue,
  quizType,
  handleCreateQuiz,
  quizId,
}) {
  const [selectedOption, setSelectedOption] = useState("text");
  const [options, setOptions] = useState([
    { seq: 1, isCorrect: false },
    { seq: 2, isCorrect: false },
  ]);

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: [],
      intervalTime: 0,
      optionCategory: "text",
      seq: 1,
    },
  ]);
  const [questionText, setQuestionText] = useState("");
  const [intervalTime, setIntervalTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState([1]);
  const [selectQuestion, setSelectQuestion] = useState(1);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddOption = () => {
    if (options.length >= 4) return;
    setOptions([...options, { seq: options.length + 1, isCorrect: false }]);
  };

  const handleDeleteOption = (id) => {
    setOptions((prev) => {
      return prev.filter((opt) => {
        return opt.seq !== id;
      });
    });
  };

  const handleAddQuestion = async () => {
    if (questions.length < 5) {
      const question = {
        questionText,
        intervalTime,
        selectedOption,
        options,
        seq: currentQuestion.length + 1,
      };
      setQuestions([...questions, question]);
      setCurrentQuestion((prev) => {
        const newQuestion = prev.length + 1;
        return [...prev, newQuestion];
      });
      handleReset();
      // const token = localStorage.getItem("userToken");
      // await axios.post(
      //   "http://localhost:5000/api/questions",
      //   {
      //     text: questionText,
      //     options,
      //     timer: intervalTime,
      //     selectedOption,
      //     quizId,
      //   },
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
    } else {
      alert("Maximum limit of 5 questions reached.");
    }
  };

  const handleReset = () => {
    setQuestionText("");
    setIntervalTime(0);
    setSelectedOption("text");
    setOptions([
      { seq: 1, isCorrect: false },
      { seq: 2, isCorrect: false },
    ]);
  };

  useEffect(() => {
    const currentQuestionObject = questions[selectQuestion - 1];
    currentQuestionObject.questionText = questionText;
    currentQuestionObject.intervalTime = intervalTime;
    currentQuestionObject.selectedOption = selectedOption;
    currentQuestionObject.options = options;

    const newQuestions = [...questions];
    newQuestions[selectQuestion - 1] = currentQuestionObject;
    setQuestions(newQuestions);
  }, [questionText, intervalTime, selectedOption, options]);

  const handleDeleteQuestion = (id) => {
    if (questions.length <= 1) {
      // Ensure that at least one question remains
      return;
    }
    setCurrentQuestion((prev) => {
      return prev.filter((que) => {
        return que !== id;
      });
    });

    setQuestions((prev) => {
      let newQuestions = prev.filter((que) => {
        return que.seq !== id;
      });

      newQuestions = newQuestions.map((que, index) => ({
        ...que,
        seq: index + 1,
      }));
      return newQuestions;
    });
  };
  const handleQuestionClick = (questionNum) => {
    setSelectQuestion(questionNum);
  };

  const handleCreateQuizAndContinue = async () => {
    onClose();
    handleCreateQuiz();
    const token = localStorage.getItem("userToken");
    await axios.post(
      "http://localhost:5000/api/questions",
      {
        text: questionText,
        options,
        timer: intervalTime,
        selectedOption,
        quizId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  if (!isOpen) {
    return null;
  }

  console.log(questions);

  return (
    <div className="content">
      <div className="q-modal-container">
        <div className="q-modal">
          <div className="q-modal-content">
            <div className="q-quiz-head">
              <div className="q-quiz-num">
                {currentQuestion.map((num, index) => {
                  return (
                    <span onClick={handleQuestionClick.bind(null, num)}>
                      {index + 1}
                      <div
                        style={{ marginTop: "-50px", marginRight: "-10px" }}
                        onClick={handleDeleteQuestion.bind(null, num)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            d="M9.5553 6.34619L3.46155 12.4399M3.46155 6.34619L9.5553 12.4399"
                            stroke="#474444"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </span>
                  );
                })}
                <span onClick={handleAddQuestion}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                  >
                    <path
                      d="M33.5 14H23V24.5H19.5V14H9V10.5H19.5V0H23V10.5H33.5V14Z"
                      fill="#969696"
                    />
                  </svg>
                </span>
              </div>
              <div className="q-max-text">Max 5 questions</div>
            </div>
            <div className="q-quiz-question1">
              <input
                type="text"
                placeholder="Quiz Question"
                className="q-quiz-question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </div>
            <div className="q-option-type">
              <label>Option Type</label>

              <label class="container">
                <input
                  type="radio"
                  value="text"
                  checked={selectedOption === "text"}
                  onChange={handleOptionChange}
                />{" "}
                Text
              </label>
              <label class="container">
                <input
                  type="radio"
                  value="image"
                  checked={selectedOption === "image"}
                  onChange={handleOptionChange}
                />{" "}
                Image Url
              </label>
              <label class="container">
                <input
                  type="radio"
                  value="textAndImage"
                  checked={selectedOption === "textAndImage"}
                  onChange={handleOptionChange}
                />{" "}
                Text & Image url
              </label>
            </div>

            <div className="q-options-wrap">
              <div className="q-option">
                {selectedOption === "text" && (
                  <>
                    {options.map((opt, ind) => {
                      return (
                        <>
                          <div className="q-option1">
                            <input
                              type="text"
                              placeholder="Text"
                              className="q-option-input"
                            />
                            {ind > 1 && (
                              <span
                                onClick={handleDeleteOption.bind(null, opt.seq)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                    fill="#D60000"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
                {selectedOption === "image" && (
                  <>
                    {options.map((opt, ind) => {
                      return (
                        <>
                          <div className="q-option1">
                            <input
                              type="text"
                              placeholder="Image Url"
                              className="q-option-input"
                            />
                            {ind > 1 && (
                              <span
                                onClick={handleDeleteOption.bind(null, opt.seq)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                    fill="#D60000"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
                {selectedOption === "textAndImage" && (
                  <>
                    {options.map((opt, ind) => {
                      return (
                        <>
                          <div className="q-option1">
                            <input
                              type="text"
                              placeholder="Text"
                              className="q-option-input"
                            />
                            <input
                              type="text"
                              placeholder="Image Url"
                              className="q-option-input"
                            />
                            {ind > 1 && (
                              <span
                                onClick={handleDeleteOption.bind(null, opt.seq)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                    fill="#D60000"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
                <div className="q-option1">
                  {options.length < 4 && (
                    <>
                      <button
                        onClick={handleAddOption}
                        className="q-option-input"
                      >
                        Add Option
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="q-timer-wrap">
                {quizType === "Q&A" && (
                  <div className="q-timer">
                    <div className="q-timer-text">Timer</div>
                    <button onClick={() => setIntervalTime(0)}>Off</button>
                    <button onClick={() => setIntervalTime(5)}>5 sec</button>
                    <button onClick={() => setIntervalTime(10)}>10 sec</button>
                  </div>
                )}
              </div>
            </div>

            <div className="q-modal-button-wrap">
              <button className="q-modal-button2" onClick={onClose}>
                Cancel
              </button>
              <button
                className="q-quiz-continue-btn"
                onClick={handleCreateQuizAndContinue}
              >
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionContent;
