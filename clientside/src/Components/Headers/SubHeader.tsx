import { Button, Col, Input, Row } from 'antd'
import React from 'react'
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ModalHandler } from '../../Redux/Reducers/UtilsReducers';
import BreadCrumbContainer from '../BreadCrumb/BreadCrumbcontainer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SubHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const HeaderTitle = useSelector((state: any) => state.UtilsReducer.headerTitle)
    const dispatch = useDispatch();
    return (
        <Row className="subheader-container">
            <Col xs={8} sm={8} md={8} lg={8} xl={6}>
                <div className="header-title-wrapper">
                    <div className="back-btn" onClick={() => navigate(-1)}><ArrowLeftOutlined /></div>
                    <div className="header-title-breadcrump">
                        <div className="page-title">{HeaderTitle}</div>
                        <div className="breadcrump"><BreadCrumbContainer /></div>
                    </div>
                </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={12}>
                <Input size="large" className='subheader-searchbar' placeholder="large size" prefix={<SearchOutlined />} />
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={6}>
                {location.pathname === '/' &&
                    <div className="subheader-btn">
                        <Button type='primary' onClick={() => dispatch(ModalHandler(''))} className='sub-header-btn'>Statistics</Button>
                    </div>
                }
                {location.pathname === '/rooms' &&
                    <div className="subheader-btn">
                        <Button type='primary' onClick={() => dispatch(ModalHandler(''))} className='sub-header-btn'>Create Room</Button>
                    </div>
                }
                {location.pathname === '/quiz-slots' &&
                    <div className="subheader-btn">
                        <Button type='primary' onClick={() => dispatch(ModalHandler(''))} className='sub-header-btn'>Create Room</Button>
                    </div>
                }
                {location.pathname === '/quiz-game' &&
                    <div className="subheader-btn">
                        <Button type='primary' onClick={() => dispatch(ModalHandler(''))} className='sub-header-btn'>Generate Question</Button>
                    </div>
                }
            </Col>
        </Row>
    )
}
