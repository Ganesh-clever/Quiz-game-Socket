import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BreadCrumbConfig, HeaderTitleHandler } from '../../Redux/Reducers/UtilsReducers';
import { Col, Row } from 'antd';
import ChatList from './ChatList';
import ChatHeader from '../../Components/Headers/ChatHeader';
import ChatBox from './ChatBox';

export default function Message() {
    return (
        <div className="message-container">
            <Row className='message-row'>
                <Col className='message-col-chat-list chat-list-container' xs={24} sm={12} md={8} lg={8} xl={6}><ChatList /></Col>
                <Col className='message-col' xs={24} sm={12} md={16} lg={16} xl={18}>
                <ChatHeader />
                    <ChatBox />
                </Col>
            </Row>
        </div>
    )
}
