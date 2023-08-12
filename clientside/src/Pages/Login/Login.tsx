import React from 'react'
import { Form, Input, Checkbox, Button, notification, Row, Col } from 'antd'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../Redux/Actions/QuizAction';

export default function Login() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const onFinish = (val: any) => {
        dispatch(LoginUser(val)).then((data: any) => {
            console.log(data);

            if (data.payload.status === 200) {
                api.success({
                    message: data.payload.data.Message,
                    placement: 'topRight',
                    duration: 1000
                });
                setTimeout(() => {
                    window.location.reload();
                }, 500)
                setTimeout(() => {
                    navigate('/');
                }, 1000)
            }
        }).catch(() => {
            api.error({
                message: 'Invaild credentials enterd',
                placement: 'topRight'
            });
        });
    }
    return (
        <>
            {contextHolder}
            <Row className="background-container">
                <Col className='login-col' span={10} offset={2}>
                    <div className="login-container">
                        <div className="title">Login</div>
                        <Form
                            name='login-form'
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                className='auth-input'
                                label="Username or email"
                                rules={[
                                    { required: true, message: 'Please enter the username or email' }
                                  ]}
                            >
                                <Input placeholder='Enter the username or email' />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                className='auth-input'
                                rules={[
                                    { required: true, message: 'Please enter the password' }
                                  ]}
                            >
                                <Input placeholder='Enter the Password' />
                            </Form.Item>
                            <Button type='primary' className='auth-btn' htmlType='submit'>Login</Button>
                        </Form>
                        <div className="auth-container">
                            <p className='auth-msg'>If your don't have account please Register?</p>
                            <NavLink to={'/register'}><span className='auth-link'>Register</span></NavLink>
                        </div>
                    </div>
                </Col>
                <Col className='cover-quiz-col' span={10} offset={0}>
                    <div className="cover-img-quiz">
                        <div className="quiz-cover-content">Welcome to the Ultimate Quiz Platform!</div>
                        <div className="quiz-paragraph-content">Are you ready to challenge your knowledge and have a blast while doing it? Look no further! Our cutting-edge quiz platform is designed to bring you an exhilarating experience that will test your wits, expand your horizons, and provide hours of entertainment.</div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
