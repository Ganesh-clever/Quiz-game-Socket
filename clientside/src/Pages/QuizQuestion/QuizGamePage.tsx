import React, { useEffect, useState } from 'react'
import { SocketConn } from '../../ServerConfig/SocketIo';
import QuestionContainer from './QuestionContainer';
import { BreadCrumbConfig, HeaderTitleHandler } from '../../Redux/Reducers/UtilsReducers';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function QuizGamePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<any | []>([]);
    const [gameStarted, setGameStarted] = useState<any>(false);
    const [userAnswers, setUserAnswers] = useState<any | []>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>();
    const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
    const roomId = useSelector((state: any) => state.UtilsReducer.roomId);
    const [timeRemaining, setTimeRemaining] = useState(10);

    useEffect(() => {
        dispatch(HeaderTitleHandler('Quiz Game'));
        dispatch(BreadCrumbConfig({
            title: 'Quiz Game',
            href: '/quiz-game',
            preventPush: false
        } as any))

        SocketConn.on('gameStarted', (receivedQuestions) => {
            setQuestions(receivedQuestions);
            setGameStarted(true);
            let questionIndex = 0;
            const questionInterval = setInterval(() => {
                if (questionIndex < receivedQuestions.length) {
                    setCurrentQuestion(receivedQuestions[questionIndex]);
                    questionIndex++;
                    setTimeRemaining(10);
                } else {
                    setShowSubmitButton(true);
                    clearInterval(questionInterval);
                }
            }, 10000);
        });

        SocketConn.on('scoresUpdated', (scores, userId) => {
            if (userId == SocketConn.id) {
                const userScore = scores.find((S: any) => S.userId === SocketConn.id);
                if (userScore) {
                    Modal.success({
                        title: 'Quiz session is Completed.',
                        content: (
                            <div className="quiz-score-container">
                                <div className="quiz-point">Your total points is : {userScore.score}</div>
                            </div>
                        ),
                        okButtonProps: {
                            style: {
                                background: '#0D1282',
                                borderColor: '#0D1282',
                            }
                        },
                        okText: 'Back To Lobby',
                        onOk: (() => navigate('/quiz-slots'))

                    });
                }
            }
        });
        return () => {
            SocketConn.off('scoresUpdated'); 
          };
    }, []);

    useEffect(() => {
        if (currentQuestion && timeRemaining > 0) {
          const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [currentQuestion, timeRemaining]);


    const handleSelectOption = (questionIndex: any, selectedOption: any) => {
        setUserAnswers((prevAnswers: any) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = selectedOption;
            return updatedAnswers;
        });
    };

    return (
        <div className='quiz-game-container'>
            {gameStarted ? (
                <div className='quiz-game-wrapper'>
                    {currentQuestion ? (
                        <QuestionContainer
                            question={currentQuestion.question}
                            options={currentQuestion.options}
                            onSelectOption={(selectedOption: any) =>
                                handleSelectOption(questions.indexOf(currentQuestion), selectedOption)
                            }
                        />
                    ) : (
                        <p className='random-question'>Quiz questions is generating...</p>
                    )}
                    {currentQuestion && <p className='timer'>Time remaining: {timeRemaining} seconds</p>}
                    {showSubmitButton && (
                        <Button
                            type='primary'
                            className='question-sub-btn'
                            htmlType='submit'
                            onClick={() => SocketConn.emit('submitAnswers', roomId, userAnswers)}
                        >
                            Submit Answers
                        </Button>
                    )}
                </div>
            ) : (
                <p className='waiting-ques'>Waiting for the game to start...</p>
            )}
        </div>
    )
}
