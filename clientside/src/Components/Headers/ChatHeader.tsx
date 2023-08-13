import React from 'react'
import AvatarImg from '../../Assets/avatar.png';
import { MoreOutlined } from '@ant-design/icons'

export default function ChatHeader() {
    return (
        <div className="chat-header-container">
            <div className="chat-avatar">
                <img className='avatar-img-header' src={AvatarImg} />
                <div className="avatar-user-name">Ganesh M</div>
                </div>
                <div className="option-icon"><MoreOutlined /></div>
            
        </div>
    )
}
