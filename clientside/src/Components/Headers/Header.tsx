import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const items: MenuProps['items'] = [
        {
            label: <span onClick={() => { localStorage.clear(); navigate('/login') }}>Logout</span>,
            key: '0',
        }
    ];
    return (
        <div className="header-container">
            <div className="header-wrapper">
                <div className="logo">Quiz Platform</div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <UserOutlined />
                        </Space>
                    </a>
                </Dropdown></div>
        </div>
    )
}
