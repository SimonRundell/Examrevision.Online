import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { message, Spin } from 'antd';
import Login from './login';
import QuizList from './QuizList';
import DoQuiz from './doQuiz';
import DoMultipleChoice from './doMultipleChoice';
import EditQuiz from './editQuiz';
import BrowseQuiz from './browseQuiz';
import MultipleChoice from './multipleChoice';
import EditMultipleChoice from './editMultipleChoice';
import SearchQuiz from './searchQuiz';
import NewQuiz from './newQuiz';

function App() {
  const [config, setConfig] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentUser, setCurrentUser] = useState(null);
  const [quizCode, setQuizCode] = useState('');
  const [quizType, setQuizType] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [editQuiz, setEditQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState(null);
  const [newDropQuiz, setNewDropQuiz] = useState(null);

  useEffect(() => {
    axios.get('/.config.json')
      .then(response => {
        setConfig(response.data);
        // console.log('Config:', response.data);
        messageApi.success('Config loaded');
      })
      .catch(error => {
        console.error('Error fetching config:', error);
        messageApi.error('Error fetching config');
      });
  }, []);

  const logout = () => {
    setCurrentUser(null);
    setQuizCode('');
    setCurrentQuiz(null);
    setEditQuiz(null);
    setNewQuiz(null);
    setNewDropQuiz(null);
    setQuizType('');
  };

  const showNewQuiz = () => {
    messageApi.info('Creating new quiz');
    setNewQuiz(true);
    setEditQuiz(null);
    setCurrentQuiz(null);
  };

  const showNewDropQuiz = () => {
    messageApi.info('Creating new drop quiz');
    setNewDropQuiz(true);
    setEditQuiz(null);
    setCurrentQuiz(null);
  };

  if (config) {
    console.log('Config:', config);
  }

  return (
    <>
      {contextHolder}
      { !config && <div className="centre-spin"><Spin size="large" /></div> }
      { config && !currentUser && (
        <div className="App">
          <Login config={config} setUserDetails={setCurrentUser} />
        </div>
      )}
      { currentUser && (
        <div className="App">
          <div className="app-header">
            <h2>Exam Revision Online</h2>
            <p className="app-username">Welcome <span style={{color: 'white'}}>{currentUser.studentName} {currentUser.schoolName} {currentUser.classNamen}</span></p>
            <button onClick={logout}>Logout</button>
          </div>
          {/* <div className="debug"><div>Teacher: {currentUser.teacher}</div><div>currentQuiz: {currentQuiz}</div><div>quizType: {quizType}</div></div> */}
          { currentUser.admin === 1 && ( 
            <div className="app-admin">
              <h2>Admin Menu</h2>
            </div>
          )}
          { currentUser.teacher === 1 && (
            <div className="app-content">
              { !editQuiz && !newQuiz && (
                <>
                  <h2>Teacher Menu</h2>
                  <button onClick={showNewQuiz}>Create New Multiple Choice Quiz</button> &nbsp;&nbsp;
                  <button onClick={showNewDropQuiz}>Create New Match Definitions Quiz</button>
                  <QuizList config={config} currentUser={currentUser} setEditQuiz={setEditQuiz} setQuizType={setQuizType}/>
                </>
              )}
              { editQuiz && !newQuiz && quizType===1 && (
                <>
                  <h2>Editing Quiz Code <span style={{color: 'white'}}> {editQuiz}</span></h2>
                  <EditQuiz config={config} currentUser={currentUser} quizCode={editQuiz} setEditQuiz={setEditQuiz}/>
                </>
              )}
              { editQuiz && !newQuiz && quizType===2 && (
                <>
                  <h2>Editing Multiple Choice Quiz Code <span style={{color: 'white'}}> {editQuiz}</span></h2>
                  <EditMultipleChoice config={config} currentUser={currentUser} quizCode={editQuiz} setEditQuiz={setEditQuiz}/>
                </>
              )}
              { newQuiz && !editQuiz && !currentQuiz && (
                <>
                  <h2>Creating New Multiple Choice Quiz</h2>
                  <MultipleChoice config={config} currentUser={currentUser} setNewQuiz={setNewQuiz}/>
                </>
              )}
              { newDropQuiz && !editQuiz && !currentQuiz && (
                <>
                  <h2>Creating New Match Definitions Quiz</h2>
                  <NewQuiz config={config} currentUser={currentUser} setNewQuiz={setNewQuiz}/>
                </>
              )}
            </div>
          )}
          { currentUser.teacher === 0 && !currentQuiz && !editQuiz && ( 
            <div className="app-content">
              <h2>Student Menu</h2>
              <div className="two-column-container">
                <div className="enter-quiz-code">
                  <SearchQuiz config={config} setCurrentQuiz={setCurrentQuiz} setQuizType={setQuizType}/>
                </div> 
                <div className="enter-quiz-code">
                  <BrowseQuiz config={config} currentUser={currentUser} setCurrentQuiz={setCurrentQuiz} setQuizType={setQuizType}/>
                </div>
              </div>
            </div>
          )}
          { quizType && (
              <>
                { currentUser.teacher === 0 && currentQuiz && quizType === 1 && ( 
                  <DoQuiz config={config} currentUser={currentUser} quizCode={currentQuiz} setCurrentQuiz={setCurrentQuiz}/>
                )}
                { currentUser.teacher === 0 && currentQuiz && quizType === 2 && ( 
                  <DoMultipleChoice config={config} currentUser={currentUser} quizCode={currentQuiz} setCurrentQuiz={setCurrentQuiz}/>
                )}
              </>
          )}
        </div> // App-Container
      )}
      
    </>
  );
}

export default App;
