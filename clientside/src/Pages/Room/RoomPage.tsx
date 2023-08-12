import React, { useEffect, useState } from 'react'
import { BreadCrumbConfig, HeaderTitleHandler, ModalHandler } from '../../Redux/Reducers/UtilsReducers';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '../../Components/TableContainer/TableContainer';
import RoomCreateAndUpdateModal from './RoomCreateAndUpdateModal';
import { CreateRoom, GetAllRoom, UpdateRoom } from '../../Redux/Actions/QuizAction';
import { notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import RoomDeleteModal from './RoomDeleteModal';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
    _id: any;
}

export default function RoomPage() {
    const UtilsModal = useSelector((state: any) => state.UtilsReducer.isModalOpen);
    const Quisdetails = useSelector((state: any) => state.QuizReducers);
    const [api, contextHolder] = notification.useNotification();
    const [actionType, setActionType] = useState<any>('create-update');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(HeaderTitleHandler('Rooms'));
        dispatch(GetAllRoom() as any);
        dispatch(BreadCrumbConfig({
            title: 'Rooms',
            href: '/rooms',
            preventPush: false
        } as any))
    }, [UtilsModal]);

    const onFinish = (val: any) => {
        if (val._id === null || val._id === undefined) {
            dispatch(CreateRoom(val) as any).then((data: any) => {
                console.log(data.payload.data);
                if (data.payload.status === 201) {
                    api.success({
                        message: data.payload.data.Message,
                        placement: 'topRight',
                    });
                }
            }).catch(() => {
                api.error({
                    message: 'Something went wrong.',
                    placement: 'topRight'
                });
            })
        } else {
            dispatch(UpdateRoom(val) as any).then((data: any) => {
                console.log(data.payload.data);
                if (data.payload.status === 201) {
                    api.success({
                        message: data.payload.data.Message,
                        placement: 'topRight',
                    });
                }
            }).catch(() => {
                api.error({
                    message: 'Something went wrong.',
                    placement: 'topRight'
                });
            })
        }
    }

    const deleteHandler = (val: any) => {
        if (val === 'deleted') {
            api.success({
                message: 'Room deleted successfully',
                placement: 'topRight',
            });
        } else {
            api.error({
                message: 'Something went wrong.',
                placement: 'topRight'
            });
        }
    }

    const RoomColumns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <>{text}</>,
        },
        {
            title: 'No of participate',
            dataIndex: 'no_of_participate',
            key: 'no_of_participate',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Slot Type',
            key: 'slot_type',
            dataIndex: 'slot_type',
            render: (text: any) => (
                <>
                    <Tag color={text === 'paid' ? 'green' : 'yellow'} key={text}>
                        {text}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Entry Price',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div className="action-container">
                        <div onClick={() => { setActionType('create-update'); dispatch(ModalHandler('')); navigate({ pathname: '/rooms', search: `?roomId=${record?._id}` }); }}
                            className="action-icon"><EditOutlined /></div>
                        <div onClick={() => { setActionType('delete'); dispatch(ModalHandler('')); navigate({ pathname: '/rooms', search: `?roomId=${record?._id}` }) }} className="action-icon"><DeleteOutlined /></div>
                    </div>
                </Space>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="room-container">
                <TableContainer
                    className={'room-table'}
                    columns={RoomColumns}
                    pageSize={{ pageSize: 5 }}
                    loading={Quisdetails?.loading}
                    dataSource={Quisdetails?.allRoom} />
            </div>
            {actionType === 'create-update' ?
                <RoomCreateAndUpdateModal
                    isOpen={UtilsModal}
                    className={'Room-modal'}
                    onFinish={onFinish}
                /> :
                <RoomDeleteModal
                    isOpen={UtilsModal}
                    className={'room-delete-modal'}
                    onFinish={deleteHandler}
                />
            }
        </>
    )
}
