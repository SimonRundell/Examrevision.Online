import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';

const EditMultipleChoice = ({ config, currentUser, quizCode, setEditQuiz }) => {
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
          const jsonData = JSON.stringify({quizCode: quizCode});
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
    
            if (data && typeof data.quizData === 'object') {
              const quiz = {
                ...data,
                quizData: data.quizData
              };
              console.log('editQuiz Response:', quiz);
    
              // Parse all questions and answers for multiple choice quizzes
              const parsedQuestions = quiz.quizData.map(item => ({
                question: item.question,
                answers: item.answers,
                correctAnswer: item.correctAnswer
              }));
    
              console.log('parsedQuestions:', parsedQuestions);
    
              setQuestions(parsedQuestions);
              setCurrentQuizCode(quiz.quizCode);
              setCurrentQuizName(quiz.quizName);
              setCurrentQuizDescription(quiz.quizDescription);
              setCurrentQuizSubject(quiz.quizSubject);
              setCurrentQuizTopic(quiz.quizTopic);
              setCurrentQuizUnit(quiz.quizUnit);
              setCurrentQuizYear(quiz.quizYear);
              setIsLoading(false); // Set isLoading to false after data is processed
            } else {
              console.error('Error: Expected an object but received:', data);
              message.error('Error fetching quiz');
              setIsLoading(false); // Set isLoading to false in case of error
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              message.error('The code entered is not correct');
            } else {
              console.error('Error:', error);
            }
            setIsLoading(false); // Set isLoading to false in case of error
          }
        };
        fetchQuiz();
      }, [config.api, quizCode]);

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

    const deleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const moveQuestion = (index, direction) => {
        const updatedQuestions = [...questions];
        const [movedQuestion] = updatedQuestions.splice(index, 1);
        updatedQuestions.splice(index + direction, 0, movedQuestion);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
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

        axios.post(config.api + '/updateQuiz.php', quizData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('Response:', response.data);
            message.success('Quiz updated');
        }).catch(error => {
            console.error('Error:', error);
            message.error('Error updating quiz');
        });
    };

    return (
        <div>
            {isLoading && <div className="centre-spin"><Spin size="large" /></div>}
            {!isLoading && (
                <div className="edit-quiz">
                    <button onClick={() => setEditQuiz(null)}>Back</button>
                    <table className="edit-quiz-table">
                        <tbody>
                            <tr>
                                <td>Quiz Code: </td>
                                <td colSpan="2">
                                    <input
                                        className="input-box wide-input"
                                        type="text"
                                        disabled
                                        value={currentQuizCode}
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
                                        <td>
                                            <button className="small-button" onClick={() => moveQuestion(qIndex, -1)} disabled={qIndex === 0}>
                                                <ArrowUpOutlined />
                                            </button>
                                            <button className="small-button" onClick={() => moveQuestion(qIndex, 1)} disabled={qIndex === questions.length - 1}>
                                                <ArrowDownOutlined />
                                            </button>
                                            <button className="small-button" onClick={() => deleteQuestion(qIndex)}>
                                                <DeleteOutlined />
                                            </button>
                                        </td>                                    
                                    </tr>
                                    <tr className="boundary-row"></tr>
                                </React.Fragment>
                                
                            ))}
                        </tbody>
                    </table>
                    <button onClick={addQuestion}>New Question</button> &nbsp;&nbsp;
                    <button onClick={handleSubmit}>Save Quiz</button>
                </div>
            )}
        </div>
    );
};

export default EditMultipleChoice;