import {useEffect, useState} from 'react';
import axios from 'axios';
import {message, Spin, Collapse} from 'antd';

const { Panel } = Collapse;

function QuizList({config, currentUser, setEditQuiz, setQuizType}) {
  const [quizzes, setQuizzes] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    
    const fetchQuizzes = async () => {

    try {
      const response = await axios.post(config.api + '/getAllQuizzes.php',  {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = JSON.parse(response.data.message);
      if (Array.isArray(data)) {
        const decodedQuizzes = data.map(quiz => ({
          ...quiz,
          quizData: typeof quiz.quizData === 'string' ? JSON.parse(quiz.quizData) : quiz.quizData
        }));
        console.log('Available Quizzes:', decodedQuizzes);
        setQuizzes(decodedQuizzes);
      } else {
        console.error('Error: Expected an array but received:', data);
        messageApi.error('Error fetching quizzes');
      }
    } catch (error) {
      console.error('Error:', error);
    }}
    fetchQuizzes();
    
  }, [config.api, currentUser]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      messageApi.success('Quiz code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      messageApi.error('Failed to copy quiz code');
    });
  };

  const editQuiz = (quizCode, quizType) => {
    console.log('Edit Quiz:', quizCode, "Type:", quizType);
    setEditQuiz(quizCode);
    setQuizType(quizType);
  };

  const getNumberOfQuestions = (quiz) => {
    if (quiz.quizType === 1) {
      return quiz.quizData.QuestionSets.reduce((acc, set) => acc + set.QuestionAnswerPairs.length, 0);
    } else if (quiz.quizType === 2) {
      return quiz.quizData.length;
    }
    return 0;
  };

  return (
    <>
    {contextHolder}
    { !quizzes && <Spin size="large" /> }
    { quizzes && (
        <>
        <p>Your Quizzes</p>
        <Collapse accordion ghost>
          {quizzes.map(quiz => (
            <Panel header={`${quiz.quizName} (${quiz.quizTopic}) Year: ${quiz.quizYear} ${quiz.quizUnit ? `Unit: ${quiz.quizUnit}` : ''}`} key={quiz.id}>
              <div className="notopgap">Quiz Code: {quiz.quizCode} <span className="gapLeft"><button onClick={() => copyToClipboard(quiz.quizCode)}>Copy Code</button></span></div>
              <div className="notopgap">{quiz.quizDescription}</div>
              <div className="notopgap">Quiz Type: {quiz.quizType === 1 ? 'Match Definitions' : quiz.quizType === 2 ? 'Multiple Choice' : `Type ${quiz.quizType}`}</div>
              <div className="notopgap">Questions: {getNumberOfQuestions(quiz)}</div>
              <div className="topgap"><button className="standard-button" onClick={() => editQuiz(quiz.quizCode, quiz.quizType)}>Edit</button></div>
              <hr />
            </Panel>
          ))}
        </Collapse>
        </>
    )}
    </>
  );
}

export default QuizList;