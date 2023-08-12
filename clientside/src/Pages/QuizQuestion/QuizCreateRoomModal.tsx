import React, { useState } from 'react'
import { IModal } from '../../interfaces/interface';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ModalHandler } from '../../Redux/Reducers/UtilsReducers';

const QuizCreateRoomModal : React.FC<IModal> = ({isOpen,className,onFinish}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [slotType, setSlotType] = useState<any>('');
  return (
    <>
     <Modal
     open={isOpen}
     width={350}
     footer={null}
     title={'Create Quiz Room'}
     onCancel={()=> dispatch(ModalHandler(''))}
     className={className}
     >
        <div className="quiz-room-container">
            <div className="quiz-title">Create the room here.</div>
            <Form
                form={form}
                className='room-form'
                name="basic"
                onFinish={(e) => { onFinish(e); form.resetFields(); dispatch(ModalHandler('')) }}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    className='form-input'
                    name="name"
                    rules={[{ required: true, message: 'Please input the room name!' }]}
                >
                    <Input placeholder='Please enter the room name.'/>
                </Form.Item>
                <Form.Item
                    name="slotType"
                    className='form-input'
                    rules={[{ required: true, message: 'Please input the slot type!' }]}
                >
                    <Select
                        placeholder="Please select the slot"
                        onChange={(e) => setSlotType(e)}
                        options={[
                            { value: 'free', label: 'Free' },
                            { value: 'paid', label: 'Paid' },
                        ]}
                    />
                </Form.Item>
                {
                    slotType === 'paid' &&
                    <Form.Item
                        name="amount"
                        className='form-input'
                        rules={[{ required: true, message: 'Please input the entry fees!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                }
                <Button type='primary' className='quiz-Room-btn' htmlType='submit'>Create Room</Button>
                </Form>
        </div>
     </Modal>
    </>
  )
}

export default QuizCreateRoomModal;
