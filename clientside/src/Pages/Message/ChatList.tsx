import React, { useEffect, useState } from 'react'
import AvatarImg from '../../Assets/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers, GetUserById } from '../../Redux/Actions/QuizAction';
import { Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
    const userData = useSelector((state: any) => state.QuizReducers.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [index, SetIndex] = useState<any>('');

    useEffect(() => {
        dispatch(GetAllUsers() as any);
    }, []);

    return (
        <div className="chat-list-containerll">
            <div className="chat-header-wrapper">
            <div className="back-btn" onClick={() => navigate(-1)}><ArrowLeftOutlined /></div>
            <div className="chat-title">Messages</div>
            </div>
            <Input size="large" className='chat-searchbar' placeholder="Search or chat new chat" prefix={<SearchOutlined />} />
            {userData?.map((U: any,i:any) => (
                <div onClick={()=> {dispatch(GetUserById(U._id) as any);SetIndex(i)}} className={index !== i ? "chat-list-wrapper" : "chat-list-wrapper-active"}>
                    <img className="chat-avata-img" src={AvatarImg} />
                    <div className="chat-user-details-wrapper">
                        <div className="chat-user-details">
                            <div className="chat-user-name">{U.username}</div>
                            <div className="chat-user-last-msg">Hiii</div>
                        </div>
                        <div className="chat-time">6:30 PM</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
