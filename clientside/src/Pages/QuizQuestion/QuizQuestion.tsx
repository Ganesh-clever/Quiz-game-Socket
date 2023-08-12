import React, { useEffect, useState } from 'react'
import { BreadCrumbConfig, HeaderTitleHandler, RoomHandler } from '../../Redux/Reducers/UtilsReducers';
import { useDispatch, useSelector } from 'react-redux';
import { Button, notification } from 'antd';
import QuizCreateRoomModal from './QuizCreateRoomModal';
import { SocketConn } from '../../ServerConfig/SocketIo';
import { GetAllQuizRoom } from '../../Redux/Actions/QuizAction';
import { useNavigate } from 'react-router-dom';

export default function QuizQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const UtilsModal = useSelector((state: any) => state.UtilsReducer.isModalOpen);
    const QuizRooms = useSelector((state: any) => state.QuizReducers.QuizRoom);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        dispatch(HeaderTitleHandler('Socket Io Quiz Game'));
        dispatch(BreadCrumbConfig({
            title: 'Quiz Slots',
            href: '/quiz-slots',
            preventPush: true
        } as any))
        dispatch(GetAllQuizRoom() as any);
    }, [roomId]);

    const onFinish = (val: any) => {
        SocketConn.on('roomCreated', function (roomId) {
            setRoomId(roomId);
            api.success({
                message: 'Socket Room created...',
                placement: 'topRight',
            });
        });
        SocketConn.emit('createRoom', val?.name, val?.slotType, val?.amount);
    }

    const handleJoinRoom = (roomId: any) => {
        SocketConn.emit('joinRoom', roomId);
        SocketConn.on('roomJoined', (roomId, status, message) => {
            if (status === 200) {
                SocketConn.emit('startGame', roomId);
                setRoomId(roomId);
                dispatch(RoomHandler(roomId));
                navigate('/quiz-game');
            } else {
                api.error({
                    message: message,
                    placement: 'topRight',
                });
            }
            SocketConn.off('roomJoined'); 
        });
    };
    return (
        <>
            {contextHolder}
            <div className="quiz-container">
                <div className="quiz-header">Quiz Game Slot list</div>
                <div className="quiz-list-container">
                    {QuizRooms.length > 0 ?
                        QuizRooms?.map((Q: any) => (
                            <div className="quiz-list-wrapper">
                                <div className="quiz-room-nam">{Q.roomId}</div>
                                <div className="slot-type">{Q.slotType}</div>
                                <div className="player count">{Q.users.length} Player In The Room</div>
                                <div className="quiz-join-btn">
                                    <Button disabled={Q.users.length == 2 ? true : false} type='primary' onClick={() => { handleJoinRoom(Q.roomId) }} htmlType='submit'>{Q.users.length == 2 ? 'Room Full' : 'Join Room'}</Button>
                                </div>
                            </div>
                        )) :
                        <div className="quiz-room-warn">No Room Found</div>
                    }
                    <div className="bottom-quiz"></div>
                </div>
            </div>
            <QuizCreateRoomModal
                isOpen={UtilsModal}
                className={'quiz-game-modal'}
                onFinish={onFinish}
            />
        </>
    )
}
