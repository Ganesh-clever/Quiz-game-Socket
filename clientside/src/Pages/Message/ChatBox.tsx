import { Col, Input, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { SendOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { SocketConn } from '../../ServerConfig/SocketIo';
import { JsonParser } from '../../Utils/GlobalFunctions';
import { GetMessageById } from '../../Redux/Actions/QuizAction';

export default function ChatBox() {
    const dispatch = useDispatch();
    const myDetails = JsonParser(localStorage.getItem('userDetails'));
    const [message, SetMessage] = useState<any>();
    const [chatMessages, setChatMessages] = useState<any>([]);
    const userData = useSelector((state: any) => state.QuizReducers.userDetails);
    const messagesEndRef = useRef<any>(null);

    useEffect(() => {
        SocketConn.on('chat-response', (message) => {
            setChatMessages((prevMessages: any) => [...prevMessages, message]);
        });
        SocketConn.on('my-message', (message) => {
            SetMessage('')
            setChatMessages((prevMessages: any) => [...prevMessages, message]);
        });
        dispatch(GetMessageById({ senderId: myDetails?._id, receiverId: userData?._id }) as any).then((M: any) => {
            setChatMessages(M?.payload?.data);
        })
        return () => {
            SocketConn.off('chat-response');
            SocketConn.off('my-message');
        };
    }, [userData]);

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }

    const sendMessage = () => {
        SocketConn.emit('send-message', myDetails?._id, userData?._id, message);
        SocketConn.on('chat-response', (message) => {
            SetMessage('')
        })
    }

    return (
        <div className="chat-box-container">
            <div className="chat-box-chats-wrapper" >
                {chatMessages?.map((chatMessage: any, index: any) => (
                    <div ref={messagesEndRef} className={`chats-content-wrapper ${chatMessage.senderId === myDetails._id
                        ? 'sender-message-wrapper'
                        : 'receiver-message-wrapper'
                        }`}>
                        <div key={index}
                            className={`chat-box-chats-content ${chatMessage.senderId === myDetails._id
                                ? 'sender-message'
                                : 'receiver-message'
                                }`}>
                            {chatMessage.message}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-box-input-wrapper">
                <Input value={message} onChange={(e) => { SetMessage(e.target.value); }} className='chat-box-input' />
                <div onClick={sendMessage} className="send-icon-wrapper"><SendOutlined /></div>
            </div>
        </div>
    )
}
