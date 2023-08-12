import React from 'react'
import { Form, Input, Checkbox, Button, notification, Row, Col } from 'antd'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../Redux/Actions/QuizAction';

export default function Register() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const onFinish = (val: any) => {
        dispatch(RegisterUser(val)).then((data: any) => {
            if (data.payload.status === 201) {
                api.success({
                    message: data.payload.data.Message,
                    placement: 'topRight',
                    duration: 1000
                });
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
                <Col span={10} offset={2}>
                    <div className="register-container">
                        <div className="title">Register</div>
                        <Form
                            name='login-form'
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item
                                className='auth-input'
                                name="username"
                                label="Username"
                                rules={[
                                    { required: true, message: 'Please enter the username' }
                                  ]}
                            >
                                <Input placeholder='Enter the username' />
                            </Form.Item>

                            <Form.Item
                                className='auth-input'
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter the email' }
                                  ]}
                            >
                                <Input placeholder='Enter the Email' />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                hidden={true}
                                initialValue={'user'}
                            >
                                <Input hidden={true} defaultValue={'user'} />
                            </Form.Item>
                            <Form.Item
                                className='auth-input'
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please enter the password' }
                                  ]}
                            >
                                <Input placeholder='Enter the Password' />
                            </Form.Item>
                            <Form.Item
                className="auth-input"
                name="confirm_password"
                label="Confirm Password"
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Passwords do not match');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm your password" />
              </Form.Item>
                            <Button type='primary' className='auth-btn' htmlType='submit'>Register</Button>
                        </Form>
                        <div className="auth-container">
                            <p className='auth-msg'>If you have account please Login?</p>
                            <NavLink to={'/login'}><span className='auth-link'>Login</span></NavLink>
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