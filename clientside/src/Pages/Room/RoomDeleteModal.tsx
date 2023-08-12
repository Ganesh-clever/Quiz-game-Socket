import React from 'react'
import { IModal } from '../../interfaces/interface';
import Modal from 'antd/es/modal/Modal';
import { useDispatch } from 'react-redux';
import { ModalHandler } from '../../Redux/Reducers/UtilsReducers';
import { useSearchParams } from 'react-router-dom';
import { DeleteByIdRoom } from '../../Redux/Actions/QuizAction';
import { ExclamationCircleFilled } from '@ant-design/icons'

const RoomDeleteModal: React.FC<IModal> = ({ isOpen, className, onFinish }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');

    return (
        <Modal
            className={className}
            open={isOpen}
            okText='Delete'
            onCancel={() => dispatch(ModalHandler(''))}
            onOk={() => {
                dispatch(DeleteByIdRoom(roomId) as any).then(() => {
                    onFinish('deleted');
                }).catch(() => {
                    onFinish('not-deleted');
                }); dispatch(ModalHandler(''))
            }}
            title='Delete Room'
        >
            <div className="delete-modal-warpper">
                <div className="delete-warn-logo"><ExclamationCircleFilled /></div>
                <h3>Are you sure do you want to delete the room?</h3>
            </div>
        </Modal>
    )
}

export default RoomDeleteModal;