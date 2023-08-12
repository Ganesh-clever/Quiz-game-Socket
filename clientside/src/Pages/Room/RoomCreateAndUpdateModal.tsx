import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { IModal } from '../../interfaces/interface'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ModalHandler } from '../../Redux/Reducers/UtilsReducers'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GetByIdRoom } from '../../Redux/Actions/QuizAction';
dayjs.extend(customParseFormat);

const RoomCreateAndUpdateModal: React.FC<IModal> = ({ isOpen, className, onFinish }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [slotType, setSlotType] = useState<any>('');
    const roomId = searchParams.get('roomId');
    const [form] = Form.useForm();

    useEffect(() => {
        if (roomId !== null) {
            dispatch(GetByIdRoom(roomId) as any).then((data: any) => {
            const roomData = data?.payload?.data;
            const formattedStartDate = dayjs(roomData.start_date).format('YYYY-MM-DD HH:mm:ss');
            const formattedEndDate = dayjs(roomData.end_date).format('YYYY-MM-DD HH:mm:ss');
            const roomVal = {
                ...roomData,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
            };
            delete roomVal.start_date;
            delete roomVal.end_date;
            console.log(roomVal);
            

            setSlotType(roomData.slot_type);
            form.setFieldsValue(roomVal);
            });
        }else{
            form.resetFields();
        }
    }, [roomId]);



    return (
        <Modal width={400}
            footer={null}
            className={className}
            onCancel={() => { dispatch(ModalHandler('')); navigate('/rooms') }}
            title={roomId !== null ? 'Update Room' : 'Create Room'}
            open={isOpen}
        >
            <Form
                form={form}
                className='room-form'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={(e) => { onFinish(e); form.resetFields(); dispatch(ModalHandler('')); navigate('/rooms') }}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    label="Room Name"
                    className='form-input'
                    name="name"
                    rules={[{ required: true, message: 'Please input the room name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="_id"
                    hidden={true}
                >
                    <Input hidden={true}/>
                </Form.Item>

                <Form.Item
                    label="No of participate"
                    name="no_of_participate"
                    className='form-input'
                    rules={[{ required: true, message: 'Please input the no of participate!' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Start Date"
                    name="start_date"
                    className='form-input'
                    rules={[{ required: true, message: 'Please input the start date!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={{ defaultValue: dayjs("YYYY-MM-DD HH:mm:ss") }}
                    />
                </Form.Item>
                <Form.Item
                    label="End Date"
                    name="end_date"
                    className='form-input'
                    rules={[{ required: true, message: 'Please input the end date!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime={{ defaultValue: dayjs("YYYY-MM-DD HH:mm:ss") }}
                    />
                </Form.Item>
                <Form.Item
                    label="Slot Type"
                    name="slot_type"
                    className='form-input'
                    rules={[{ required: true, message: 'Please input the slot type!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
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
                        label="Entry Fees"
                        name="amount"
                        className='form-input'
                        rules={[{ required: true, message: 'Please input the entry fees!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                }

                <Button type='default' onClick={() => { dispatch(ModalHandler('')); form.resetFields(); navigate('/rooms') }} className='Room-btn'>Cancel</Button>
                <Button type='primary' className='Room-btn' htmlType='submit'>{roomId !== null ? 'Update' : 'Create'}</Button>
            </Form>
        </Modal>
    )
}

export default RoomCreateAndUpdateModal;
