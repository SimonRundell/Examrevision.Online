import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { message, Spin } from 'antd';

function DoMultipleChoice({ config, currentUser, quizCode, setCurrentQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchQuiz = async () => {
      const jsonData = JSON.stringify({ quizCode: quizCode });
      console.log('jsonData:', jsonData);

      try {
        const response = await axios.post(config.api + '/getQuiz.php', jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = JSON.parse(response.data.message);
        if (data && typeof data.quizData === 'string') {
          data.quizData = JSON.parse(data.quizData);
        }

        if (data && Array.isArray(data.quizData)) {
          const quiz = {
            ...data,
            quizData: data.quizData
          };
          console.log('getQuiz Response:', quiz);
          setQuestions(quiz.quizData);
        } else {
          console.error('Error: Expected an array but received:', data);
          messageApi.error('Error fetching quiz');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          messageApi.error('The code entered is not correct');
          setCurrentQuiz(null);
        } else {
          console.error('Error:', error);
        }
      }
    };
    fetchQuiz();
  }, [config.api, quizCode]);

  const handleAnswerClick = (selectedAnswerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswerIndex === parseInt(currentQuestion.correctAnswer)) {
      setMyScore(myScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
      updateStatus();
    }
  };

  const updateStatus = async () => {
    const jsonData = {
      studentID: currentUser.id,
      quizCode: quizCode,
      quizComplete: 1,
      score: myScore
    };
    console.log("Status Update:", jsonData);

    try {
      const response = await axios.post(config.api + '/updateStatus.php', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.log('Response:', data);

      if (data.status_code === 200) {
        console.log('Quiz status updated');
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.error('Error updating quiz status: ' + error.message);
    }
  };


  return (
    <>
      {contextHolder}
      { !questions.length && <div className="centre-spin"><Spin size="large" /></div> }
      { questions.length > 0 && !isQuizComplete && (
        <div className="quiz-container">
            <div className="button-bar">
              <button onClick={() => setCurrentQuiz(null)}>Back to Menu</button>
            </div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <p>Score: {myScore} | Question {currentQuestionIndex + 1} of {questions.length}</p>
          <div className="answers">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswerClick(index)} className={`answer-button answer-button-${index + 1}`}>
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
      { isQuizComplete && (
        <div className="modal">
          <div className="modal-content">
          <h2>Quiz Complete!</h2>
          <p>Your score: {myScore} / {questions.length}</p>
          <button onClick={() => setCurrentQuiz(null)}>Back to Menu</button>
        </div>
        </div>
      )}
    </>
  );
}

export default DoMultipleChoice;
