import React, { useState } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from '@ant-design/icons';

function generateQuizCode() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function NewQuiz({ config, currentUser, setNewQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentQuizName, setCurrentQuizName] = useState('');
  const [currentQuizDescription, setCurrentQuizDescription] = useState('');
  const [currentQuizSubject, setCurrentQuizSubject] = useState('');
  const [currentQuizTopic, setCurrentQuizTopic] = useState('');
  const [currentQuizUnit, setCurrentQuizUnit] = useState('');
  const [currentQuizYear, setCurrentQuizYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleHeaderChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);
  };

  const addQuestionAnswerPair = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const deleteQuestionAnswerPair = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const moveQuestionAnswerPair = (index, direction) => {
    const updatedQuestions = [...questions];
    const [movedPair] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(index + direction, 0, movedPair);
    setQuestions(updatedQuestions);
  };

  const saveQuiz = async () => {
    setIsLoading(true);
    // Rebuild the JSON dataset
    const questionSets = [];
    for (let i = 0; i < questions.length; i += 4) {
      const questionAnswerPairs = questions.slice(i, i + 4).map(qa => ({
        Question: qa.question,
        Answer: qa.answer
      }));
      questionSets.push({
        Header: headers[Math.floor(i / 4)] || `Question Group ${Math.floor(i / 4) + 1}`,
        QuestionAnswerPairs: questionAnswerPairs
      });
    }

    const newQuizData = {
      quizType: 1,
      quizName: currentQuizName,
      quizDescription: currentQuizDescription,
      quizSubject: currentQuizSubject,
      quizTopic: currentQuizTopic,
      quizUnit: currentQuizUnit,
      quizYear: currentQuizYear,
      quizSetBy: currentUser.id,
      quizData: {
        QuestionSets: questionSets
      },
      quizCode: generateQuizCode()
    };

    console.log('New Quiz Data:', newQuizData);

    try {
      const response = await axios.post(config.api + '/insertQuiz.php', newQuizData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      console.log('Insert Quiz Response:', data);
      setIsLoading(false);
      message.success(data.message);
      setNewQuiz(null);
    } catch (error) {
      console.error('Error inserting quiz:', error);
      messageApi.error('Error inserting quiz: ' + error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      { isLoading && <div className="centre-spin"><Spin size="large" /></div> }
      { !isLoading && (
        <>
          <button onClick={() => setNewQuiz(null)}>Back</button>
          <div className="edit-quiz">
            <table className="edit-quiz-table">
              <tbody>
                <tr>
                  <td>Name of Quiz: </td>
                  <td><input className="input-box" type="text" value={currentQuizName} onChange={(e) => setCurrentQuizName(e.target.value)} /></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>Description: </td>
                  <td colSpan="2"><input className="input-box" type="text" value={currentQuizDescription} onChange={(e) => setCurrentQuizDescription(e.target.value)} /></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>Subject: </td>
                  <td><input className="input-box" type="text" value={currentQuizSubject} onChange={(e) => setCurrentQuizSubject(e.target.value)} /></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>Topic: </td>
                  <td><input className="input-box" type="text" value={currentQuizTopic} onChange={(e) => setCurrentQuizTopic(e.target.value)} /></td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>Unit:<input className="input-box" type="text" value={currentQuizUnit} onChange={(e) => setCurrentQuizUnit(e.target.value)} /></td>
                  <td>Year:<input className="input-box" type="text" value={currentQuizYear} onChange={(e) => setCurrentQuizYear(e.target.value)} /></td>
                </tr>
                <tr className="boundary-row"></tr>
                {questions.map((qa, index) => (
                  <React.Fragment key={index}>
                    {index % 4 === 0 && (
                      <tr key={`header-${index / 4}`}>
                        <td colSpan="3">
                          <input
                            className="input-box"
                            type="text"
                            value={headers[Math.floor(index / 4)] || ''}
                            onChange={(e) => handleHeaderChange(Math.floor(index / 4), e.target.value)}
                            placeholder="Header"
                          />
                        </td>
                      </tr>
                    )}
                    <tr key={index} className={index % 4 === 3 ? 'boundary-row' : ''}>
                      <td>
                        <textarea
                          className="input-box"
                          value={qa.question}
                          onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                          placeholder="Question"
                          rows="3"
                        />
                      </td>
                      <td>
                        <textarea
                          className="input-box"
                          value={qa.answer}
                          onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                          placeholder="Answer"
                          rows="3"
                        />
                      </td>
                      <td>
                        <button className="small-button" onClick={() => moveQuestionAnswerPair(index, -1)} disabled={index === 0}>
                          <ArrowUpOutlined />
                        </button>
                        <button className="small-button" onClick={() => moveQuestionAnswerPair(index, 1)} disabled={index === questions.length - 1}>
                          <ArrowDownOutlined />
                        </button>
                        <button className="small-button" onClick={() => deleteQuestionAnswerPair(index)}>
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr>
                  <td colSpan="3">
                    <button onClick={addQuestionAnswerPair}>Add Question/Answer Pair</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <button onClick={saveQuiz}>Save</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>&nbsp;</div>
          </div>
        </>
      )}
    </>
  );
}

export default NewQuiz;
