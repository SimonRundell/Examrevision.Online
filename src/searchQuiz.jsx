import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd';

function SearchQuiz({ config, setCurrentQuiz, setQuizType }) {
    const [quizCode, setQuizCode] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

  
    const handleQuizCodeSubmit = (e) => {
        e.preventDefault();
        console.log('Entered Quiz Code:', quizCode);
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
              const quizType = data.quizType;
              console.log('Quiz Type Returned:', quizType);
              setCurrentQuiz(quizCode);
              setQuizType(quizType);
            } catch (error) {
              messageApi.error('Failed to fetch quiz type. Please try again.');
              console.error('There was an error fetching the quiz type:', error);
            }
        };
        fetchQuiz();
      };

  return (
    <>
      {contextHolder}
      <form onSubmit={handleQuizCodeSubmit}>
                    <label>
                      Enter Quiz Code:
                      <div className="topgap"><input 
                        type="text" 
                        value={quizCode} 
                        onChange={(e) => setQuizCode(e.target.value)} 
                        required 
                        className="large-input"
                        placeholder="------"
                      />
                      </div>
                    </label>
                    <div className="topgap"><button type="submit">Start Quiz</button></div>
        </form>
    </>
  );
}

export default SearchQuiz;
