import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd';

function generateQuizCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

const MultipleChoice = ({ config, currentUser }) => {
    const [questions, setQuestions] = useState([
        { question: '', answers: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const [currentQuizCode, setCurrentQuizCode] = useState('');
    const [currentQuizName, setCurrentQuizName] = useState('');
    const [currentQuizDescription, setCurrentQuizDescription] = useState('');
    const [currentQuizSubject, setCurrentQuizSubject] = useState('');
    const [currentQuizTopic, setCurrentQuizTopic] = useState('');
    const [currentQuizUnit, setCurrentQuizUnit] = useState('');
    const [currentQuizYear, setCurrentQuizYear] = useState('');

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const handleSubmit = () => {
        const currentQuizCode = generateQuizCode();
        const quizData = {
            quizType: 2,
            quizCode: currentQuizCode,
            quizName: currentQuizName,
            quizDescription: currentQuizDescription,
            quizSubject: currentQuizSubject,
            quizTopic: currentQuizTopic,
            quizUnit: currentQuizUnit,
            quizYear: currentQuizYear,
            quizSetBy: currentUser.id,
            quizData: questions
        };

        axios.post(config.api + '/insertQuiz.php', quizData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('Response:', response.data);
            message.success('Quiz created');
        }).catch(error => {
            console.error('Error:', error);
            message.error('Error creating quiz');
        });
    };

    return (
        <div>
            <div className="edit-quiz">
                <table className="edit-quiz-table">
                    <tbody>
                        <tr>
                            <td>Quiz Code: </td>
                            <td colSpan="2">
                                <input
                                    className="input-box wide-input"
                                    type="text"
                                    disabled
                                    value='automatic'
                                    onChange={(e) => setCurrentQuizCode(e.target.value)}
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Name of Quiz: </td>
                            <td colSpan="3">
                                <input
                                    className="input-box"
                                    type="text"
                                    value={currentQuizName}
                                    onChange={(e) => setCurrentQuizName(e.target.value)}
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Description: </td>
                            <td colSpan="3">
                                <textarea
                                    className="input-box"
                                    value={currentQuizDescription}
                                    onChange={(e) => setCurrentQuizDescription(e.target.value)}
                                    style={{ width: '100%', height: '100%' }} // Ensure the textarea fills the available space
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Subject: </td>
                            <td  colSpan="3">
                                <input
                                    className="input-box"
                                    type="text"
                                    value={currentQuizSubject}
                                    onChange={(e) => setCurrentQuizSubject(e.target.value)}
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>Topic: </td>
                            <td colSpan="3">
                                <input
                                    className="input-box"
                                    type="text"
                                    value={currentQuizTopic}
                                    onChange={(e) => setCurrentQuizTopic(e.target.value)}
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            
                            <td>
                                Unit:
                                <input
                                    className="input-box"
                                    type="text"
                                    value={currentQuizUnit}
                                    onChange={(e) => setCurrentQuizUnit(e.target.value)}
                                />
                            </td>
                            <td>
                                Year:
                                <input
                                    className="input-box"
                                    type="text"
                                    value={currentQuizYear}
                                    onChange={(e) => setCurrentQuizYear(e.target.value)}
                                />
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="boundary-row"></tr>
                        {questions.map((q, qIndex) => (
                            <React.Fragment key={qIndex}>
                                <tr>
                                    <td colSpan="2" style={{ verticalAlign: 'top' }}>
                                        <textarea
                                            placeholder="Enter question"
                                            value={q.question}
                                            rows={8}
                                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                            style={{ width: '100%', height: '100%' }} // Ensure the textarea fills the available space
                                        />
                                    </td>
                                    <td>&nbsp;</td>
                                    <td style={{ verticalAlign: 'top' }}>
                                        {q.answers.map((a, aIndex) => (
                                            <input type="text"
                                                className="bottomgap"
                                                key={aIndex}
                                                placeholder={`Answer ${aIndex + 1}`}
                                                value={a}
                                                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                            />
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Correct Answer is <select
                                            className="select-box"
                                            value={q.correctAnswer}
                                            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                                        >
                                            {q.answers.map((_, aIndex) => (
                                                <option key={aIndex} value={aIndex}>
                                                    {`Answer ${aIndex + 1}`}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>                                    
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <button onClick={addQuestion}>Add Question</button>
                <button onClick={handleSubmit}>Submit Quiz</button>
            </div>
        </div>
    );
};

export default MultipleChoice;