import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { message, Spin } from 'antd';

function DoQuiz({ config, currentUser, quizCode, setCurrentQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [header, setHeader] = useState('');
  const [questionSetIndex, setQuestionSetIndex] = useState(0);
  const [totalQuestionSets, setTotalQuestionSets] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
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

        if (data && typeof data.quizData === 'object' && Array.isArray(data.quizData.QuestionSets)) {
          const quiz = {
            ...data,
            quizData: data.quizData
          };
          console.log('getQuiz Response:', quiz);
          setQuizzes([quiz]);

          // Parse questions and answers for the first QuestionSet
          const firstQuestionSet = quiz.quizData.QuestionSets[0];
          console.log('firstQuestionSet:', firstQuestionSet);
          const parsedQuestions = firstQuestionSet.QuestionAnswerPairs.map(pair => ({
            text: pair.Question,
            answer: null,
            correctAnswer: pair.Answer,
            answered: false
          }));

          // Shuffle the answers
          const shuffledAnswers = firstQuestionSet.QuestionAnswerPairs.map(qap => qap.Answer);
          for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
          }

          const parsedAnswers = shuffledAnswers.map((answer, index) => ({
            text: answer,
            x: 0,
            y: index * 130,
            dropped: false,
            display: 'block'
          }));

          setQuestions(parsedQuestions);
          setAnswers(parsedAnswers);
          setTotalQuestionSets(quiz.quizData.QuestionSets.length);
          setTotalQuestions(quiz.quizData.QuestionSets.reduce((acc, set) => acc + set.QuestionAnswerPairs.length, 0));
          setHeader(firstQuestionSet.Header);
        } else {
          console.error('Error: Expected an object with an array of QuestionSets but received:', data);
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

  const onDragStart = (event, answer) => {
    console.log('Drag start:', answer);
    event.dataTransfer.setData('text/plain', JSON.stringify(answer));
  };

  const onDrop = (event, question) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent the event from propagating to the parent elements
    console.log('Drop event triggered');
    const answerData = event.dataTransfer.getData('text/plain');
    console.log('answerData:', answerData); // Log the answerData
    if (!answerData) return;

    const answer = JSON.parse(answerData);
    console.log('Drop:', answer, 'on question:', question);

    // Prevent further processing if the answer has already been dropped
    if (answer.dropped) return;

    // If the question already has an answer, return it to the answers column
    if (question.answer) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((a) =>
          a.text === question.answer ? { ...a, x: 0, y: prevAnswers.length * 30, dropped: false, display: 'block' } : a
        )
      );
    }

    // Update the dropped flag and position immediately to prevent further processing
    setAnswers((prevAnswers) =>
      prevAnswers.map((a) =>
        a.text === answer.text ? { ...a, x: event.clientX, y: event.clientY, dropped: true, display: 'none' } : a
      )
    );

    if (question) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.text === question.text ? { ...q, answer: answer.text, answered: true } : q
        )
      );

      // Update the score if the answer is correct
      if (answer.text === question.correctAnswer) {
        setMyScore((prevScore) => prevScore + 1);
        setQuestionsAnswered((prevQuestionsAnswered) => prevQuestionsAnswered + 1);
        if (myScore + 1 === totalQuestions) {
          setIsQuizComplete(true);
        }
        updateStatus(); // Update the quiz status on the database
      }

    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const isCorrect = (question) => {
    return question.answer === question.correctAnswer;
  };

  const nextQuestionSet = () => {
    const newIndex = (questionSetIndex + 1) % totalQuestionSets;
    setQuestionSetIndex(newIndex);
    loadQuestionSet(newIndex);
  };

  const loadQuestionSet = (index) => {
    const quiz = quizzes[0];
    const questionSet = quiz.quizData.QuestionSets[index];
    const parsedQuestions = questionSet.QuestionAnswerPairs.map(pair => ({
      text: pair.Question,
      answer: null,
      correctAnswer: pair.Answer,
      answered: false
    }));

    // Shuffle the answers
    const shuffledAnswers = questionSet.QuestionAnswerPairs.map(qap => qap.Answer);
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }

    const parsedAnswers = shuffledAnswers.map((answer, index) => ({
      text: answer,
      x: 0,
      y: index * 130,
      dropped: false,
      display: 'block'
    }));

    setQuestions(parsedQuestions);
    setAnswers(parsedAnswers);
    setHeader(questionSet.Header);
  };

  const updateStatus = async () => {

    const jsonData = { studentID: currentUser.id, 
                       quizCode: quizCode, 
                       quizComplete: 0, 
                       score: myScore };
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
      { questions.length > 0 && (
        <>
          <div className="button-bar">
            <button onClick={() => setCurrentQuiz(null)}>Back to Menu</button>
            <button onClick={nextQuestionSet}>Next Questions</button>
          </div>
          <div className="header">
            {!header && <h2>Loading Questions...</h2>}
            <h2>{header}</h2>
            <p>Score: {myScore} | Questions Answered: {questionsAnswered} / {totalQuestions}</p>
          </div>
          <div className="main-container">
            <div className="questions">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`question-card ${question.answer ? (isCorrect(question) ? 'correct' : 'incorrect') : ''}`}
                  onDrop={(event) => onDrop(event, question)}
                  onDragOver={onDragOver}
                >
                  {question.text}
                  {question.answer && <div className="answer-card">{question.answer}</div>}
                </div>
              ))}
            </div>
            <div className="answers">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className="answer-card"
                  draggable
                  onDragStart={(event) => onDragStart(event, answer)}
                  style={{ left: `${answer.x}px`, top: `${answer.y}px`, display: answer.dropped ? 'none' : 'block' }}
                >
                  {answer.text}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {isQuizComplete && (
        <div className="modal">
          <div className="modal-content">
          <h2>Quiz Complete!</h2>
          <p>Your final score is {myScore} out of {totalQuestions}</p>
          <button onClick={() => setCurrentQuiz(null)}>Back to Menu</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoQuiz;